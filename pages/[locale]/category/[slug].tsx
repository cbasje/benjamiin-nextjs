import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import { fetchAPI } from '@/lib/api';

import { Category as CategoryType } from '@/models/category';
import { Seo as SeoType } from '@/models/seo';
import { Homepage as HomepageType } from '@/models/homepage';
import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Container } from '@/stitches.config';
import Layout from '@/components/Layout';

interface CategoryProps {
	category: CategoryType;
	categories: CategoryType[];
	homepage: HomepageType;
	contact: ContactType;
}

const Category = ({
	category,
	categories,
	homepage,
	contact,
}: CategoryProps) => {
	const seo: SeoType = {
		metaTitle: category.attributes.title,
		metaDescription: `All ${category.attributes.title} projects`,
	};

	return (
		<Layout homepage={homepage} categories={categories} contact={contact}>
			<Seo seo={seo} />
			<Container>
				<h1>{category.attributes.title}</h1>
				<ProjectGrid
					projects={category.attributes.projects?.data || []}
				/>
			</Container>
		</Layout>
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
> = async ({ params }) => {
	const { locale, slug } = params as { locale: Locale; slug: string };

	const [matchingCategoriesRes, allCategoriesRes, homepageRes, contactRes] =
		await Promise.all([
			fetchAPI<CategoryType[]>('/categories', {
				filters: { slug },
				populate: {
					projects: {
						populate: '*',
					},
				},
				locale,
			}),
			fetchAPI<CategoryType[]>('/categories', {
				fields: ['title', 'slug', 'locale'],
				locale,
			}),
			fetchAPI<HomepageType>('/homepage', {
				fields: ['title'],
				locale,
			}),
			fetchAPI<ContactType>('/contact', {
				fields: ['title', 'locale'],
				locale,
			}),
		]);

	return {
		props: {
			category: matchingCategoriesRes.data[0],
			categories: allCategoriesRes.data,
			homepage: homepageRes.data,
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Category;
