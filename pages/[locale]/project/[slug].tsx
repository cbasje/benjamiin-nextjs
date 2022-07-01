import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import Moment from 'react-moment';
import { motion } from 'framer-motion';

import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';

import { Project as ProjectType } from '@/models/project';
import { Category as CategoryType } from '@/models/category';
import { Homepage as HomepageType } from '@/models/homepage';
import { Contact as ContactType } from '@/models/contact';
import { Seo as SeoType } from '@/models/seo';
import { Locale } from '@/models/locale';

import { Banner, Container } from '@/stitches.config';
import BlockManager from '@/components/BlockManager';
import Seo from '@/components/Seo';
import Image from '@/components/Image';
import Layout from '@/components/Layout';

interface ProjectProps {
	project: ProjectType;
	categories: CategoryType[];
	homepage: HomepageType;
	contact: ContactType;
}

const Project = ({ project, homepage, categories, contact }: ProjectProps) => {
	const seo: SeoType = {
		metaTitle: project.attributes.title,
		metaDescription: project.attributes.description,
		shareImage: project.attributes.cover,
		isArticle: true,
	};

	return (
		<Layout homepage={homepage} categories={categories} contact={contact}>
			<Seo seo={seo} />
			<Container>
				<Banner>
					<motion.div
						layoutId={`cover-${project.attributes.slug}`}
						style={{
							width: '100%',
							height: '100%',
							position: 'relative',
						}}
					>
						<Image image={project.attributes.cover} layout="fill" />
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
				<div>
					<BlockManager blocks={project.attributes.blocks} />
				</div>
			</Container>
		</Layout>
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

	const [projectsRes, categoriesRes, homepageRes, contactRes] =
		await Promise.all([
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
			project: projectsRes.data[0],
			categories: categoriesRes.data,
			homepage: homepageRes.data,
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Project;
