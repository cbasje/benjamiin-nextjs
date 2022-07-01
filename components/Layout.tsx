import { ReactNode } from 'react';

import { Box } from '@/stitches.config';
import Nav, { NavProps } from './Nav';

export interface LayoutProps extends NavProps {
	children: ReactNode;
}

const Layout = ({ children, homepage, categories, contact }: LayoutProps) => {
	return (
		<Box>
			<Nav
				homepage={homepage}
				categories={categories}
				contact={contact}
			/>
			{children}
		</Box>
	);
};

export default Layout;
