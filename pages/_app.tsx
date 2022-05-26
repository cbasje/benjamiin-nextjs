import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { universalLanguageDetect } from '@unly/universal-language-detector';

import { fetchAPI } from '../lib/api';
import { getStrapiMedia } from '../lib/media';

import { Global } from '../types/global';
import { GlobalProvider } from '../contexts/GlobalContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { globalStyles } from '../stitches.config';

function MyApp({ Component, pageProps }: AppProps) {
	const { global, lang }: { global: Global; lang: string } = pageProps;

	globalStyles();

	return (
		<>
			<Head>
				<link
					rel="shortcut icon"
					href={getStrapiMedia(global.attributes.favicon)}
				/>
			</Head>
			<GlobalProvider global={global.attributes}>
				<LanguageProvider lang={lang}>
					<Component {...pageProps} />
				</LanguageProvider>
			</GlobalProvider>
		</>
	);
}

MyApp.getInitialProps = async (ctx: AppContext) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);

	// Get the local of the user
	const lang = universalLanguageDetect({
		supportedLanguages: ['nl', 'en'],
		fallbackLanguage: 'en',
		errorHandler: (error) => {
			console.error(error);
		},
	});

	// Fetch global site settings from Strapi
	const globalRes = await fetchAPI<Global>('/global', {
		populate: {
			favicon: '*',
			defaultSeo: {
				populate: '*',
			},
		},
	});

	return { ...appProps, pageProps: { global: globalRes.data, lang } };
};

export default MyApp;
