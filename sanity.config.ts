import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";
import { withDocumentI18nPlugin } from "@sanity/document-internationalization";

const basePath = "/studio";

export default defineConfig({
    basePath,

    name: "default",
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "benjami.in",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    plugins: withDocumentI18nPlugin([], {
        base: "en",
        languages: [
            { id: "en", title: "English" },
            { id: "nl", title: "Nederlands" },
        ],
    }),

    schema: {
        types: schemaTypes,
    },
});
