import { GetStaticPaths, GetStaticProps } from 'next';

import { fetchAPI } from '@/lib/api';

import { NotFound as NotFoundType } from '@/models/not-found';
import { Locale } from '@/models/locale';

import Seo from '@/components/Seo';
import { Box } from '@/stitches.config';

interface NotFoundProps {
	notFound: NotFoundType;
}

const NotFound = ({ notFound }: NotFoundProps) => {
	return (
		<>
			<Seo seo={notFound.attributes.seo}></Seo>
			<Box>Page not found!</Box>
		</>
	);
};

export const getStaticProps: GetStaticProps<NotFoundProps> = async ({
	params,
}) => {
	// const [notFoundRes] = await Promise.all([
	// 	fetchAPI<NotFoundType>('/not-found', {
	// 		populate: '*',
	// 	}),
	// ]);

	return {
		props: {
			// notFound: notFoundRes.data,
			notFound: {
				id: 123,
				attributes: {
					title: 'Page not found!',
				},
			},
		},
		revalidate: 1,
	};
};

export default NotFound;
