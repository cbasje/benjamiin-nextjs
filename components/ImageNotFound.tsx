import { Image } from "phosphor-react";

import { styled } from "@/stitches.config";

const StyledContainer = styled("div", {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "$1",

    color: "rgb($gray900)",
    opacity: 0.5,
    mixBlendMode: "luminosity",
});

const ImageNotFound = () => {
    return (
        <StyledContainer>
            <Image size={32} weight="bold" />
            <span>Image not found</span>
        </StyledContainer>
    );
};

export default ImageNotFound;
