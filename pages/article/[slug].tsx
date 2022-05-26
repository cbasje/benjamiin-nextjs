import Moment from 'react-moment';
import { motion } from 'framer-motion';

import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import { Params } from 'next/dist/server/router';

import { Banner, Box, Container } from '../../stitches.config';
import BlockManager from '../../components/BlockManager';
import Seo from '../../components/Seo';
import Nav from '../../components/Nav';
import Image from '../../components/Image';

const Article = ({
	article,
	categories,
}: {
	article: Article;
	categories: Category[];
}) => {
	const seo: Seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.cover,
		article: true,
	};

	return (
		<Box>
			<Nav categories={categories} />
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
							backdropFilter: 'invert(100%)',
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
					<div>
						{article.attributes.author?.data.attributes.picture && (
							<img
								src={getStrapiMedia(
									article.attributes.author?.data.attributes
										.picture
								)}
								alt={
									article.attributes.author?.data.attributes
										.picture.data?.attributes
										.alternativeText
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
									article.attributes.author?.data.attributes
										.name
								}
							</p>
							<p>
								<Moment format="MMM Do YYYY">
									{article.attributes.publishedAt}
								</Moment>
							</p>
						</div>
					</div>
				</div>
			</Container>
		</Box>
	);
};

export async function getStaticPaths() {
	const articlesRes = await fetchAPI('/articles', { fields: ['slug'] });

	return {
		paths: articlesRes.data.map((article: Article) => ({
			params: {
				slug: article.attributes.slug,
			},
		})),
		fallback: false,
	};
}

export async function getStaticProps({ params }: Params) {
	const articlesRes = await fetchAPI<Article[]>('/articles', {
		filters: { slug: params.slug },
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
	});
	const categoriesRes = await fetchAPI<Category[]>('/categories');

	return {
		props: { article: articlesRes.data[0], categories: categoriesRes.data },
		revalidate: 1,
	};
}

export default Article;
