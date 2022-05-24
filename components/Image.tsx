import { getStrapiMedia } from '../lib/media';
import NextImage from 'next/image';
import Error from 'next/error';

const Image = ({ image }: { image?: { data: Picture } }) => {
	// console.log('Image', image, image.data);
	if (!(image && image.data)) return <Error statusCode={404} />;

	const { alternativeText, width, height } = image.data.attributes;
	return (
		<NextImage
			layout="responsive"
			width={width}
			height={height}
			objectFit="contain"
			src={getStrapiMedia(image)}
			alt={alternativeText || ''}
		/>
	);
};

export default Image;
