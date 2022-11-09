import { Image as ImageSrc } from "lib/types";
import NextImage from "next/image";

import { urlFor } from "@/lib/sanity";
import { styled } from "@/stitches.config";

import ImageNotFound from "./ImageNotFound";

const StyledImage = styled(NextImage, {
    objectFit: "cover",

    variants: {
        fill: {
            true: {
                width: "100%",
                height: "100%",
            },
        },
    },
});

const Image = ({
    src,
    fillContainer = true,
    width = 2048,
    height = 1080,
}: {
    src?: ImageSrc;
    fillContainer?: boolean;
    width?: number;
    height?: number;
}) => {
    if (!src) return <ImageNotFound />;

    // const { alternativeText, width, height } = src;
    return (
        <StyledImage
            width={width}
            height={height}
            src={urlFor(src)
                .width(width)
                .height(height)
                .auto("format")
                .fit("max")
                .url()}
            alt={""}
            fill={fillContainer}
        />
    );
};

export default Image;
