import { defineField, defineType } from "sanity";

export default defineType({
    name: "company",
    title: "Company",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
    ],
});
