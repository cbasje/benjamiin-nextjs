import { Author } from './author';
import { MediaBlock, RichTextBlock } from './block';
import { Category } from './category';
import { Picture } from './picture';

export interface Article {
	id: number;
	attributes: {
		title: string;
		description: string;
		slug: string;
		cover: { data?: Picture };
		category: {
			data?: Category;
		};
		author: {
			data?: Author;
		};
		blocks: (RichTextBlock | MediaBlock)[];
		createdAt: Date;
		updatedAt: Date;
		publishedAt: Date;
		locale: string;
	};
}
