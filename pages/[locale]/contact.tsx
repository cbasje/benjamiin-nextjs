import type { GetStaticPaths, GetStaticProps } from 'next';

import { Contact as ContactType } from '@/models/contact';
import { Locale } from '@/models/locale';

import Seo from '@/components/Seo';
import { fetchAPI } from '@/lib/api';
import { Box, styled } from '@/stitches.config';
import { useForm } from '@mantine/form';
import { Label } from '@radix-ui/react-label';

interface ContactProps {
	contact: ContactType;
}

const Contact = ({ contact }: ContactProps) => {
	interface FormValues {
		name: string;
		email: string;
		subject: string;
		body: string;
	}

	const form = useForm<FormValues>({
		initialValues: {
			name: '',
			email: '',
			subject: '',
			body: '',
		},

		validate: {
			name: (value) => (value.length < 3 ? 'Name is too short' : null),
			email: (value) =>
				value.length < 3
					? 'Email is too short'
					: /^\S+@\S+$/.test(value)
					? null
					: 'Invalid email',
			body: (value) =>
				value.length < 3 ? 'The message is too short' : null,
		},
	});

	const handleSubmit = async (values: FormValues) => {
		console.log(values);
		await fetchAPI(
			'/contact-requests',
			{},
			{
				method: 'POST',
				body: JSON.stringify({
					data: values,
				}),
			}
		);
	};

	return (
		<>
			<Seo seo={contact.attributes.seo} />
			<Box>
				<h1>{contact.attributes.title}</h1>
				<p>{contact.attributes.description}</p>
			</Box>
			<Box>
				<form onSubmit={form.onSubmit(handleSubmit)}>
					<Label htmlFor="name">Name</Label>
					<input
						id="name"
						type="text"
						inputMode="text"
						autoComplete="name"
						placeholder="Your name..."
						{...form.getInputProps('name')}
					/>
					{form.errors.name && <p>{form.errors.name}</p>}

					<Label htmlFor="email">Email</Label>
					<input
						id="email"
						type="email"
						inputMode="email"
						autoComplete="email"
						placeholder="your@email.com"
						{...form.getInputProps('email')}
					/>
					{form.errors.email && <p>{form.errors.email}</p>}

					<Label htmlFor="subject">Subject</Label>
					<input
						id="subject"
						type="text"
						inputMode="text"
						placeholder="Subject..."
						{...form.getInputProps('subject')}
					/>
					{form.errors.subject && <p>{form.errors.subject}</p>}

					<Label htmlFor="body">Body</Label>
					<textarea
						id="body"
						inputMode="text"
						placeholder="Your message..."
						{...form.getInputProps('body')}
					/>
					{form.errors.body && <p>{form.errors.body}</p>}

					<button type="submit">Submit</button>

					{/* <TextInput
						required
						label="Email"
						placeholder="your@email.com"
						{...form.getInputProps('email')}
					/>

					<Checkbox
						mt="md"
						label="I agree to sell my privacy"
						{...form.getInputProps('termsOfService', {
							type: 'checkbox',
						})}
					/>

					<Group position="right" mt="md">
						<Button type="submit">Submit</Button>
					</Group> */}
				</form>
			</Box>
		</>
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
			populate: '*',
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
