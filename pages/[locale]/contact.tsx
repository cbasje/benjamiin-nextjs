import React from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { Category as CategoryType } from '../../types/category';
import { Contact as ContactType } from '../../types/contact';

import Nav from '../../components/Nav';
import Seo from '../../components/Seo';
import { Box, Container } from '../../stitches.config';
import { fetchAPI } from '../../lib/api';

interface ContactProps {
	categories: CategoryType[];
	contact: ContactType;
}

const Contact = ({ categories, contact }: ContactProps) => {
	return (
		<Box>
			{/* <Nav categories={categories} /> */}
			<Container>
				<Seo seo={contact.attributes.seo} />
				<div>
					<h1>{contact.attributes.title}</h1>
					<p>{contact.attributes.description}</p>
				</div>
			</Container>
		</Box>
	);
};

export const getStaticProps: GetStaticProps<ContactProps> = async ({
	params: { locale },
}) => {
	const [categoriesRes, contactRes] = await Promise.all([
		fetchAPI<CategoryType[]>('/categories', {
			populate: '*',
			locale,
		}),
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
			categories: categoriesRes.data,
			contact: contactRes.data,
		},
		revalidate: true,
	};
};

export default Contact;
