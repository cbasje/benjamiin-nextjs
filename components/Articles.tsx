import React from 'react';
import Error from 'next/error';

import { Article as ArticleType } from '../types/article';

import Card from './Card';

const Articles = ({ articles }: { articles: ArticleType[] }) => {
	if (!articles) return <Error statusCode={404} />;

	return (
		<div>
			{articles.map((article: ArticleType, i: number) => (
				<Card
					article={article}
					key={`card-${article.attributes.slug}`}
				/>
			))}
		</div>
	);
};

export default Articles;
