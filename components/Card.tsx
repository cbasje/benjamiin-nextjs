import Link from 'next/link';
import Image from './Image';
import { motion } from 'framer-motion';
import { Project as ProjectType } from '@/models/project';

const Card = ({ project }: { project: ProjectType }) => {
	return (
		<Link
			href={{
				pathname: '/[locale]/project/[slug]',
				query: {
					locale: project.attributes.locale,
					slug: project.attributes.slug,
				},
			}}
		>
			<a>
				<motion.div
					layoutId={`cover-${project.attributes.slug}`}
					style={{
						width: '17vmax',
						// height: '100%',
						position: 'relative',
					}}
				>
					<Image
						image={project.attributes.cover}
						layout="responsive"
					/>
				</motion.div>
				<div>
					<motion.h1 layoutId={`title-${project.attributes.slug}`}>
						{project.attributes.title}
					</motion.h1>
					<p>{project.attributes.category.data?.attributes.title}</p>
				</div>
			</a>
		</Link>
	);
};

export default Card;
