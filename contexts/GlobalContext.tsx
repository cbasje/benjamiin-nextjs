import { createContext, useContext } from 'react';
import { GlobalAttributes as GlobalAttributesType } from '@/models/global';

const GlobalContext = createContext<GlobalAttributesType>({
	siteName: '',
	siteDescription: '',
	defaultSeo: {
		metaTitle: '',
		metaDescription: '',
		shareImage: { data: undefined },
		isArticle: false,
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
	global: GlobalAttributesType;
	children: React.ReactNode;
}) {
	return (
		<GlobalContext.Provider value={global}>
			{children}
		</GlobalContext.Provider>
	);
}
