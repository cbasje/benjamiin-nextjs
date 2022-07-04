import Link from 'next/link';
import { useRouter } from 'next/router';
import { getLocaleLabel } from '@/util/locale';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as Label from '@radix-ui/react-label';
import * as Select from '@radix-ui/react-select';

import { Category as CategoryType } from '@/models/category';
import { Contact as ContactType } from '@/models/contact';
import { About as AboutType } from '@/models/about';
import { Locale } from '@/models/locale';

export interface NavProps {
	locale: Locale;
	categories: CategoryType[];
	contacts: ContactType[];
	abouts: AboutType[];
}

const Nav = ({ locale, categories, contacts, abouts }: NavProps) => {
	const router = useRouter();

	const handleLocaleChange = (newLocale: Locale) => {
		console.log(router.pathname, router.query.slug);
		router.push({
			pathname: '/[locale]',
			query: {
				locale: newLocale,
			},
		});
	};

	return (
		<nav>
			<ul>
				<li>
					<Link
						href={{
							pathname: '/[locale]',
							query: {
								locale,
							},
						}}
					>
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
				{abouts
					.filter((a) => a.attributes?.locale === locale)
					.map((about) => (
						<li key={about.id}>
							<Link
								href={{
									pathname: '/[locale]/about',
									query: {
										locale,
									},
								}}
							>
								<a>{about.attributes.title}</a>
							</Link>
						</li>
					))}
			</ul>
			<ul>
				<li>
					<VisuallyHidden.Root>
						<Label.Root htmlFor="languageSwitcher">
							Switch languages
						</Label.Root>
					</VisuallyHidden.Root>
					<Select.Root
						defaultValue={locale}
						onValueChange={handleLocaleChange}
					>
						<Select.Trigger>
							<Select.Value />
							<Select.Icon />
						</Select.Trigger>

						<Select.Content>
							<Select.ScrollUpButton />
							<Select.Viewport>
								{Object.values(Locale).map((l) => (
									<Select.Item value={l}>
										<Select.ItemText>
											{getLocaleLabel(l)}
										</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Viewport>
							<Select.ScrollDownButton />
						</Select.Content>
					</Select.Root>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
