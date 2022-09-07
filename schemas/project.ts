export default {
    name: "project",
    title: "Project",
    type: "document",
    i18n: true,
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
        },
        {
            name: "mainImage",
            title: "Main image",
            type: "image",
            options: {
                hotspot: true,
            },
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        },
        {
            name: "body",
            title: "Body",
            type: "blockContent",
        },
        {
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
        },
        {
            name: "seo",
            title: "SEO",
            type: "seo",
        },
    ],

    preview: {
        select: {
            title: "title",
            media: "mainImage",
        },
    },
};
