import { Picture } from './picture';

export interface Seo {
	metaTitle: string;
	metaDescription?: string;
	shareImage?: { data?: Picture };
	article?: boolean;
	locale?: string;
}
