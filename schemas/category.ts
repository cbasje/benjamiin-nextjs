import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "category",
    title: "Category",
    icon: StarIcon,
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
            type: "string",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
