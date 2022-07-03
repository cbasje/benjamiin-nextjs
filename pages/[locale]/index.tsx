import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';

import { Project as ProjectType } from '@/models/project';
import { Homepage as HomepageType } from '@/models/homepage';
import { Locale } from '@/models/locale';

import Carbonbadge from 'react-carbonbadge';
import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Container } from '@/stitches.config';

interface HomeProps {
	projects: ProjectType[];
	homepage: HomepageType;
}

const Home = ({ projects, homepage }: HomeProps) => {
	return (
		<Container>
			<Seo seo={homepage.attributes.seo} />
			<div>
				<h1>{homepage.attributes.title}</h1>
				<Carbonbadge darkMode={true} />
				<ProjectGrid projects={projects} />
			</div>
		</Container>
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

	const fetch = async (locale: Locale): Promise<string> => {
		const index = Object.values(Locale).indexOf(locale);
		return Object.values(Locale)[index === -1 ? 0 : index];
	};
	const convertedLocale = await fetch(locale);

	const [projectsRes, homepageRes] = await Promise.all([
		fetchAPI<ProjectType[]>('/projects', {
			populate: ['cover', 'category'],
			locale: convertedLocale,
		}),
		fetchAPI<HomepageType>('/homepage', {
			populate: {
				title: '*',
				seo: { populate: '*' },
			},
			locale: convertedLocale,
		}),
	]);

	return {
		props: {
			projects: projectsRes.data,
			homepage: homepageRes.data,
		},
		revalidate: true,
	};
};

export default Home;
