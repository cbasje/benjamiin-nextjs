import type { GetStaticPaths, GetStaticProps } from 'next';

import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

import Seo from '@/components/Seo';
import { Container } from '@/stitches.config';
import { fetchAPI } from '@/lib/api';

interface ContactProps {
	contact: ContactType;
}

const Contact = ({ contact }: ContactProps) => {
	return (
		<Container>
			<Seo seo={contact.attributes.seo} />
			<div>
				<h1>{contact.attributes.title}</h1>
				<p>{contact.attributes.description}</p>
			</div>
		</Container>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking',
	};
};

export const getStaticProps: GetStaticProps<ContactProps> = async ({
	params,
}) => {
	const { locale } = params as { locale: Locale };

	const [contactRes] = await Promise.all([
		fetchAPI<ContactType>('/contact', {
			populate: {
				title: '*',
				description: '*',
				seo: { populate: '*' },
			},
			locale,
		}),
	]);

	return {
		props: {
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Contact;
