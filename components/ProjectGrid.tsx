import Error from "next/error";

import { Project as ProjectType } from "@/models/project";

import Card from "./Card";

const ProjectGrid = ({ projects }: { projects: ProjectType[] }) => {
    if (!projects) return <Error statusCode={404} />;

    return (
        <div>
            {projects.map((project: ProjectType, i: number) => (
                <Card
                    project={project}
                    key={`card-${project.attributes.slug}`}
                />
            ))}
        </div>
    );
};

export default ProjectGrid;
