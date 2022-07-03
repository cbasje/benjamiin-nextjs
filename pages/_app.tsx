import App from 'next/app';
import type { AppContext, AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from 'framer-motion';

import { fetchAPI } from '@/lib/api';

import { Locale } from '@/models/locale';
import { Global as GlobalType } from '@/models/global';
import { Category as CategoryType } from '@/models/category';
import { Contact as ContactType } from '@/models/contact';

import { GlobalProvider } from '@/contexts/GlobalContext';
import { globalStyles } from '@/stitches.config';
import Layout, { LayoutProps } from '@/components/Layout';

interface MyAppProps extends LayoutProps {
	global: GlobalType;
}

const MyApp = ({ Component, pageProps, router }: AppProps) => {
	const { global, categories, contacts }: MyAppProps = pageProps;

	globalStyles();

	return (
		<>
			<GlobalProvider global={global.attributes}>
				<RecoilRoot>
					<Layout
						locale={router.query.locale as Locale}
						{...{ categories, contacts }}
					>
						<AnimatePresence exitBeforeEnter>
							<Component {...pageProps} key={router.route} />
						</AnimatePresence>
					</Layout>
				</RecoilRoot>
			</GlobalProvider>
		</>
	);
};

MyApp.getInitialProps = async (ctx: AppContext) => {
	// Calls page's `getInitialProps` and fills `appProps.pageProps`
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

	return {
		...appProps,
		pageProps: {
			global: globalRes.data,
			categories: categoriesRes.data,
			contacts: contactRes,
		},
	};
};

export default MyApp;
