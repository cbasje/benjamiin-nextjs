import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import { categoryQuery, categorySlugsQuery } from "@/lib/queries";
import { getClient, sanityClient } from "@/lib/sanity-server";
import { parseLocale } from "@/lib/locale";
import { pageVariants } from "@/lib/transition";
import { Main } from "@/stitches.config";

import { Category, Seo, Locale } from "@/lib/types";

import ProjectGrid from "@/components/ProjectGrid";
import Layout from "@/components/Layout";
import Header from "@/components/Header";

interface CategoryProps {
    category: Category;
}

const CategoryPage = ({ category }: CategoryProps) => {
    const seo: Seo = {
        metaTitle: category.title,
        metaDescription: `All ${category.title} projects`,
    };

    return (
        <Layout variants={pageVariants} seo={seo}>
            <Header />

            <Main>
                <h1>{category.title}</h1>
                <ProjectGrid projects={category.projects || []} />
            </Main>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const categoriesRes = await sanityClient.fetch<Category[]>(
        categorySlugsQuery
    );

    return {
        paths: categoriesRes.map((category: Category) => ({
            params: {
                slug: category.slug,
                locale: category.locale,
            },
        })),
        fallback: "blocking",
    };
};

export const getStaticProps: GetStaticProps<
    CategoryProps,
    ParsedUrlQuery
> = async ({ params, preview = false }) => {
    const slug = params?.slug;
    const locale = await parseLocale(params?.locale as Locale);

    const { category } = await getClient(preview).fetch<{ category: Category }>(
        categoryQuery,
        {
            slug,
            locale,
        }
    );

    return {
        props: {
            category,
        },
        revalidate: 1,
    };
};

export default CategoryPage;
