import { EarthAmericasIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "global",
    title: "Global SEO",
    icon: EarthAmericasIcon,
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
            name: "siteKeywords",
            title: "Keywords",
            type: "text",
        }),
        defineField({
            name: "defaultSeo",
            title: "Default SEO",
            type: "seo",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
