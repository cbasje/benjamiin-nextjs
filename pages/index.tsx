import React from 'react';
import Articles from '../components/Articles';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { fetchAPI } from '../lib/api';

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
		<Layout categories={categories}>
			<Seo seo={homepage.attributes.seo} />
			<div>
				<h1>{homepage.attributes.title}</h1>
				<Articles articles={articles} />
			</div>
		</Layout>
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
