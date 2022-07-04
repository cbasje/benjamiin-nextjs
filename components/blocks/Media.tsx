import { Picture as PictureType } from '@/models/picture';
import Picture from '@/components/Picture';
import { MediaBlock as MediaBlockType } from '@/models/block';

const Media = ({ file }: MediaBlockType) => {
	return <Picture src={file} />;
};

export default Media;
