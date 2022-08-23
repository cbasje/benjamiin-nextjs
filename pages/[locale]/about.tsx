import type { GetStaticPaths, GetStaticProps } from "next";

import { fetchAPI } from "@/lib/api";
import { pageVariants } from "@/util/transition";
import { Container } from "@/stitches.config";

import { About as AboutType } from "@/models/about";
import { Locale } from "@/models/locale";

import Layout from "@/components/Layout";
import BlockManager from "@/components/BlockManager";
import Nav from "@/components/Nav";

interface AboutProps {
    about: AboutType;
}

const About = ({ about }: AboutProps) => {
    return (
        <Layout variants={pageVariants} seo={about.attributes.seo}>
            <Nav />
            <Container paddingY>
                <h1>{about.attributes.title}</h1>
                <p>{about.attributes.description}</p>

                <BlockManager blocks={about.attributes.blocks} />
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

export const getStaticProps: GetStaticProps<AboutProps> = async ({
    params,
}) => {
    const { locale } = params as { locale: Locale };

    const [aboutRes] = await Promise.all([
        fetchAPI<AboutType>("/about", {
            populate: "*",
            locale,
        }),
    ]);

    return {
        props: {
            about: aboutRes.data,
        },
        revalidate: 1,
    };
};

export default About;
