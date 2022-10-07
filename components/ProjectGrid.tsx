import Error from "next/error";
import { styled } from "@/stitches.config";
import { motion } from "framer-motion";

import { Project } from "@/lib/types";

import ProjectCard from "./ProjectCard";

const Grid = styled(motion.div, {
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, 1fr)",
    gridTemplateAreas: "'main side-up' 'main side-down'",
    gridGap: "1rem",

    "& > :first-child": {
        gridArea: "main",
    },
    "& > :nth-child(2)": {
        gridArea: "side-up",
    },
    "& > :nth-child(3)": {
        gridArea: "side-down",
    },
    // "& > :not(:first-child)": {
    //     gridArea: "small",
    // },
});

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
    if (!projects) return <Error statusCode={404} />;

    return (
        <Grid
            initial="initial"
            animate="enter"
            exit="exit"
            variants={{
                exit: { transition: { staggerChildren: 0.1 } },
            }}
            role="grid"
        >
            {projects.map((project: Project, i: number) => (
                <ProjectCard project={project} key={project.slug} />
            ))}
        </Grid>
    );
};

export default ProjectGrid;
