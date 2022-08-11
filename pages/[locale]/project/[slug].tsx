import { ReactNode, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

import { fetchAPI } from "@/lib/api";
import { overlayVariants, pageVariants } from "@/util/transition";
import { Container, Flex, styled } from "@/stitches.config";

import { Project as ProjectType } from "@/models/project";
import { Seo as SeoType } from "@/models/seo";
import { Locale } from "@/models/locale";

import BlockManager from "@/components/BlockManager";
import Layout from "@/components/Layout";
import Picture from "@/components/Picture";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: "rgb(151 117 250 / 0.25)", // TODO: convert everything to space rgba
    position: "fixed",
    inset: 0,
    zIndex: -1,
});

const StyledContent = styled(DialogPrimitive.Content, {
    backgroundColor: "$bg",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginTop: "4em",
    width: "100vw",
    height: "calc(100vh - 4em)",
    overflowY: "scroll",

    "&:focus": { outline: "none" },
});

const StyledTitle = styled(DialogPrimitive.Title, {
    margin: 0,
    fontWeight: 500,
    color: "$textOnBg",
    fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
    margin: "10px 0 20px",
    color: "$textOnBg",
    fontSize: 15,
    lineHeight: 1.5,
});

const IconButton = styled("button", {
    all: "unset",
    fontFamily: "inherit",
    borderRadius: "100%",
    height: "3em",
    width: "3em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: "$gray8",
    position: "fixed",
    top: ".5em",
    right: ".5em",
    cursor: "pointer",
    pointerEvents: "all",
    zIndex: 1,

    "&:hover": { backgroundColor: "$primary4", color: "$gray0" },
    "&:focus": { boxShadow: "0 0 0 2px $primary4" },
});

const Content = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <>
            <motion.div variants={overlayVariants}>
                <StyledOverlay />
                <DialogClose asChild>
                    <IconButton aria-label="Close">
                        <X size="2em" weight="bold" />
                    </IconButton>
                </DialogClose>
            </motion.div>
            <motion.div variants={pageVariants}>
                <StyledContent {...props}>
                    <Container css={{ minHeight: "100%", paddingBlock: "$6" }}>
                        {children}
                    </Container>
                </StyledContent>
            </motion.div>
        </>
    );
};

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

export const Banner = styled("div", {
    width: "100vw",
    height: "75vh",
    position: "relative",
});

interface ProjectProps {
    project: ProjectType;
}

const Project = ({ project }: ProjectProps) => {
    const seo: SeoType = {
        metaTitle: project.attributes.title,
        metaDescription: project.attributes.description,
        shareImage: project.attributes.cover,
        isArticle: true,
    };

    const router = useRouter();

    useEffect(() => {
        router.prefetch("/");
    }, []);

    return (
        <Layout seo={seo}>
            <Dialog open={true} onOpenChange={(e) => !e && router.push("/")}>
                <DialogContent>
                    <DialogTitle>{project.attributes.title}</DialogTitle>
                    <DialogDescription>
                        {project.attributes.description}
                    </DialogDescription>

                    <Banner>
                        <motion.div
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                            }}
                        >
                            <Picture
                                src={project.attributes.cover.data}
                                fillContainer
                            />
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
                                {project.attributes.title}
                            </motion.h1>
                        </div>
                    </Banner>

                    <BlockManager blocks={project.attributes.blocks} />
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const projectsRes = await fetchAPI<ProjectType[]>("/projects", {
        fields: ["slug", "locale"],
        locale: "all",
    });

    return {
        paths: projectsRes.data.map((project: ProjectType) => ({
            params: {
                slug: project.attributes.slug,
                locale: project.attributes.locale,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<
    ProjectProps,
    ParsedUrlQuery
> = async ({ params }) => {
    const { locale, slug } = params as { locale: Locale; slug: string };

    const [projectsRes] = await Promise.all([
        fetchAPI<ProjectType[]>("/projects", {
            filters: { slug },
            populate: {
                author: {
                    populate: "*",
                },
                blocks: {
                    populate: "*",
                },
                cover: {
                    populate: "*",
                },
                category: {
                    populate: "*",
                },
            },
            locale,
        }),
    ]);

    return {
        props: {
            project: projectsRes.data[0],
        },
        revalidate: 1,
    };
};

export default Project;
