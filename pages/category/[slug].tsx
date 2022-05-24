import { Params } from 'next/dist/server/router';
import Articles from '../../components/Articles';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

import { fetchAPI } from '../../lib/api';

const Category = ({
	category,
	categories,
}: {
	category: Category;
	categories: Category[];
}) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} articles`,
	};

	return (
		<Layout categories={categories}>
			<Seo seo={seo} />
			<div className="uk-section">
				<div className="uk-container uk-container-large">
					<h1>{category.attributes.name}</h1>
					<Articles articles={category.attributes.articles?.data} />
				</div>
			</div>
		</Layout>
	);
};

export async function getStaticPaths() {
	const categoriesRes = await fetchAPI('/categories', { fields: ['slug'] });

	return {
		paths: categoriesRes.data.map((category: Category) => ({
			params: {
				slug: category.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }: Params) {
	const matchingCategories = await fetchAPI<Category[]>('/categories', {
		filters: { slug: params.slug },
		populate: {
			articles: {
				populate: '*',
			},
		},
	});
	const allCategories = await fetchAPI<Category[]>('/categories');

	return {
		props: {
			category: matchingCategories.data[0],
			categories: allCategories.data,
		},
		revalidate: 1,
	};
}

export default Category;
