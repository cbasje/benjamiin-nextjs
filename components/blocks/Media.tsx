import { Picture as PictureType } from '@/models/picture';
import Image from '@components/Image';

const Media = ({ file }: { file?: { data: PictureType } }) => {
	return <Image image={file} />;
};

export default Media;
