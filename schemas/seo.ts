export default {
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        {
            name: "metaTitle",
            title: "Meta title",
            type: "string",
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
};
