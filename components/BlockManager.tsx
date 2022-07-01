import { ReactNode } from 'react';

import {
	RichTextBlock as RichTextBlockType,
	MediaBlock as MediaBlockType,
} from '@/models/block';

import Media from './blocks/Media';
import RichText from './blocks/RichText';

const getBlockComponent = (
	block: RichTextBlockType | MediaBlockType,
	index: number
): ReactNode => {
	let Block;

	switch (block.__component) {
		case 'blocks.rich-text':
			Block = RichText;
			break;
		case 'blocks.media':
			Block = Media;
	}

	return Block ? <Block key={`i-${index}`} {...block} /> : null;
};

const BlockManager = (
	{ blocks }: { blocks?: (RichTextBlockType | MediaBlockType)[] } = {
		blocks: [],
	}
) => {
	return <div>{blocks && blocks.map(getBlockComponent)}</div>;
};

export default BlockManager;
