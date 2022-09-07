import type { GetStaticPaths, GetStaticProps } from "next";

import { getClient } from "@/lib/sanity-server";
import { parseLocale } from "@/lib/locale";
import { pageVariants } from "@/lib/transition";
import { Project, Home, Locale } from "@/lib/types";
import { homeQuery, projectsQuery } from "@/lib/queries";
import { Container } from "@/stitches.config";

import ProjectGrid from "@/components/ProjectGrid";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

interface HomeProps {
    projects: Project[];
    homepage: Home;
}

const HomePage = ({ projects, homepage }: HomeProps) => {
    return (
        <Layout variants={pageVariants} seo={homepage.seo}>
            <Nav />
            <Container paddingY>
                <h1>{homepage.title}</h1>
                <p>{homepage.description}</p>

                <ProjectGrid projects={projects} />

                <Footer />
            </Container>
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
