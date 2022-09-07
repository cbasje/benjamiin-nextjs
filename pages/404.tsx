import { GetStaticPaths, GetStaticProps } from "next";

import { parseLocale } from "@/lib/locale";
import { NotFound, Locale } from "@/lib/types";
import { getClient } from "@/lib/sanity-server";
import { notFoundQuery } from "@/lib/queries";

import Seo from "@/components/Meta";
import { Box } from "@/stitches.config";

interface NotFoundProps {
    notFound: NotFound;
}

const NotFoundPage = ({ notFound }: NotFoundProps) => {
    return (
        <>
            <Seo seo={notFound.seo}></Seo>
            <Box>Page not found!</Box>
        </>
    );
};

export const getStaticProps: GetStaticProps<NotFoundProps> = async ({
    params,
    preview,
}) => {
    const locale = await parseLocale(params?.locale as Locale);

    const notFoundRes = await getClient(preview!).fetch<NotFound>(
        notFoundQuery,
        { locale }
    );

    return {
        props: {
            notFound: notFoundRes,
        },
        revalidate: 1,
    };
};

export default NotFoundPage;
