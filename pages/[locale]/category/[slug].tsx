import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import MainLayout from "@/layouts/Main";
import { parseLocale } from "@/lib/locale";
import { categoryPathsQuery, categoryQuery } from "@/lib/queries";
import { getClient, sanityClient } from "@/lib/sanity-server";
import { pageVariants } from "@/lib/transition";
import { Category, Locale, Seo } from "@/lib/types";
import { Main } from "@/stitches.config";

interface CategoryProps {
    category: Category;
}

const CategoryPage = ({ category }: CategoryProps) => {
    const seo: Seo = {
        metaTitle: category.title,
        metaDescription: `All ${category.title} projects`,
    };

    return (
        <MainLayout variants={pageVariants} seo={seo}>
            <Header />

            <Main>
                <h1>{category.title}</h1>
                <ProjectGrid projects={category.projects || []} />
            </Main>
        </MainLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    type CategoryPath = Pick<Category, "slug" | "locale">;
    const paths = await sanityClient.fetch<CategoryPath[]>(categoryPathsQuery);

    return {
        paths: paths.map((path: CategoryPath) => ({
            params: {
                slug: path.slug,
                locale: path.locale,
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
