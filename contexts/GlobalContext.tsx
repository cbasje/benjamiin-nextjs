import { createContext, useContext } from 'react';
import { Global } from '../types/global';

const GlobalContext = createContext<Global>({
	siteName: '',
	favicon: undefined,
	siteDescription: '',
	defaultSeo: {
		metaTitle: '',
		metaDescription: '',
		shareImage: { data: undefined },
		article: false,
	},
});

export function useGlobal() {
	return useContext(GlobalContext);
}

export function GlobalProvider({
	global,
	children,
}: {
	global: Global;
	children: React.ReactNode;
}) {
	return (
		<GlobalContext.Provider value={global}>
			{children}
		</GlobalContext.Provider>
	);
}
