import Link from "next/link";
import Image from "next/future/image";
import { motion } from "framer-motion";

import { Project } from "@/lib/types";

import { styled } from "@/stitches.config";
import { urlFor } from "@/lib/sanity";
import {
    cardVariants,
    frameVariants,
    imageVariants,
    transition,
} from "@/lib/transition";

const StyledCard = styled(motion.div, {
    display: "flex",
    flexDirection: "column",

    "& div": {
        overflow: "hidden",
    },

    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
});
const StyledLink = styled(Link, {
    cursor: "pointer",
    display: "block",
});

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <StyledCard variants={cardVariants} role="gridcell">
            <motion.div
                whileHover="hover"
                variants={frameVariants}
                transition={transition}
            >
                <StyledLink
                    href={{
                        pathname: "[locale]/project/[slug]",
                        query: { slug: project.slug, locale: project.locale },
                    }}
                >
                    <motion.div
                        variants={imageVariants}
                        transition={transition}
                    >
                        {project.mainImage ? (
                            <Image
                                width={1333}
                                height={2000}
                                src={urlFor(project.mainImage)
                                    .width(1500)
                                    .auto("format")
                                    .fit("max")
                                    .url()}
                                alt="The Barbican"
                            />
                        ) : (
                            <p>Not found</p>
                        )}
                    </motion.div>
                    <h2>{project.title}</h2>
                </StyledLink>
            </motion.div>
        </StyledCard>
    );
};

export default ProjectCard;
