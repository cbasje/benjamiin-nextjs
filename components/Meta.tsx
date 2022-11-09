import Head from "next/head";
import { useRouter } from "next/router";

import { useGlobal } from "@/contexts/GlobalContext";
import { Locale, Seo } from "@/lib/types";

const Meta = ({ seo }: { seo?: Seo }) => {
    const router = useRouter();
    const locale = router.query.locale as Locale;

    const { global } = useGlobal();
    const { defaultSeo, siteName } = global.find(
        (g) => g.locale === locale
    ) ?? { defaultSeo: { metaTitle: "" } };

    const seoWithDefaults: Seo = {
        ...defaultSeo,
        ...seo,
    };

    const fullSeo = {
        ...seoWithDefaults,
        metaTitle:
            seoWithDefaults.metaTitle === siteName
                ? siteName
                : `${seoWithDefaults.metaTitle} | ${siteName}`,
        shareImage: seoWithDefaults.shareImage,
    };

    return (
        <Head>
            {fullSeo.metaTitle && (
                <>
                    <title>{fullSeo.metaTitle}</title>
                    <meta property="og:title" content={fullSeo.metaTitle} />
                    <meta name="twitter:title" content={fullSeo.metaTitle} />
                </>
            )}
            {fullSeo.metaDescription && (
                <>
                    <meta
                        name="description"
                        content={fullSeo.metaDescription}
                    />
                    <meta
                        property="og:description"
                        content={fullSeo.metaDescription}
                    />
                    <meta
                        name="twitter:description"
                        content={fullSeo.metaDescription}
                    />
                </>
            )}
            {fullSeo.shareImage && (
                <>
                    <meta property="og:image" content={fullSeo.shareImage} />
                    <meta name="twitter:image" content={fullSeo.shareImage} />
                    <meta name="image" content={fullSeo.shareImage} />
                </>
            )}
            {fullSeo.isArticle && <meta property="og:type" content="article" />}
            <meta name="twitter:card" content="summary_large_image" />
        </Head>
    );
};

export default Meta;
