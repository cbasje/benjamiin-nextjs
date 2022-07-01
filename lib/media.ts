import { getStrapiURL } from './api';
import { Picture as PictureType } from '@/models/picture';

export function getStrapiMedia(media?: { data?: PictureType }): string {
	if (!(media && media.data)) return '';

	const { url } = media.data.attributes;
	const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
	return imageUrl;
}
