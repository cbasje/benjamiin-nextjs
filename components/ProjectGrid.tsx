import Error from "next/error";
import { styled } from "@/stitches.config";
import { motion } from "framer-motion";

import { Project } from "@/lib/types";

import ProjectCard from "./ProjectCard";

const Grid = styled(motion.div, {
    display: "inline-grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "10px",
    gridAutoRows: "minmax(100px, auto)",
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
        >
            {projects.map((project: Project, i: number) => (
                <div key={project.slug}>
                    <ProjectCard project={project} />
                    <p>{project.title}</p>
                </div>
            ))}
        </Grid>
    );
};

export default ProjectGrid;
