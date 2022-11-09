import { useForm } from "@mantine/form";
import { Label } from "@radix-ui/react-label";

import { Box } from "@/stitches.config";

const Contact = () => {
    interface FormValues {
        name: string;
        email: string;
        body: string;
    }

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            email: "",
            body: "",
        },

        validate: {
            name: (value) => (value.length < 3 ? "Name is too short" : null),
            email: (value) =>
                value.length < 3
                    ? "Email is too short"
                    : /^\S+@\S+$/.test(value)
                    ? null
                    : "Invalid email",
            body: (value) =>
                value.length < 3 ? "The message is too short" : null,
        },
    });

    const handleSubmit = async (values: FormValues) => {
        console.log(values);
    };

    return (
        <Box>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Label htmlFor="name">Name</Label>
                <input
                    id="name"
                    type="text"
                    inputMode="text"
                    autoComplete="name"
                    placeholder="Your name..."
                    {...form.getInputProps("name")}
                />
                {form.errors.name && <p>{form.errors.name}</p>}

                <Label htmlFor="email">Email</Label>
                <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    {...form.getInputProps("email")}
                />
                {form.errors.email && <p>{form.errors.email}</p>}

                <Label htmlFor="body">Body</Label>
                <textarea
                    id="body"
                    inputMode="text"
                    placeholder="Your message..."
                    {...form.getInputProps("body")}
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
    );
};

export default Contact;
