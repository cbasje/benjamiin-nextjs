import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';

import { Project as ProjectType } from '@/models/project';
import { Category as CategoryType } from '@/models/category';
import { Homepage as HomepageType } from '@/models/homepage';
import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Container } from '@/stitches.config';
import Layout from '@/components/Layout';

interface HomeProps {
	projects: ProjectType[];
	categories: CategoryType[];
	homepage: HomepageType;
	contact: ContactType;
}

const Home = ({ projects, categories, homepage, contact }: HomeProps) => {
	return (
		<Layout homepage={homepage} categories={categories} contact={contact}>
			<Container>
				<Seo seo={homepage.attributes.seo} />
				<div>
					<h1>{homepage.attributes.title}</h1>
					<ProjectGrid projects={projects} />
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

export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }) => {
	const { locale } = params as { locale: Locale };

	const fetch = async (locale: string): Promise<string> => {
		const index = Object.values(Locale).indexOf(locale as Locale);
		return Object.values(Locale)[index === -1 ? 0 : index];
	};
	const convertedLocale = await fetch(locale);

	const [projectsRes, categoriesRes, homepageRes, contactRes] =
		await Promise.all([
			fetchAPI<ProjectType[]>('/projects', {
				populate: ['cover', 'category'],
				locale: convertedLocale,
			}),
			fetchAPI<CategoryType[]>('/categories', {
				fields: ['title', 'slug', 'locale'],
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
			projects: projectsRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Home;
