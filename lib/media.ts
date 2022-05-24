import { getStrapiURL } from './api';

export function getStrapiMedia(media?: { data?: Picture }): string {
	if (!(media && media.data)) return '';

	const { url } = media.data.attributes;
	const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
	return imageUrl;
}
