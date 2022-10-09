import Error from "next/error";
import { styled } from "@/stitches.config";
import { motion } from "framer-motion";

import { Project } from "@/lib/types";

import ProjectCard from "./ProjectCard";

const Grid = styled(motion.div, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    gap: "$2",

    "@md": {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gridTemplateAreas: "'main side-up' 'main side-down'",
        gridGap: "$2",
        alignItems: "stretch",

        "& > :first-child": {
            gridArea: "main",
            $$cardBg: "$colors$purple1",
        },
        "& > :nth-child(2)": {
            gridArea: "side-up",
            $$cardBg: "$colors$green1",
        },
        "& > :nth-child(3)": {
            gridArea: "side-down",
            $$cardBg: "$colors$blue1",
        },
    },
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
