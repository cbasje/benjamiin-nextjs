import Link from "next/link";
import Image from "next/future/image";
import { motion } from "framer-motion";

import { Project } from "@/lib/types";

import { styled } from "@/stitches.config";
import { urlFor } from "@/lib/sanity";
import { cardVariants, imageVariants, transition } from "@/lib/transition";

const StyledCard = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    background: "$$cardBg",
    borderRadius: "$sm",
    overflow: "hidden",
});

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
    alignItems: "flex-end",
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

const ProjectCard = ({ project }: { project: Project }) => {
    const imgURL = project.mainImage
        ? urlFor(project.mainImage).width(1500).auto("format").fit("max").url()
        : null;

    return (
        <StyledCard
            whileHover="hover"
            variants={cardVariants}
            transition={transition}
            role="gridcell"
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
                        <p>Not found</p>
                    )}
                </StyledImageContainer>
                <StyledLabelContainer>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </StyledLabelContainer>
            </StyledLink>
        </StyledCard>
    );
};

export default ProjectCard;
