import { FolderIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "project",
    title: "Project",
    icon: FolderIcon,
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
            name: "excerpt",
            title: "Excerpt",
            type: "text",
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
        defineField({
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "colour",
            title: "Colour",
            type: "string",
            options: {
                list: [
                    { title: "Purple", value: "purple" },
                    { title: "Green", value: "green" },
                    { title: "Blue", value: "blue" },
                ],
            },
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "blockContent",
        }),
        defineField({
            name: "company",
            title: "Company",
            type: "company",
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: "title",
            media: "mainImage",
        },
    },
});
