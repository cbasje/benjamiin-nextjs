import Image from "next/future/image";

import { Picture as PictureType } from "@/models/picture";

import { getStrapiMedia } from "@/lib/media";
import { CSSProperties } from "@stitches/react";
import { styled } from "@/stitches.config";

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
}: {
    src?: PictureType;
    fillContainer?: boolean;
}) => {
    // FIXME: If no src is provided, return an error
    if (!src) return <p>Not found</p>;

    const { alternativeText, width, height } = src.attributes;
    return (
        <StyledImage
            width={width}
            height={height}
            src={getStrapiMedia(src)}
            alt={alternativeText || ""}
            fill={fillContainer}
        />
    );
};

export default Picture;
