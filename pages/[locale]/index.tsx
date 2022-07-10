import { Suspense } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';

import { Project as ProjectType } from '@/models/project';
import { Homepage as HomepageType } from '@/models/homepage';
import { Locale } from '@/models/locale';

import ProjectGrid from '@/components/ProjectGrid';
import Seo from '@/components/Seo';
import { Box } from '@/stitches.config';
import SpotifyPlayer from '@/components/SpotifyPlayer';

import NetlifyGraph from '@/lib/netlifyGraph';

interface HomeProps {
	song: string;
	projects: ProjectType[];
	homepage: HomepageType;
}

const Home = ({ song, projects, homepage }: HomeProps) => {
	return (
		<>
			<Seo seo={homepage.attributes.seo} />
			<Box>
				<Suspense fallback={<p>Fallback</p>}>
					<SpotifyPlayer song={song} />
				</Suspense>
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
	const { locale } = params as { locale: Locale };

	const netlifyRes = await NetlifyGraph.fetchNowPlayingQuery({});

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
			populate: '*',
			locale: convertedLocale,
		}),
	]);

	return {
		props: {
			song:
				netlifyRes.data.me.spotify.player.item?.name ?? 'Nothing found',
			projects: projectsRes.data,
			homepage: homepageRes.data,
		},
		revalidate: true,
	};
};

export default Home;
