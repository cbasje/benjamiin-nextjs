import Picture from '@/components/Picture';
import { CarouselBlock as CarouselBlockType } from '@/models/block';
import { CarouselContainer } from '@/stitches.config';

const Carousel = ({ files }: CarouselBlockType) => {
	return (
		<CarouselContainer>
			{files && files.data && files.data.map((f) => <Picture src={f} />)}
		</CarouselContainer>
	);
};

export default Carousel;
