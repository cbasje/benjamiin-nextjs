import { Picture } from './picture';

export interface Block {
	id: number;
	__component: string;
}

export interface RichTextBlock extends Block {
	body: string;
}

export interface MediaBlock extends Block {
	file: {
		data: Picture;
	};
}

export interface QuoteBlock extends Block {
	title: string;
	body: string;
}
