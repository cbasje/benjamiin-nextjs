import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import { fetchAPI } from "@/lib/api";
import { pageVariants } from "@/util/transition";
import { Container } from "@/stitches.config";

import { Category as CategoryType } from "@/models/category";
import { Seo as SeoType } from "@/models/seo";
import { Locale } from "@/models/locale";

import ProjectGrid from "@/components/ProjectGrid";
import Layout from "@/components/Layout";
import Nav from "@/components/Nav";

interface CategoryProps {
    category: CategoryType;
}

const Category = ({ category }: CategoryProps) => {
    const seo: SeoType = {
        metaTitle: category.attributes.title,
        metaDescription: `All ${category.attributes.title} projects`,
    };

    return (
        <Layout variants={pageVariants} seo={seo}>
            <Nav />
            <Container css={{ paddingBlock: "$6" }}>
                <h1>{category.attributes.title}</h1>
                <ProjectGrid
                    projects={category.attributes.projects?.data || []}
                />
            </Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const categoriesRes = await fetchAPI<CategoryType[]>("/categories", {
        fields: ["slug", "locale"],
        locale: "all",
    });

    return {
        paths: categoriesRes.data.map((category: CategoryType) => ({
            params: {
                slug: category.attributes.slug,
                locale: category.attributes.locale,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<
    CategoryProps,
    ParsedUrlQuery
> = async ({ params }) => {
    const { locale, slug } = params as { locale: Locale; slug: string };

    const [matchingCategoriesRes] = await Promise.all([
        fetchAPI<CategoryType[]>("/categories", {
            filters: { slug },
            populate: {
                projects: {
                    populate: "*",
                },
            },
            locale,
        }),
    ]);

    return {
        props: {
            category: matchingCategoriesRes.data[0],
        },
        revalidate: 1,
    };
};

export default Category;
