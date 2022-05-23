import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { getStrapiMedia } from '../lib/media';
import { GlobalProvider } from '../contexts/GlobalContext';
import { fetchAPI } from '../lib/api';
import App from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	const { global } = pageProps;

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
	const globalRes = await fetchAPI('/global', {
		populate: {
			favicon: '*',
			defaultSeo: {
				populate: '*',
			},
		},
	});
	// Pass the data to our page via props
	return { ...appProps, pageProps: { global: globalRes.data } };
};

export default MyApp;
