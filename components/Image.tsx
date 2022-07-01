import NextImage from 'next/image';
import Error from 'next/error';

import { Picture as PictureType } from '../types/picture';

import { getStrapiMedia } from '../lib/media';

const Image = ({
	image,
	layout,
}: {
	image?: { data?: PictureType | undefined };
	layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
}) => {
	if (!(image && image.data)) return <Error statusCode={404} />;

	const { alternativeText, width, height } = image.data.attributes;
	return (
		<NextImage
			layout={layout}
			width={layout && layout !== 'fill' ? 16 : undefined}
			height={layout && layout !== 'fill' ? 9 : undefined}
			objectFit="cover"
			src={getStrapiMedia(image)}
			alt={alternativeText || ''}
		/>
	);
};

export default Image;
