import type { GetStaticPaths, GetStaticProps } from "next";

import { fetchAPI } from "@/lib/api";
import { parseLocale } from "@/util/locale";
import { pageVariants } from "@/util/transition";
import { Container } from "@/stitches.config";

import { Project as ProjectType } from "@/models/project";
import { Homepage as HomepageType } from "@/models/homepage";
import { Locale } from "@/models/locale";

import ProjectGrid from "@/components/ProjectGrid";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";

interface HomeProps {
    projects: ProjectType[];
    homepage: HomepageType;
}

const Home = ({ projects, homepage }: HomeProps) => {
    return (
        <Layout variants={pageVariants} seo={homepage.attributes.seo}>
            <Nav />
            <Container paddingY>
                <h1>{homepage.attributes.title}</h1>
                <ProjectGrid projects={projects} />
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

export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }) => {
    const locale = await parseLocale(params?.locale as Locale);

    const [projectsRes, homepageRes] = await Promise.all([
        fetchAPI<ProjectType[]>("/projects", {
            populate: ["cover", "category"],
            locale,
        }),
        fetchAPI<HomepageType>("/homepage", {
            populate: "*",
            locale,
        }),
    ]);

    return {
        props: {
            projects: projectsRes.data,
            homepage: homepageRes.data,
        },
        revalidate: 1,
    };
};

export default Home;
