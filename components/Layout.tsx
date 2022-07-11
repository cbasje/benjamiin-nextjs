import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';

import Nav, { NavProps } from './Nav';
import { globalState } from '@/store/atoms';
import { Container } from '@/stitches.config';

import { Locale } from '@/models/locale';
import { Global as GlobalType } from '@/models/global';

export interface LayoutProps extends NavProps {
	global: GlobalType;
	children: ReactNode;
	locale: Locale;
}

const Layout = ({
	global,
	children,
	locale,
	categories,
	contacts,
	abouts,
	spotify,
}: LayoutProps) => {
	const setGlobal = useSetRecoilState(globalState);
	setGlobal(global.attributes);

	return (
		<Container>
			<Nav {...{ locale, categories, contacts, abouts, spotify }} />
			{children}
		</Container>
	);
};

export default Layout;
