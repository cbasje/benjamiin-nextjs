import { GetStaticProps } from "next";

import { parseLocale } from "@/lib/locale";
import { notFoundQuery } from "@/lib/queries";
import { getClient } from "@/lib/sanity-server";
import { Locale, NotFound } from "@/lib/types";

import Seo from "@/components/Meta";
import MainLayout from "@/layouts/Main";
import { Box } from "@/stitches.config";

interface NotFoundProps {
    notFound: NotFound;
}

const NotFoundPage = ({ notFound }: NotFoundProps) => {
    return (
        <MainLayout>
            <Seo seo={notFound.seo}></Seo>
            <Box>Page not found!</Box>
        </MainLayout>
    );
};

export const getStaticProps: GetStaticProps<NotFoundProps> = async ({
    params,
    preview,
}) => {
    const locale = await parseLocale(params?.locale as Locale);

    const notFound = await getClient(preview!).fetch<NotFound>(notFoundQuery, {
        locale,
    });

    return {
        props: {
            notFound,
        },
        revalidate: 1,
    };
};

export default NotFoundPage;
