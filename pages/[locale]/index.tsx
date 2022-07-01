import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@lib/api';

import { Article as ArticleType } from '@/models/article';
import { Category as CategoryType } from '@/models/category';
import { Homepage as HomepageType } from '@/models/homepage';
import { Contact as ContactType } from '@/models/contact';

import Articles from '@components/Articles';
import Seo from '@components/Seo';
import { Container } from '@/stitches.config';
import Layout from '@components/Layout';

interface HomeProps {
	articles: ArticleType[];
	categories: CategoryType[];
	homepage: HomepageType;
	contact: ContactType;
}

const Home = ({ articles, categories, homepage, contact }: HomeProps) => {
	return (
		<Layout homepage={homepage} categories={categories} contact={contact}>
			<Container>
				<Seo seo={homepage.attributes.seo} />
				<div>
					<h1>{homepage.attributes.title}</h1>
					<Articles articles={articles} />
				</div>
			</Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
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

	const [articlesRes, categoriesRes, homepageRes, contactRes] =
		await Promise.all([
			fetchAPI<ArticleType[]>('/articles', {
				populate: ['cover', 'category'],
				locale: convertedLocale,
			}),
			fetchAPI<CategoryType[]>('/categories', {
				fields: ['name', 'slug', 'locale'],
				locale: convertedLocale,
			}),
			fetchAPI<HomepageType>('/homepage', {
				populate: {
					title: '*',
					seo: { populate: '*' },
				},
				locale: convertedLocale,
			}),
			fetchAPI<ContactType>('/contact', {
				fields: ['title', 'locale'],
				locale: convertedLocale,
			}),
		]);

	return {
		props: {
			articles: articlesRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Home;
