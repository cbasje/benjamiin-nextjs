import { MediaBlock, RichTextBlock } from './block';
import { Category } from './category';
import { Picture } from './picture';
import { Seo } from './seo';

export interface Project {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
		cover: { data?: Picture };
		category: {
			data?: Category;
		};
		blocks: (RichTextBlock | MediaBlock)[];
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		seo?: Seo;
		locale: string;
	};
}
