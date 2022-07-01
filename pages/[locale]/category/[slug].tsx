import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import { fetchAPI } from '../../../lib/api';

import { Category as CategoryType } from '../../../types/category';
import { Seo as SeoType } from '../../../types/seo';

import Articles from '../../../components/Articles';
import Seo from '../../../components/Seo';
import Nav from '../../../components/Nav';
import { Box, Container } from '../../../stitches.config';

interface CategoryProps {
	category: CategoryType;
	categories: CategoryType[];
}

const Category = ({ category, categories }: CategoryProps) => {
	const seo = {
		metaTitle: category.attributes.name,
		metaDescription: `All ${category.attributes.name} articles`,
	};

	return (
		<Box>
			{/* <Nav categories={categories} /> */}
			<Seo seo={seo} />
			<Container>
				<h1>{category.attributes.name}</h1>
				<Articles articles={category.attributes.articles?.data || []} />
			</Container>
		</Box>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const categoriesRes = await fetchAPI<CategoryType[]>('/categories', {
		fields: ['slug', 'locale'],
		locale: 'all',
	});

	return {
		paths: categoriesRes.data.map((category: CategoryType) => ({
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
	const matchingCategories = await fetchAPI<CategoryType[]>('/categories', {
		filters: { slug },
		populate: {
			articles: {
				populate: '*',
			},
		},
		locale,
	});
	const allCategories = await fetchAPI<CategoryType[]>('/categories', {
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
