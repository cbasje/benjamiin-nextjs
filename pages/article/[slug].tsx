import Moment from 'react-moment';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';

import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import BlockManager from '../../components/BlockManager';
import { Params } from 'next/dist/server/router';

const Article = ({
	article,
	categories,
}: {
	article: Article;
	categories: Category[];
}) => {
	const imageUrl = getStrapiMedia(article?.attributes.cover);

	const seo: Seo = {
		metaTitle: article.attributes.title,
		metaDescription: article.attributes.description,
		shareImage: article.attributes.cover,
		article: true,
	};

	return (
		<Layout categories={categories}>
			<Seo seo={seo} />
			<div
				id="banner"
				className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
				data-src={imageUrl}
				data-srcset={imageUrl}
				data-uk-img
			>
				<h1>{article.attributes.title}</h1>
			</div>
			<div className="uk-section">
				<div className="uk-container uk-container-small">
					<BlockManager blocks={article.attributes.blocks} />
					<hr className="uk-divider-small" />
					{/* <div
						className="uk-grid-small uk-flex-left"
						data-uk-grid="true"
					>
						<div>
							{article.attributes.author.data.attributes
								.picture && (
								<img
									src={getStrapiMedia(
										article.attributes.author.data
											.attributes.picture
									)}
									alt={
										article.attributes.author.data
											.attributes.picture.data?.attributes
											.alternativeText
									}
									style={{
										position: 'static',
										borderRadius: '20%',
										height: 60,
									}}
								/>
							)}
						</div>
						<div className="uk-width-expand">
							<p className="uk-margin-remove-bottom">
								By{' '}
								{article.attributes.author.data.attributes.name}
							</p>
							<p className="uk-text-meta uk-margin-remove-top">
								<Moment format="MMM Do YYYY">
									{article.attributes.publishedAt}
								</Moment>
							</p>
						</div>
					</div> */}
				</div>
			</div>
		</Layout>
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
		// populate: ['image', 'category', 'author.picture', 'content'],
		populate: {
			image: '*',
			category: '*',
			cover: '*',
			// author: {
			// 	populate: {
			// 		picture: {
			// 			populate: '*',
			// 		},
			// 	},
			// },
			blocks: {
				populate: '*',
			},
		},
	});
	const categoriesRes = await fetchAPI<Category[]>('/categories');

	console.log(articlesRes.data[0]);

	return {
		props: { article: articlesRes.data[0], categories: categoriesRes.data },
		revalidate: 1,
	};
}

export default Article;
