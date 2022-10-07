import { useEffect } from "react";

import Prism from "@/lib/prism.js";
import { styled } from "@/stitches.config";

/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+arduino+c+cpp+jsx+tsx+scss+swift+typescript */
const CodeWrapper = styled("div", {
    $$codeBg: "$colors$gray9",
    $$codeText1: "$colors$gray0",
    $$codeText2: "$colors$gray2",
    $$codeText3: "$colors$gray5",
    $$codeText4: "$colors$gray6",
    $$codeText5: "$colors$gray7",
    $$codeTextPrimary1: "$colors$purple9",
    $$codeTextPrimary2: "$colors$purple7",
    $$codeTextPrimary3: "$colors$purple5",
    $$codeTextPrimary4: "$colors$purple3",
    $$codeTextSecondary1: "$colors$green5",
    $$codeTextSecondary2: "$colors$green3",
    $$codeTextTertiary2: "$colors$blue5",
    $$codeTextTertiary1: "$colors$blue9",

    color: "$$codeText1",
    fontFamily: "$mono",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    wordWrap: "normal",
    lineHeight: 1.5,
    fontSize: "0.9rem",
    MozTabSize: 4,
    OTabSize: 4,
    tabSize: 4,
    WebkitHyphens: "none",
    MozHyphens: "none",
    MsHyphens: "none",
    hyphens: "none",

    overflow: "auto",
    background: "$$codeBg",
    padding: "$2",
    borderRadius: "$sm",

    "pre.language-css .token.string, pre.style .token.string": {
        color: "$$codeText2",
    },

    "pre .token": {
        "&.cdata, &.comment, &.doctype, &.prolog": {
            color: "$$codeText5",
        },
        "&.punctuation": {
            color: "$$codeText4",
        },
        "&.namespace": {
            // TODO: Not sure about this
            color: "$$codeText3",
        },
        "&.constant, &.deleted, &.property, &.symbol, &.tag": {
            color: "$$codeTextPrimary2",
        },
        "&.boolean, &.number": {
            color: "$$codeTextTertiary2",
        },
        "&.attr-name, &.builtin, &.char, &.inserted": {
            color: "$$codeTextPrimary4",
        },
        "&.selector, &.string": {
            color: "$$codeTextSecondary2",
        },
        "&.entity, &.operator, &.url, &.variable": {
            color: "$$codeText2",
        },
        "&.atrule, &.attr-value, &.function": {
            color: "$$codeTextSecondary2",
        },
        "&.class-name": {
            color: "$$codeText3",
        },
        "&.keyword": {
            color: "$$codeTextPrimary3",
        },
        "&.important, &.regex": {
            color: "$$codeTextPrimary1",
        },
        "&.bold, &.important": {
            fontWeight: "bold",
        },
        "&.italic": {
            fontStyle: "italic",
        },
        "&.entity": {
            cursor: "help",
        },
    },
});

const CodeBlock = ({ body }: { body: string }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return <CodeWrapper>{body}</CodeWrapper>;
};

export default CodeBlock;
