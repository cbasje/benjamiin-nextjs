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

	const about = abouts.find((a) => a.attributes.locale === locale);
	const contact = contacts.find((c) => c.attributes.locale === locale);

	const handleLocaleChange = (newLocale: Locale) => {
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
						Sebastiaan Benjamins
					</Link>
				</li>
				<li>
					<ul>
						{categories
							.filter((c) => c.attributes?.locale === locale)
							.map((category) => (
								<li key={`category-${category.id}`}>
									<Link
										href={{
											pathname:
												'/[locale]/category/[slug]',
											query: {
												locale,
												slug: category.attributes?.slug,
											},
										}}
									>
										{category.attributes?.title}
									</Link>
								</li>
							))}
					</ul>
				</li>
				<li key={`contact-${contact?.id}`}>
					<Link
						href={{
							pathname: '/[locale]/contact',
							query: {
								locale,
							},
						}}
					>
						{contact?.attributes.title}
					</Link>
				</li>
				<li key={`about-${about?.id}`}>
					<Link
						href={{
							pathname: '/[locale]/about',
							query: {
								locale,
							},
						}}
					>
						{about?.attributes.title}
					</Link>
				</li>
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
									<Select.Item key={`locale-${l}`} value={l}>
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
