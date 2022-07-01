import { Picture as PictureType } from '../../types/picture';
import Image from '../Image';

const Media = ({ file }: { file?: { data: PictureType } }) => {
	return <Image image={file} />;
};

export default Media;
