import Link from 'next/link';
import Picture from './Picture';
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
			<>
				<motion.div
					layoutId={`cover-${project.attributes.slug}`}
					style={{
						width: '16vmax',
						height: '9vmax',
						position: 'relative',
					}}
				>
					<Picture
						src={project.attributes.cover.data}
						fillContainer
					/>
				</motion.div>
				<div>
					<motion.h1
						layoutId={`title-${project.attributes.slug}`}
						style={{ width: 'fit-content' }}
					>
						{project.attributes.title}
					</motion.h1>
					<p>{project.attributes.category.data?.attributes.title}</p>
				</div>
			</>
		</Link>
	);
};

export default Card;
