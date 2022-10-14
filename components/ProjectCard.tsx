import { motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";

import { Project } from "@/lib/types";

import { urlFor } from "@/lib/sanity";
import { cardVariants, imageVariants, transition } from "@/lib/transition";
import { styled } from "@/stitches.config";
import ImageNotFound from "./ImageNotFound";

const StyledLink = styled(Link, {
    display: "block",
    position: "relative",
    width: "100%",
    height: "100%",
    cursor: "pointer",
});

const StyledImageContainer = styled(motion.div, {
    width: "100%",
    height: "100%",
});
const StyledImage = styled(Image, {
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const StyledLabelContainer = styled("div", {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: "$1",
    position: "absolute",
    bottom: "$space$1",
    insetInline: "$space$1",
    paddingInline: "$2",
    paddingBlock: "$1",
    borderRadius: "$sm",
    background: "rgb($bg / 75%)",
    WebkitBackdropFilter: "blur(25px)",
    backdropFilter: "blur(25px)",

    opacity: 0,
    visibility: "hidden",
    transition:
        "opacity .2s cubic-bezier(.33,1,.68,1),visibility .2s cubic-bezier(.33,1,.68,1)",

    "h2, p": {
        margin: 0,
        fontFamily: "$display",
    },
    h2: {
        fontSize: "1rem",
    },
    p: {
        fontSize: "0.9rem",
    },
});

const StyledCard = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    background: "$$cardBg",
    borderRadius: "$md",
    overflow: "hidden",

    [`&:hover ${StyledLabelContainer}`]: {
        opacity: 1,
        visibility: "visible",
    },
});

const ProjectCard = ({
    project,
    useCustomColour,
}: {
    project: Project;
    useCustomColour: boolean;
}) => {
    const imgURL = project.mainImage
        ? urlFor(project.mainImage).width(1500).auto("format").fit("max").url()
        : null;

    return (
        <StyledCard
            whileHover="hover"
            variants={cardVariants}
            transition={transition}
            role="gridcell"
            css={
                useCustomColour
                    ? {
                          $$cardBg: `rgb($colors$${project.colour}100) !important`,
                      }
                    : undefined
            }
        >
            <StyledLink
                href={{
                    pathname: "[locale]/project/[slug]",
                    query: { slug: project.slug, locale: project.locale },
                }}
            >
                <StyledImageContainer
                    variants={imageVariants}
                    transition={transition}
                >
                    {imgURL ? (
                        <StyledImage
                            width={1333}
                            height={2000}
                            src={imgURL}
                            alt="..."
                        />
                    ) : (
                        <ImageNotFound />
                    )}
                </StyledImageContainer>
                <StyledLabelContainer>
                    <h2>{project.title}</h2>
                    <p>{project.subTitle}</p>
                </StyledLabelContainer>
            </StyledLink>
        </StyledCard>
    );
};

export default ProjectCard;
