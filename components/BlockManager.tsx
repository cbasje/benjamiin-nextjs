import { ReactNode } from 'react';

import {
	Block as BlockType,
	RichTextBlock as RichTextBlockType,
	CodeBlock as CodeBlockType,
	MediaBlock as MediaBlockType,
	CarouselBlock as CarouselBlockType,
	QuoteBlock as QuoteBlockType,
} from '@/models/block';

import { RichText, Code, Media, Carousel, Quote } from './blocks';
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
		case 'blocks.code':
			props = blockType as CodeBlockType;
			block = <Code key={`block-${key}`} {...props} />;
			break;
		case 'blocks.media':
			props = blockType as MediaBlockType;
			block = <Media key={`block-${key}`} {...props} />;
			break;
		case 'blocks.carousel':
			props = blockType as CarouselBlockType;
			block = <Carousel key={`block-${key}`} {...props} />;
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
