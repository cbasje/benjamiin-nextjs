import Image from '../Image';

const Media = ({ file }: { file?: { data: Picture } }) => {
	return <Image image={file} />;
};

export default Media;
