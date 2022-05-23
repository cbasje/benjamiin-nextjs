import { ReactNode } from 'react';
import Media from './blocks/Media';
import RichText from './blocks/RichText';

const getBlockComponent = (
	{ id, __component, ...rest }: { id: number; __component: string },
	index: number
): ReactNode => {
	let Block;

	switch (__component) {
		case 'shared.rich-text':
			Block = RichText;
			break;
		case 'shared.media':
			Block = Media;
	}

	return Block ? <Block key={`i-${index}`} {...rest} /> : null;
};

const BlockManager = ({ blocks }: { blocks: any[] } = { blocks: [] }) => {
	return <div>{blocks.map(getBlockComponent)}</div>;
};

export default BlockManager;
