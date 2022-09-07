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
    flex: "1 0 33%",
    display: "flex",
    justifyContent: "",
    alignItems: "center",
    cursor: "pointer",

    "& div": {
        overflow: "hidden",
    },

    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
});

const ProjectCard = ({ project }: { project: Project }) => {
    if (!project.mainImage) return <p>Not found</p>;

    return (
        <StyledCard variants={cardVariants}>
            <motion.div
                whileHover="hover"
                variants={frameVariants}
                transition={transition}
            >
                <Link
                    href={`[locale]/project/[slug]`}
                    as={`${project.locale}/project/${project.slug}`}
                >
                    <motion.div
                        variants={imageVariants}
                        transition={transition}
                    >
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
                    </motion.div>
                </Link>
            </motion.div>
        </StyledCard>
    );
};

export default ProjectCard;
