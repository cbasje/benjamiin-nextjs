import { getStrapiURL } from './api';

export function getStrapiMedia(media: any): string {
	// console.log('getStrapiMedia', media, media.data);
	if (!(media && media.data)) return '';

	const { url } = media.data.attributes;
	const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
	return imageUrl;
}
