import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import { motion } from 'framer-motion';

import { fetchAPI } from '@/lib/api';

import { Project as ProjectType } from '@/models/project';
import { Seo as SeoType } from '@/models/seo';
import { Locale } from '@/models/locale';

import { Banner, Box } from '@/stitches.config';
import BlockManager from '@/components/BlockManager';
import Seo from '@/components/Seo';
import Picture from '@/components/Picture';

interface ProjectProps {
	project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
	const seo: SeoType = {
		metaTitle: project.attributes.title,
		metaDescription: project.attributes.description,
		shareImage: project.attributes.cover,
		isArticle: true,
	};

	return (
		<>
			<Seo seo={seo} />
			<Box>
				<Banner>
					<motion.div
						layoutId={`cover-${project.attributes.slug}`}
						style={{
							width: '100%',
							height: '100%',
							position: 'relative',
						}}
					>
						<Picture
							src={project.attributes.cover.data}
							layout="fill"
						/>
					</motion.div>

					<div
						style={{
							width: '100%',
							height: '100%',
							position: 'absolute',
							top: 0,
							display: 'grid',
							placeContent: 'center',
						}}
					>
						<motion.h1
							layoutId={`title-${project.attributes.slug}`}
						>
							{project.attributes.title}
						</motion.h1>
					</div>
				</Banner>
				<Box>
					<BlockManager blocks={project.attributes.blocks} />
				</Box>
			</Box>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const projectsRes = await fetchAPI<ProjectType[]>('/projects', {
		fields: ['slug', 'locale'],
		locale: 'all',
	});

	return {
		paths: projectsRes.data.map((project: ProjectType) => ({
			params: {
				slug: project.attributes.slug,
				locale: project.attributes.locale,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	ProjectProps,
	ParsedUrlQuery
> = async ({ params }) => {
	const { locale, slug } = params as { locale: Locale; slug: string };

	const [projectsRes] = await Promise.all([
		fetchAPI<ProjectType[]>('/projects', {
			filters: { slug },
			populate: {
				author: {
					populate: '*',
				},
				blocks: {
					populate: '*',
				},
				cover: {
					populate: '*',
				},
				category: {
					populate: '*',
				},
			},
			locale,
		}),
	]);

	return {
		props: {
			project: projectsRes.data[0],
		},
		revalidate: true,
	};
};

export default Project;
