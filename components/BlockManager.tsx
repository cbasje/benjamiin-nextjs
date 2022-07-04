import { ReactNode } from 'react';

import {
	RichTextBlock as RichTextBlockType,
	MediaBlock as MediaBlockType,
	QuoteBlock as QuoteBlockType,
	Block as BlockType,
} from '@/models/block';

import { Media, RichText, Quote } from './blocks';
import { BlocksContainer } from '@/stitches.config';

const getBlockComponent = (blockType: BlockType, index: number): ReactNode => {
	let block: ReactNode;
	let props;

	const key = `i-${index}`;

	switch (blockType.__component) {
		case 'blocks.rich-text':
			props = blockType as RichTextBlockType;
			block = <RichText key={`block-${key}`} {...props} />;
			break;
		case 'blocks.media':
			props = blockType as MediaBlockType;
			block = <Media key={`block-${key}`} {...props} />;
			break;
		case 'blocks.quote':
			props = blockType as QuoteBlockType;
			block = <Quote key={`block-${key}`} {...props} />;
			break;
	}

	return block;
};

const BlockManager = (
	{ blocks }: { blocks?: BlockType[] } = {
		blocks: [],
	}
) => {
	return (
		<BlocksContainer>
			{blocks && blocks.map(getBlockComponent)}
		</BlocksContainer>
	);
};

export default BlockManager;
