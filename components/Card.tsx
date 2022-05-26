import React from 'react';
import Link from 'next/link';
import Image from './Image';
import { motion } from 'framer-motion';

const Card = ({ article }: { article: Article }) => {
	return (
		<Link href={`/article/${article.attributes.slug}`}>
			<a>
				<motion.div
					layoutId={`cover-${article.attributes.slug}`}
					style={{
						width: '100%',
						height: '100%',
						position: 'relative',
					}}
				>
					<Image
						image={article.attributes.cover}
						layout="responsive"
					/>
				</motion.div>
				<div>
					<motion.h1 layoutId={`title-${article.attributes.slug}`}>
						{article.attributes.title}
					</motion.h1>
					<p>{article.attributes.category.data?.attributes.name}</p>
				</div>
			</a>
		</Link>
	);
};

export default Card;
