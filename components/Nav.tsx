import Link from 'next/link';

import { Category as CategoryType } from '../types/category';
import { Contact as ContactType } from '../types/contact';
import { Homepage as HomepageType } from '../types/homepage';

interface NavProps {
	homepage: HomepageType;
	categories: CategoryType[];
	contact: ContactType;
}

const Nav = ({ homepage, categories, contact }: NavProps) => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">
						<a>{homepage.attributes.title}</a>
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
			<ul>
				<li>
					<Link
						href={{
							pathname: '/[locale]/contact',
							query: {
								locale: contact.attributes.locale,
							},
						}}
					>
						<a>{contact.attributes.title}</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
