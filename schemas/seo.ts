import { defineField, defineType } from "sanity";

export default defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description",
            type: "string",
        }),
        defineField({
            name: "shareImage",
            title: "Share image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "isArticle",
            title: "Is article?",
            type: "boolean",
        }),
    ],
});
