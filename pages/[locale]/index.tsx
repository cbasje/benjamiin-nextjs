import type { GetStaticPaths, GetStaticProps } from "next";

import { parseLocale } from "@/lib/locale";
import { homeQuery, projectListQuery } from "@/lib/queries";
import { getClient } from "@/lib/sanity-server";
import { pageVariants } from "@/lib/transition";
import { Home, Locale, Project } from "@/lib/types";
import { Main, styled } from "@/stitches.config";

import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import ProjectGrid from "@/components/ProjectGrid";
import MainLayout from "@/layouts/Main";

const StyledSection = styled("section", {
    width: "100%",
    // height: "100vh",
    height: "auto",

    filter: "grayscale(100%)",
    opacity: 0.7,
    transition:
        "filter .8s cubic-bezier(.33,1,.68,1), opacity .8s cubic-bezier(.33,1,.68,1)",

    "&:hover": {
        opacity: 1,
        filter: "grayscale(0%)",
    },

    "& > *": {
        width: "100%",
        height: "100%",
    },

    variants: {
        for: {
            intro: {
                // height: "calc(100vh - $space$headerHeight - (2*$space$6))",
                aspectRatio: 1.88,
            },
            projects: {
                // height: "calc(100vh - $space$headerHeight - (2*$space$6))",
                aspectRatio: 1.85,
            },
            callToAction: {
                // height: "calc(100vh - $space$headerHeight - $space$footerHeight)",
                aspectRatio: 2.11,
            },
        },
    },
});

interface HomeProps {
    projects: Project[];
    homepage: Home;
}

const HomePage = ({ projects, homepage }: HomeProps) => {
    return (
        <MainLayout variants={pageVariants} seo={homepage.seo}>
            <Header />

            <Main>
                <StyledSection for="intro">
                    <Intro homepage={homepage} />
                </StyledSection>

                <StyledSection for="projects">
                    <ProjectGrid projects={projects} />
                </StyledSection>

                <StyledSection for="callToAction">
                    <CallToAction />
                </StyledSection>

                <Footer />
            </Main>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({
    params,
    preview,
}) => {
    const locale = await parseLocale(params?.locale as Locale);

    const [projects, homepage] = await Promise.all([
        getClient(preview!).fetch<Project[]>(projectListQuery, {
            locale,
        }),
        getClient(preview!).fetch<Home>(homeQuery, {
            locale,
        }),
    ]);

    return {
        props: {
            projects,
            homepage,
        },
        revalidate: 1,
    };
};

export default HomePage;
