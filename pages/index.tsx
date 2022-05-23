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
	articles: any;
	categories: any;
	homepage: any;
}) => {
	return (
		<Layout categories={categories}>
			<Seo seo={homepage.attributes.seo} />
			<div className="uk-section">
				<div className="uk-container uk-container-large">
					<h1>{homepage.attributes.hero.title}</h1>
					<Articles articles={articles} />
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticProps() {
	const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI('/articles', { populate: ['image', 'category'] }),
		fetchAPI('/categories', { populate: '*' }),
		fetchAPI('/homepage', {
			populate: {
				hero: '*',
				// seo: { populate: '*' },
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
