import { defineType } from "sanity";

export default defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        {
            name: "metaTitle",
            title: "Meta title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "metaDescription",
            title: "Meta description",
            type: "string",
        },
        {
            name: "shareImage",
            title: "Share image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "isArticle",
            title: "Is article?",
            type: "boolean",
        },
    ],
});
