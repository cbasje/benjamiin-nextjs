import Picture from '@/components/Picture';
import { PictureBlock as PictureBlockType } from '@/models/block';

const PictureBlock = ({ file }: PictureBlockType) => {
	return <Picture src={file?.data} />;
};

export default PictureBlock;
