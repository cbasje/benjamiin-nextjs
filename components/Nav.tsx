import Link from 'next/link';

const Nav = ({ categories }: { categories: Category[] }) => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">
						<a>Strapi Blog</a>
					</Link>
				</li>
			</ul>
			<ul>
				{categories.map((category) => (
					<li key={category.id}>
						<Link
							href={{
								pathname: '/[locale]/category/[slug]',
								query: {
									locale: category.attributes.locale,
									slug: category.attributes.slug,
								},
							}}
						>
							<a>{category.attributes.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Nav;
