import { defineType } from "sanity";

export default defineType({
    name: "global",
    title: "Global SEO",
    type: "document",
    i18n: true,
    fields: [
        {
            name: "siteName",
            title: "Site name",
            type: "string",
            validation: (Rule) => Rule.required(),
        },
        {
            name: "siteDescription",
            title: "Site description",
            type: "text",
        },
        {
            name: "defaultSeo",
            title: "Default SEO",
            type: "seo",
        },
    ],
});
