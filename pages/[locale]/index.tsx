import type { GetStaticPaths, GetStaticProps } from "next";

import { parseLocale } from "@/lib/locale";
import { homeQuery, projectsQuery } from "@/lib/queries";
import { getClient } from "@/lib/sanity-server";
import { pageVariants } from "@/lib/transition";
import { Home, Locale, Project } from "@/lib/types";
import { Main, styled } from "@/stitches.config";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Intro from "@/components/Intro";
import Layout from "@/components/Layout";
import ProjectGrid from "@/components/ProjectGrid";

const StyledSection = styled("section", {
    width: "100%",
    height: "100vh",

    "& > *": {
        width: "100%",
        height: "100%",
    },

    variants: {
        for: {
            intro: {
                height: "calc(100vh - $space$headerHeight - (2*$space$6))",
            },
            projects: {
                height: "calc(100vh - $space$headerHeight - (2*$space$6))",
            },
            callToAction: {
                height: "calc(100vh - $space$headerHeight - $space$footerHeight",
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
        <Layout variants={pageVariants} seo={homepage.seo}>
            <Header />

            <Main>
                <StyledSection for="intro">
                    <Intro homepage={homepage} />
                </StyledSection>

                <StyledSection for="projects">
                    <ProjectGrid projects={projects} />
                </StyledSection>

                <StyledSection for="callToAction"></StyledSection>
            </Main>

            <Footer />
        </Layout>
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

    const [projectsRes, homepageRes] = await Promise.all([
        getClient(preview!).fetch<Project[]>(projectsQuery, {
            locale,
        }),
        getClient(preview!).fetch<Home>(homeQuery, {
            locale,
        }),
    ]);

    return {
        props: {
            projects: projectsRes,
            homepage: homepageRes,
        },
        revalidate: 1,
    };
};

export default HomePage;
