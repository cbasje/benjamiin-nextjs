import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLocaleLabel } from '@/util/locale';

import { Category as CategoryType } from '@/models/category';
import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

export interface NavProps {
	locale: Locale;
	categories: CategoryType[];
	contacts: ContactType[];
}

const Nav = ({ locale, categories, contacts }: NavProps) => {
	const router = useRouter();

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
			<ul>
				<li>
					<label htmlFor="languageSwitcher" className="sr-only">
						Switch languages
					</label>
					<select
						id="languageSwitcher"
						value={locale}
						onChange={(e) => {
							console.log(router.pathname, router.query.slug);
							router.push({
								pathname: '/[locale]',
								query: {
									locale: e.target.value as Locale,
								},
							});
						}}
					>
						{Object.values(Locale).map((locale) => (
							<option key={locale} value={locale}>
								{getLocaleLabel(locale)}
							</option>
						))}
					</select>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
