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
import ProjectsLayout from "@/layouts/Projects";
import { styled } from "@/stitches.config";
import { MDXRemote } from "next-mdx-remote";

export const Banner = styled("div", {
    width: "100vw",
    height: "75vh",
    position: "relative",
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
            seo={seo}
            project={project}
            onClose={() => router.push("/")}
        >
            <Banner>
                <motion.div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "relative",
                    }}
                >
                    <Picture src={project.mainImage} fillContainer />
                </motion.div>

                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        display: "grid",
                        placeContent: "center",
                    }}
                >
                    <motion.h1
                        style={{
                            mixBlendMode: "difference",
                            color: "white",
                        }}
                    >
                        {project.title}
                    </motion.h1>
                </div>
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
