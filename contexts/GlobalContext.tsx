import { createContext, useContext } from 'react';
import { Global, GlobalAttributes } from '../types/global';

const GlobalContext = createContext<GlobalAttributes>({
	siteName: '',
	favicon: { data: undefined },
	siteDescription: '',
	defaultSeo: {
		metaTitle: '',
		metaDescription: '',
		shareImage: { data: undefined },
		article: false,
		locale: 'en',
	},
});

export function useGlobal() {
	return useContext(GlobalContext);
}

export function GlobalProvider({
	global,
	children,
}: {
	global: GlobalAttributes;
	children: React.ReactNode;
}) {
	return (
		<GlobalContext.Provider value={global}>
			{children}
		</GlobalContext.Provider>
	);
}
