import { createContext, useContext } from 'react';

const LanguageContext = createContext({
	lang: 'en',
});

export function useLanguage() {
	return useContext(LanguageContext);
}

export function LanguageProvider({
	lang,
	children,
}: {
	lang: string;
	children: React.ReactNode;
}) {
	return (
		<LanguageContext.Provider value={{ lang }}>
			{children}
		</LanguageContext.Provider>
	);
}
