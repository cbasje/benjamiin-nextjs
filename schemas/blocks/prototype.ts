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
                    { title: "Framer", value: "Framer" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
