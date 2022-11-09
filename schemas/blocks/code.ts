import { CodeBlockIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "code",
    title: "Code",
    icon: CodeBlockIcon,
    type: "object",
    fields: [
        defineField({
            name: "content",
            title: "Content",
            type: "text",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "lang",
            title: "Language",
            type: "string",
            options: {
                list: [
                    { title: "HTML", value: "markup" },
                    { title: "CSS", value: "css" },
                    { title: "clike", value: "clike" },
                    { title: "Javascript", value: "javascript" },
                    { title: "Arduino", value: "arduino" },
                    { title: "C", value: "c" },
                    { title: "C++", value: "cpp" },
                    { title: "JSX", value: "jsx" },
                    { title: "TSX", value: "tsx" },
                    { title: "SCSS", value: "scss" },
                    { title: "Swift", value: "swift" },
                    { title: "Typescript", value: "typescript" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
});
