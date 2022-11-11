import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "home",
    title: "Home page",
    icon: HomeIcon,
    type: "document",
    i18n: true,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "callToAction",
            title: "Call-To-Action",
            type: "string",
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
