import Error from "next/error";

import { Project } from "@/lib/types";

import Card from "./Card";

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
    if (!projects) return <Error statusCode={404} />;

    return (
        <div>
            {projects.map((project: Project, i: number) => (
                <Card project={project} key={`card-${project.slug}`} />
            ))}
        </div>
    );
};

export default ProjectGrid;
