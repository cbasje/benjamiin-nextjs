import React from 'react';
import { fetchAPI } from '../lib/api';

import Articles from '../components/Articles';
import Nav from '../components/Nav';
import Seo from '../components/Seo';
import { Box, Container } from '../stitches.config';

const Home = ({
	articles,
	categories,
	homepage,
}: {
	articles: Article[];
	categories: Category[];
	homepage: Homepage;
}) => {
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

export async function getStaticProps() {
	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI<Article[]>('/articles', { populate: ['cover', 'category'] }),
		fetchAPI<Category[]>('/categories', { populate: '*' }),
		fetchAPI<Homepage>('/homepage', {
			populate: {
				title: '*',
				seo: { populate: '*' },
			},
		}),
	]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: 1,
	};
}

export default Home;
