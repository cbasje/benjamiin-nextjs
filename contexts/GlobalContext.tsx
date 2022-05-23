import { createContext, useContext } from 'react';

const GlobalContext = createContext({});

export function useGlobal() {
	return useContext(GlobalContext);
}

export function GlobalProvider({
	global,
	children,
}: {
	global: any;
	children: React.ReactNode;
}) {
	return (
		<GlobalContext.Provider value={global}>
			{children}
		</GlobalContext.Provider>
	);
}
