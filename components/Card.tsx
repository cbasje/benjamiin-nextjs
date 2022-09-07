import Link from "next/link";
import Picture from "./Picture";
import { motion } from "framer-motion";
import { Project } from "@/lib/types";

const Card = ({ project }: { project: Project }) => {
    return (
        <Link
            href={{
                pathname: "/[locale]/project/[slug]",
                query: {
                    locale: project.locale,
                    slug: project.slug,
                },
            }}
        >
            <>
                <motion.div
                    style={{
                        width: "16vmax",
                        height: "9vmax",
                        position: "relative",
                    }}
                >
                    <Picture src={project.mainImage} fillContainer />
                </motion.div>
                <div>
                    <motion.h1 style={{ width: "fit-content" }}>
                        {project.title}
                    </motion.h1>
                    <p>{project.categories?.map((c) => c.title).join(", ")}</p>
                </div>
            </>
        </Link>
    );
};

export default Card;
