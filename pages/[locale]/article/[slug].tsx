import type { GetStaticPaths, GetStaticProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

import Moment from 'react-moment';
import { motion } from 'framer-motion';

import { fetchAPI } from '../../../lib/api';
import { getStrapiMedia } from '../../../lib/media';

import { Article as ArticleType } from '../../../types/article';
import { Category as CategoryType } from '../../../types/category';
import { Seo as SeoType } from '../../../types/seo';

import { Banner, Box, Container } from '../../../stitches.config';
import BlockManager from '../../../components/BlockManager';
import Seo from '../../../components/Seo';
import Nav from '../../../components/Nav';
import Image from '../../../components/Image';

interface ArticleProps {
	article: ArticleType;
	categories: CategoryType[];
}

const Article = ({ article, categories }: ArticleProps) => {
	const seo: SeoType = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.cover,
		article: true,
	};

	return (
		<Box>
			{/* <Nav categories={categories} /> */}
			<Seo seo={seo} />
			<Container>
				<Banner>
					<motion.div
						layoutId={`cover-${article.attributes.slug}`}
						style={{
							width: '100%',
							height: '100%',
							position: 'relative',
						}}
					>
						<Image image={article.attributes.cover} layout="fill" />
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
							layoutId={`title-${article.attributes.slug}`}
						>
							{article.attributes.title}
						</motion.h1>
					</div>
				</Banner>
				<div>
					<BlockManager blocks={article.attributes.blocks} />
					<hr />
					{article.attributes.author && (
						<div>
							{article.attributes.author.data?.attributes
								.picture && (
								<img
									src={getStrapiMedia(
										article.attributes.author.data
											?.attributes.picture
									)}
									alt={
										article.attributes.author.data
											?.attributes.picture.data
											?.attributes.alternativeText
									}
									style={{
										position: 'static',
										borderRadius: '20%',
										height: 60,
									}}
								/>
							)}
							<div>
								<p>
									By{' '}
									{
										article.attributes.author.data
											?.attributes.name
									}
								</p>
								<p>
									<Moment format="MMM Do YYYY">
										{article.attributes.publishedAt}
									</Moment>
								</p>
							</div>
						</div>
					)}
				</div>
			</Container>
		</Box>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const articlesRes = await fetchAPI<ArticleType[]>('/articles', {
		fields: ['slug', 'locale'],
		locale: 'all',
	});

	return {
		paths: articlesRes.data.map((article: ArticleType) => ({
			params: {
				slug: article.attributes.slug,
				locale: article.attributes.locale,
			},
		})),
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<
	ArticleProps,
	ParsedUrlQuery
> = async ({ params: { locale, slug } }) => {
	const articlesRes = await fetchAPI<ArticleType[]>('/articles', {
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
	});
	const categoriesRes = await fetchAPI<CategoryType[]>('/categories', {
		fields: ['name', 'slug', 'locale'],
		locale,
	});

	return {
		props: { article: articlesRes.data[0], categories: categoriesRes.data },
		revalidate: true,
	};
};

export default Article;
