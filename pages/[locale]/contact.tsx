import type { GetStaticPaths, GetStaticProps } from 'next';

import { Contact as ContactType } from '@/models/contact';
import { Homepage as HomepageType } from '@/models/homepage';
import { Category as CategoryType } from '@/models/category';

import Seo from '@components/Seo';
import { Container } from '@/stitches.config';
import { fetchAPI } from '@lib/api';
import Layout from '@components/Layout';

interface ContactProps {
	contact: ContactType;
	homepage: HomepageType;
	categories: CategoryType[];
}

const Contact = ({ contact, homepage, categories }: ContactProps) => {
	return (
		<Layout homepage={homepage} categories={categories} contact={contact}>
			<Container>
				<Seo seo={contact.attributes.seo} />
				<div>
					<h1>{contact.attributes.title}</h1>
					<p>{contact.attributes.description}</p>
				</div>
			</Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<ContactProps> = async ({
	params: { locale },
}) => {
	const [contactRes, categoriesRes, homepageRes] = await Promise.all([
		fetchAPI<ContactType>('/contact', {
			populate: {
				title: '*',
				description: '*',
				seo: { populate: '*' },
			},
			locale,
		}),
		fetchAPI<CategoryType[]>('/categories', {
			fields: ['name', 'slug', 'locale'],
			locale,
		}),
		fetchAPI<HomepageType>('/homepage', {
			fields: ['title'],
			locale,
		}),
	]);

	return {
		props: {
			contact: contactRes.data,
			categories: categoriesRes.data,
			homepage: homepageRes.data,
		},
		revalidate: true,
	};
};

export default Contact;
