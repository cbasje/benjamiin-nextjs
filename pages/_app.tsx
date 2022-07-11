import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from 'framer-motion';
import * as Toast from '@radix-ui/react-toast';

import { fetchAPI } from '@/lib/api';
import { getNowPlaying } from '@/lib/spotify';

import { Locale } from '@/models/locale';
import { Global as GlobalType } from '@/models/global';
import { Category as CategoryType } from '@/models/category';
import { Contact as ContactType } from '@/models/contact';
import { About as AboutType } from '@/models/about';
import { SpotifyData } from '@/models/spotify';

import { globalStyles } from '@/stitches.config';
import Layout, { LayoutProps } from '@/components/Layout';

// FIXME: move to @/stitches.config
import '@/util/prism.css';

interface MyAppProps extends LayoutProps {
	global: GlobalType;
}

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	const { global, categories, contacts, abouts }: MyAppProps = pageProps;

	globalStyles();

	return (
		<>
			<RecoilRoot>
				<Toast.Provider>
					<Layout
						locale={router.query.locale as Locale}
						{...{ global, categories, contacts, abouts }}
					>
						{/* <AnimatePresence exitBeforeEnter> */}
						<Component {...pageProps} key={router.route} />
						{/* </AnimatePresence> */}
					</Layout>
				</Toast.Provider>
			</RecoilRoot>
		</>
	);
};

MyApp.getInitialProps = async (ctx: AppContext) => {
	const appProps = await App.getInitialProps(ctx);

	// Fetch global site settings from Strapi
	const [globalRes, categoriesRes] = await Promise.all([
		fetchAPI<GlobalType>('/global', {
			populate: {
				defaultSeo: {
					populate: '*',
				},
			},
			locale: 'all',
		}),
		fetchAPI<CategoryType[]>('/categories', {
			fields: ['title', 'slug', 'locale'],
			locale: 'all',
		}),
	]);

	// FIXME: For some reason getting all locales does not work for single content-types (yet?)
	const contactRes = await Promise.all(
		Object.values(Locale).map(async (locale: Locale) => {
			const res = await fetchAPI<ContactType>('/contact', {
				fields: ['title', 'locale'],
				locale,
			});
			return res.data;
		})
	);
	const aboutRes = await Promise.all(
		Object.values(Locale).map(async (locale: Locale) => {
			const res = await fetchAPI<AboutType>('/about', {
				fields: ['title', 'locale'],
				locale,
			});
			return res.data;
		})
	);

	type PageProps = Omit<MyAppProps, 'layout' | 'children' | 'locale'>;
	return {
		...appProps,
		pageProps: {
			global: globalRes.data,
			categories: categoriesRes.data,
			contacts: contactRes,
			abouts: aboutRes,
		} as PageProps,
	};
};

export default MyApp;
