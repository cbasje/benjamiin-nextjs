import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Locale } from '@/models/locale';

import { Box } from '@/stitches.config';
import Nav, { NavProps } from './Nav';

export interface LayoutProps extends NavProps {
	children: ReactNode;
	locale: Locale;
}

const Layout = ({ children, locale, categories, contacts }: LayoutProps) => {
	return (
		<Box>
			<Nav {...{ locale, categories, contacts }} />
			{children}
		</Box>
	);
};

export default Layout;
