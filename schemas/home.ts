import { defineType } from "sanity";

export default defineType({
    name: "home",
    title: "Home page",
    type: "document",
    i18n: true,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
        },
        {
            name: "seo",
            title: "SEO",
            type: "seo",
        },
    ],
});
