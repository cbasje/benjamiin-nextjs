import Error from 'next/error';
import React from 'react';
import Card from './Card';

const Articles = ({ articles }: { articles?: Article[] }) => {
	if (!articles) return <Error statusCode={404} />;

	return (
		<div>
			{articles.map((article: Article, i: number) => (
				<Card
					article={article}
					key={`card-${article.attributes.slug}`}
				/>
			))}
		</div>
	);
};

export default Articles;
