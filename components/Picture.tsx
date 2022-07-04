import NextImage from 'next/image';
import Error from 'next/error';

import { Picture as PictureType } from '@/models/picture';

import { getStrapiMedia } from '@/lib/media';

const Picture = ({
	src,
	layout,
}: {
	src?: PictureType;
	layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
}) => {
	if (!src) return <Error statusCode={404} />;

	const { alternativeText, width, height } = src.attributes;
	return (
		<NextImage
			layout={layout}
			width={layout && layout !== 'fill' ? 16 : width}
			height={layout && layout !== 'fill' ? 9 : height}
			objectFit="cover"
			src={getStrapiMedia(src)}
			alt={alternativeText || ''}
		/>
	);
};

export default Picture;
