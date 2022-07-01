import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '../../lib/api';

import Articles from '../../components/Articles';
import Nav from '../../components/Nav';
import Seo from '../../components/Seo';
import { Box, Container } from '../../stitches.config';

interface HomeProps {
	articles: Article[];
	categories: Category[];
	homepage: Homepage;
}

const Home = ({ articles, categories, homepage }: HomeProps) => {
	return (
		<Box>
			<Nav categories={categories} />
			<Container>
				<Seo seo={homepage.attributes.seo} />
				<div>
					<h1>{homepage.attributes.title}</h1>
					<Articles articles={articles} />
				</div>
			</Container>
		</Box>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	// We don't want to specify all possible countries as we get those from the headers
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({
	params: { locale },
}) => {
	const fetch = async (locale: string): Promise<string> => {
		const acceptedLocales = ['en', 'nl'];

		const index = acceptedLocales.indexOf(locale);
		return acceptedLocales[index === -1 ? 0 : index];
	};
	const convertedLocale = await fetch(locale);

	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI<Article[]>('/articles', {
			populate: ['cover', 'category'],
			locale: convertedLocale,
		}),
		fetchAPI<Category[]>('/categories', {
			populate: '*',
			locale: convertedLocale,
		}),
		fetchAPI<Homepage>('/homepage', {
			populate: {
				title: '*',
				seo: { populate: '*' },
			},
			locale: convertedLocale,
		}),
	]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: true,
	};
};

export default Home;
