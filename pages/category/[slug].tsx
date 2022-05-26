import { Params } from 'next/dist/server/router';

import { fetchAPI } from '../../lib/api';

import Articles from '../../components/Articles';
import Seo from '../../components/Seo';
import Nav from '../../components/Nav';
import { Box, Container } from '../../stitches.config';

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
		<Box>
			<Nav categories={categories} />
			<Seo seo={seo} />
			<Container>
				<h1>{category.attributes.name}</h1>
				<Articles articles={category.attributes.articles?.data} />
			</Container>
		</Box>
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
