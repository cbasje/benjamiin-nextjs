import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import { fetchAPI } from '../../../lib/api';

import Articles from '../../../components/Articles';
import Seo from '../../../components/Seo';
import Nav from '../../../components/Nav';
import { Box, Container } from '../../../stitches.config';

interface CategoryProps {
	category: Category;
	categories: Category[];
}

const Category = ({ category, categories }: CategoryProps) => {
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
				<Articles articles={category.attributes.articles?.data || []} />
			</Container>
		</Box>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const categoriesRes = await fetchAPI<Category[]>('/categories', {
		fields: ['slug', 'locale'],
		locale: 'all',
	});

	return {
		paths: categoriesRes.data.map((category: Category) => ({
			params: {
				slug: category.attributes.slug,
				locale: category.attributes.locale,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	CategoryProps,
	ParsedUrlQuery
> = async ({ params: { locale, slug } }) => {
	const matchingCategories = await fetchAPI<Category[]>('/categories', {
		filters: { slug },
		populate: {
			articles: {
				populate: '*',
			},
		},
		locale,
	});
	const allCategories = await fetchAPI<Category[]>('/categories', {
		fields: ['name', 'slug', 'locale'],
		locale,
	});

	return {
		props: {
			category: matchingCategories.data[0],
			categories: allCategories.data,
		},
		revalidate: true,
	};
};

export default Category;
