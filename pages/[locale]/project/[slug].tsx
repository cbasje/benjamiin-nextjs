import { ReactNode, useEffect } from "react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import type { ParsedUrlQuery } from "querystring";
import { motion } from "framer-motion";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "phosphor-react";

import Layout from "@/components/Layout";
import Picture from "@/components/Picture";
import { Container, styled } from "@/stitches.config";

import { dialogOverlayVariants, dialogVariants } from "@/lib/transition";
import { sanityClient, getClient } from "@/lib/sanity-server";
import { projectQuery, projectSlugsQuery } from "@/lib/queries";
import { Project, Seo, Locale } from "@/lib/types";
import { parseLocale } from "@/lib/locale";

const StyledOverlay = styled(DialogPrimitive.Overlay, {
    backgroundColor: "rgb(33 37 41 / 35%)", // TODO: convert everything to space rgba
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
    color: "$gray0",
    position: "fixed",
    top: ".5em",
    right: ".5em",
    cursor: "pointer",
    pointerEvents: "all",
    zIndex: 1,

    "&:hover": { backgroundColor: "$purple4" },
    "&:focus": { boxShadow: "0 0 0 2px $purple4" },
});

const Content = ({ children, ...props }: { children: ReactNode }) => {
    return (
        <>
            <motion.div variants={dialogOverlayVariants}>
                <StyledOverlay />
                <DialogClose asChild>
                    <IconButton aria-label="Close">
                        <X size="2em" weight="bold" />
                    </IconButton>
                </DialogClose>
            </motion.div>
            <motion.div variants={dialogVariants}>
                <StyledContent {...props}>
                    <Container paddingY css={{ minHeight: "100%" }}>
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
        <Layout seo={seo}>
            <Dialog open={true} onOpenChange={(e) => !e && router.push("/")}>
                <DialogContent>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>

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
                    <div>{project.body}</div>
                </DialogContent>
            </Dialog>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const projectsRes = await sanityClient.fetch<Project[]>(projectSlugsQuery);

    return {
        paths: projectsRes.map((project: Project) => ({
            params: {
                slug: project.slug,
                locale: project.locale,
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

    const { project } = await getClient(preview).fetch<{ project: Project }>(
        projectQuery,
        {
            slug,
            locale,
        }
    );

    return {
        props: {
            project,
        },
        revalidate: 1,
    };
};

export default ProjectPage;
