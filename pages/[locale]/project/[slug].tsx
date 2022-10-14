import { motion } from "framer-motion";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import { parseLocale } from "@/lib/locale";
import { mdxToHtml } from "@/lib/mdx";
import { projectPathsQuery, projectQuery } from "@/lib/queries";
import { getClient, sanityClient } from "@/lib/sanity-server";
import { Locale, Project, Seo } from "@/lib/types";

import MDXComponents from "@/components/MDXComponents";
import Picture from "@/components/Picture";
import ProjectsLayout, {
    ProjectSubTitle,
    ProjectTitle,
} from "@/layouts/Projects";
import { Flex, Grid, styled } from "@/stitches.config";
import { MDXRemote } from "next-mdx-remote";

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
        metaDescription: project.subTitle,
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
                        <ProjectSubTitle>{project.subTitle}</ProjectSubTitle>

                        <Flex css={{ flexDirection: "row" }}>
                            <span>
                                {new Intl.DateTimeFormat(router.query.locale, {
                                    month: "long",
                                    year: "numeric",
                                }).format(new Date(project.publishedAt))}
                            </span>

                            {project.categories &&
                                project.categories.map((c) => (
                                    <span>{c.title}</span>
                                ))}
                        </Flex>
                    </Flex>

                    <p>{project.description}</p>
                </Grid>
            </Flex>

            <Banner css={{ background: `rgb($colors$${project.colour}100)` }}>
                <Picture src={project.mainImage} fillContainer />
            </Banner>

            {/* <BlockManager blocks={project.attributes.blocks} /> */}
            {/* <p>{project.body}</p> */}
            <MDXRemote {...project.content} components={MDXComponents} />
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

    type ProjectFromSanity = Omit<Project, "content"> & { content: string };
    const { project } = await getClient(preview).fetch<{
        project: ProjectFromSanity;
    }>(projectQuery, {
        slug,
        locale,
    });

    const { html } = await mdxToHtml(project.content);

    return {
        props: {
            project: {
                ...project,
                content: html,
            },
        },
        revalidate: 1,
    };
};

export default ProjectPage;
