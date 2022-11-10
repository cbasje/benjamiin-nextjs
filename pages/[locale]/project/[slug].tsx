import { motion } from "framer-motion";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import BlockManager from "@/components/BlockManager";
import Image from "@/components/Image";
import ProjectsLayout, {
    ProjectDescription,
    ProjectTitle,
} from "@/layouts/Projects";
import { parseLocale } from "@/lib/locale";
import { projectPathsQuery, projectQuery } from "@/lib/queries";
import { getClient, sanityClient } from "@/lib/sanity-server";
import { Locale, Project, Seo } from "@/lib/types";
import { Flex, Grid, styled } from "@/stitches.config";

export const Banner = styled(motion.div, {
    width: "100%",
    height: "auto",
    borderRadius: "$sm",
    aspectRatio: "3 / 2",
    overflow: "hidden",
});

interface ProjectProps {
    project: Project;
}

const ProjectPage = ({ project }: ProjectProps) => {
    const seo: Seo = {
        metaTitle: project.title,
        metaDescription: project.description,
        shareImage: project.mainImage,
        isArticle: true,
    };

    const router = useRouter();

    useEffect(() => {
        router.prefetch("/");
    }, []);

    return (
        <ProjectsLayout
            colour={project.colour}
            seo={seo}
            onClose={() => router.push("/")}
        >
            <Flex css={{ flexDirection: "column", gap: "$1" }}>
                <ProjectTitle>{project.title}</ProjectTitle>
                <Grid
                    css={{ gridTemplateColumns: "repeat(2, 1fr)", gap: "$1" }}
                >
                    <Flex css={{ flexDirection: "column", gap: "$1" }}>
                        <ProjectDescription as="h3">
                            {project.description}
                        </ProjectDescription>

                        <Flex css={{ flexDirection: "row", gap: "$1" }}>
                            <span>
                                {new Intl.DateTimeFormat(router.query.locale, {
                                    month: "long",
                                    year: "numeric",
                                }).format(new Date(project.publishedAt))}
                            </span>

                            {project.company && (
                                <>
                                    <span>-</span>
                                    <span>{project.company?.title}</span>
                                </>
                            )}
                        </Flex>

                        <Flex css={{ flexDirection: "row", gap: "$1" }}>
                            {project.categories &&
                                project.categories.map((c) => (
                                    <span key={c._id}>{c.title}</span>
                                ))}
                        </Flex>
                    </Flex>

                    <p>{project.excerpt}</p>
                </Grid>
            </Flex>

            <Banner css={{ background: `rgb($colors$${project.colour}100)` }}>
                <Image src={project.mainImage} fillContainer />
            </Banner>

            <BlockManager content={project.content} />
        </ProjectsLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    type ProjectPath = Pick<Project, "slug" | "locale">;
    const paths = await sanityClient.fetch<ProjectPath[]>(projectPathsQuery);

    return {
        paths: paths.map((path: ProjectPath) => ({
            params: {
                slug: path.slug,
                locale: path.locale,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<
    ProjectProps,
    ParsedUrlQuery
> = async ({ params, preview = false }) => {
    const slug = params?.slug;
    const locale = await parseLocale(params?.locale as Locale);

    const { project } = await getClient(preview).fetch<{
        project: Project;
    }>(projectQuery, {
        slug,
        locale,
    });

    return {
        props: {
            project,
        },
        revalidate: 1,
    };
};

export default ProjectPage;
