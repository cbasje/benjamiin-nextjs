import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';

import { Project as ProjectType } from '@/models/project';
import { Homepage as HomepageType } from '@/models/homepage';
import { Locale } from '@/models/locale';

import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Box } from '@/stitches.config';
import SpotifyPlayer from '@/components/SpotifyPlayer';

import { parseLocale } from '@/util/locale';
import { SpotifyData } from '@/models/spotify';

interface HomeProps {
	spotify: SpotifyData;
	projects: ProjectType[];
	homepage: HomepageType;
}

const Home = ({ spotify, projects, homepage }: HomeProps) => {
	return (
		<>
			<Seo seo={homepage.attributes.seo} />
			<Box>
				<SpotifyPlayer {...spotify} />
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

	const baseUrl =
		process.env.NODE_ENV === 'production'
			? 'https://next.benjami.in'
			: 'http://localhost:3000';
	const spotifyRes = await fetch(`${baseUrl}/api/spotify`);

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
			spotify: await spotifyRes.json(),
			projects: projectsRes.data,
			homepage: homepageRes.data,
		},
		revalidate: true,
	};
};

export default Home;
