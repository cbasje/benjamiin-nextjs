import Picture from '@/components/Picture';
import { MediaBlock as MediaBlockType } from '@/models/block';

const Media = ({ file }: MediaBlockType) => {
	return <Picture src={file.data} />;
};

export default Media;
