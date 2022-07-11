import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';
import { getNowPlaying } from '@/lib/spotify';
import { parseLocale } from '@/util/locale';

import { Project as ProjectType } from '@/models/project';
import { Homepage as HomepageType } from '@/models/homepage';
import { Locale } from '@/models/locale';
import { SpotifyData } from '@/models/spotify';

import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Box } from '@/stitches.config';
import SpotifyPlayer from '@/components/SpotifyPlayer';

interface HomeProps {
	projects: ProjectType[];
	homepage: HomepageType;
}

const Home = ({ projects, homepage }: HomeProps) => {
	return (
		<>
			<Seo seo={homepage.attributes.seo} />
			<Box>
				<h1>{homepage.attributes.title}</h1>
				<ProjectGrid projects={projects} />
			</Box>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }) => {
	const locale = await parseLocale(params?.locale as Locale);

	const [projectsRes, homepageRes] = await Promise.all([
		fetchAPI<ProjectType[]>('/projects', {
			populate: ['cover', 'category'],
			locale,
		}),
		fetchAPI<HomepageType>('/homepage', {
			populate: '*',
			locale,
		}),
	]);

	return {
		props: {
			projects: projectsRes.data,
			homepage: homepageRes.data,
		},
		revalidate: 1,
	};
};

export default Home;
