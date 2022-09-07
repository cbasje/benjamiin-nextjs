import Image from "next/future/image";

import { Picture as PictureSrc } from "lib/types";

import { styled } from "@/stitches.config";
import { urlFor } from "@/lib/sanity";

const StyledImage = styled(Image, {
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

const Picture = ({
    src,
    fillContainer,
    width = 2048,
    height = 1080,
}: {
    src?: PictureSrc;
    fillContainer?: boolean;
    width?: number;
    height?: number;
}) => {
    // FIXME: If no src is provided, return an error
    if (!src) return <p>Not found</p>;

    // const { alternativeText, width, height } = src;
    return (
        <StyledImage
            width={1000}
            height={562.5}
            src={urlFor(src)
                .width(width)
                .height(height)
                .auto("format")
                .fit("max")
                .url()}
            alt={""}
            fill={fillContainer}
        />
        // <div>{urlFor(src).auto("format").fit("max").url()}</div>
    );
};

export default Picture;
