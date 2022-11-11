import { PresentationIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "prototype",
    title: "Prototype",
    icon: PresentationIcon,
    type: "object",
    fields: [
        defineField({
            name: "src",
            title: "Source",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "provider",
            title: "Provider",
            type: "string",
            options: {
                list: [
                    { title: "Figma", value: "figma" },
                    { title: "Framer", value: "framer" },
                    { title: "Website", value: "website" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
