import Head from 'next/head';

import { getStrapiMedia } from '@/lib/media';

import { Seo as SeoType } from '@/models/seo';
import { useRecoilValue } from 'recoil';
import { globalState } from '@/store/atoms';

const Seo = ({ seo }: { seo?: SeoType }) => {
	const { defaultSeo, siteName } = useRecoilValue(globalState);

	const seoWithDefaults: SeoType = {
		...defaultSeo,
		...seo,
	};

	const fullSeo = {
		...seoWithDefaults,
		metaTitle:
			seoWithDefaults.metaTitle === siteName
				? siteName
				: `${seoWithDefaults.metaTitle} | ${siteName}`,
		shareImage: getStrapiMedia(seoWithDefaults.shareImage?.data),
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

export default Seo;
