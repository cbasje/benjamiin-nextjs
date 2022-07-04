import { Picture } from './picture';

export type Block = RichTextBlock | MediaBlock | CarouselBlock | QuoteBlock;

export interface BaseBlock {
	id: number;
	__component: string;
}

export interface RichTextBlock extends BaseBlock {
	body: string;
}

export interface MediaBlock extends BaseBlock {
	file: {
		data: Picture;
	};
}

export interface CarouselBlock extends BaseBlock {
	files: {
		data: Picture[];
	};
}

export interface QuoteBlock extends BaseBlock {
	body: string;
	link?: string;
	citation?: Citation;
}

interface Citation {
	author: string;
	company?: string;
	link?: string;
}
