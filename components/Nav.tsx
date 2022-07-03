import Link from 'next/link';

import { Category as CategoryType } from '@/models/category';
import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

export interface NavProps {
	locale: Locale;
	categories: CategoryType[];
	contacts: ContactType[];
}

const Nav = ({ locale, categories, contacts }: NavProps) => {
	return (
		<nav>
			<ul>
				<li>
					<Link href="/">
						<a>Sebastiaan Benjamins</a>
					</Link>
				</li>
			</ul>
			<ul>
				{categories
					.filter((c) => c.attributes?.locale === locale)
					.map((category) => (
						<li key={category.id}>
							<Link
								href={{
									pathname: '/[locale]/category/[slug]',
									query: {
										locale,
										slug: category.attributes?.slug,
									},
								}}
							>
								<a>{category.attributes?.title}</a>
							</Link>
						</li>
					))}
			</ul>
			<ul>
				{contacts
					.filter((c) => c.attributes?.locale === locale)
					.map((contact) => (
						<li key={contact.id}>
							<Link
								href={{
									pathname: '/[locale]/contact',
									query: {
										locale,
									},
								}}
							>
								<a>{contact.attributes.title}</a>
							</Link>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Nav;
