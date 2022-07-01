import { Picture } from './picture';

export interface Seo {
	metaTitle: string;
	metaDescription?: string;
	shareImage?: { data?: Picture };
	isArticle?: boolean;
	locale?: string;
}
