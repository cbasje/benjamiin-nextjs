import Error from 'next/error';
import React from 'react';
import Card from './Card';

const Articles = ({ articles }: { articles?: Article[] }) => {
	if (!articles) return <Error statusCode={404} />;

	const leftArticlesCount = Math.ceil(articles.length / 5);
	const leftArticles = articles.slice(0, leftArticlesCount);
	const rightArticles = articles.slice(leftArticlesCount, articles.length);

	return (
		<div>
			<div className="uk-child-width-1-2@s" data-uk-grid="true">
				<div>
					{leftArticles.map((article: Article, i: number) => {
						return (
							<Card
								article={article}
								key={`article__left__${article.attributes.slug}`}
							/>
						);
					})}
				</div>
				<div>
					<div
						className="uk-child-width-1-2@m uk-grid-match"
						data-uk-grid
					>
						{rightArticles.map((article: Article, i: number) => {
							return (
								<Card
									article={article}
									key={`article__left__${article.attributes.slug}`}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Articles;
