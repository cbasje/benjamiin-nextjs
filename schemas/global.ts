import { defineField, defineType } from "sanity";

export default defineType({
    name: "global",
    title: "Global SEO",
    type: "document",
    i18n: true,
    fields: [
        defineField({
            name: "siteName",
            title: "Site name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "siteDescription",
            title: "Site description",
            type: "text",
        }),
        defineField({
            name: "defaultSeo",
            title: "Default SEO",
            type: "seo",
        }),
    ],
});
