import { ErrorOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "not-found",
    title: "404 page",
    icon: ErrorOutlineIcon,
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
            name: "seo",
            title: "SEO",
            type: "seo",
            validation: (Rule) => Rule.required(),
        }),
    ],
});
