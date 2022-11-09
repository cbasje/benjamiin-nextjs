import { defineConfig } from "sanity";
import { schemaTypes } from "./schemas";
import { withDocumentI18nPlugin } from "@sanity/document-internationalization";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { visionTool } from "@sanity/vision";

const basePath = "/studio";

export default defineConfig({
    basePath,

    name: "default",
    title: process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "benjami.in",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

    plugins: withDocumentI18nPlugin(
        [
            unsplashImageAsset(),
            visionTool({
                defaultApiVersion: "2022-08-08",
            }),
        ],
        {
            base: "en",
            languages: [
                { id: "en", title: "English" },
                { id: "nl", title: "Nederlands" },
            ],
        }
    ),

    schema: {
        types: schemaTypes,
    },
});
