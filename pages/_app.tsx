import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';

import { fetchAPI } from '@lib/api';
import { getStrapiMedia } from '@lib/media';

import { Global as GlobalType } from '@/models/global';

import { GlobalProvider } from '@contexts/GlobalContext';
import { globalStyles } from '@/stitches.config';

interface MyAppProps {
	global: GlobalType;
}

function MyApp({ Component, pageProps }: AppProps) {
	const { global }: MyAppProps = pageProps;

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
				<Component {...pageProps} />
			</GlobalProvider>
		</>
	);
}

MyApp.getInitialProps = async (ctx: AppContext) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
	const appProps = await App.getInitialProps(ctx);

	// Fetch global site settings from Strapi
	const globalRes = await fetchAPI<Global>('/global', {
		populate: {
			favicon: '*',
			defaultSeo: {
				populate: '*',
			},
		},
	});

	return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
