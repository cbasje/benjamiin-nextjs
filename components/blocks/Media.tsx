import { Picture as PictureType } from '@/models/picture';
import Picture from '@/components/Picture';

const Media = ({ file }: { file?: { data: PictureType } }) => {
	return <Picture src={file} />;
};

export default Media;
