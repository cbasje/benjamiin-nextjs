import Picture from "@/components/Picture";
import { CarouselBlock as CarouselBlockType } from "@/models/block";
import { CarouselContainer } from "@/stitches.config";

const CarouselBlock = ({ files }: CarouselBlockType) => {
    return (
        <CarouselContainer>
            {files &&
                files.data &&
                files.data.map((f) => <Picture key={`pic-${f.id}`} src={f} />)}
        </CarouselContainer>
    );
};

export default CarouselBlock;
