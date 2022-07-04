import { ReactNode } from 'react';

import { Locale } from '@/models/locale';

import { Container } from '@/stitches.config';
import Nav, { NavProps } from './Nav';

export interface LayoutProps extends NavProps {
	children: ReactNode;
	locale: Locale;
}

const Layout = ({
	children,
	locale,
	categories,
	contacts,
	abouts,
}: LayoutProps) => {
	return (
		<Container>
			<Nav {...{ locale, categories, contacts, abouts }} />
			{children}
		</Container>
	);
};

export default Layout;
