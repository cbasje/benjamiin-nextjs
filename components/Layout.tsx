import { ReactNode } from 'react';
import Nav from './Nav';

const Layout = ({
	children,
	categories,
	seo,
}: {
	children: ReactNode;
	categories: Category[];
	seo?: Seo;
}) => (
	<>
		<Nav categories={categories} />
		{children}
	</>
);

export default Layout;
