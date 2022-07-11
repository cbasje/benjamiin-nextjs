import type { GetStaticPaths, GetStaticProps } from 'next';

import { About as AboutType } from '@/models/about';
import { Locale } from '@/models/locale';

import Seo from '@/components/Seo';
import BlockManager from '@/components/BlockManager';
import { fetchAPI } from '@/lib/api';
import { Box } from '@/stitches.config';

interface AboutProps {
	about: AboutType;
}

const About = ({ about }: AboutProps) => {
	return (
		<>
			<Seo seo={about.attributes.seo} />
			<Box>
				<h1>{about.attributes.title}</h1>
				<p>{about.attributes.description}</p>
			</Box>
			<Box>
				<BlockManager blocks={about.attributes.blocks} />
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

export const getStaticProps: GetStaticProps<AboutProps> = async ({
	params,
}) => {
	const { locale } = params as { locale: Locale };

	const [aboutRes] = await Promise.all([
		fetchAPI<AboutType>('/about', {
			populate: '*',
			locale,
		}),
	]);

	return {
		props: {
			about: aboutRes.data,
		},
		revalidate: 1,
	};
};

export default About;
