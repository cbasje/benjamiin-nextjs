import { useEffect } from "react";

import Prism from "@/lib/prism.js";
import { styled } from "@/stitches.config";

/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism-okaidia&languages=markup+css+clike+javascript+arduino+c+cpp+jsx+tsx+scss+swift+typescript */
const Pre = styled("pre", {
    $$codeBg: "$colors$gray900",
    $$codeText1: "$colors$gray50",
    $$codeText2: "$colors$gray200",
    $$codeText3: "$colors$gray500",
    $$codeText4: "$colors$gray600",
    $$codeText5: "$colors$gray700",
    $$codeTextPrimary1: "$colors$purple900",
    $$codeTextPrimary2: "$colors$purple700",
    $$codeTextPrimary3: "$colors$purple500",
    $$codeTextPrimary4: "$colors$purple300",
    $$codeTextSecondary1: "$colors$green500",
    $$codeTextSecondary2: "$colors$green300",
    $$codeTextTertiary2: "$colors$blue500",
    $$codeTextTertiary1: "$colors$blue900",

    color: "rgb($$codeText1)",
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
    background: "rgb($$codeBg)",
    padding: "$2",
    borderRadius: "$sm",

    "&.language-css .token.string, pre.style .token.string": {
        color: "rgb($$codeText2)",
    },

    ".token": {
        "&.cdata, &.comment, &.doctype, &.prolog": {
            color: "rgb($$codeText5)",
        },
        "&.punctuation": {
            color: "rgb($$codeText4)",
        },
        "&.namespace": {
            // TODO: Not sure about this
            color: "rgb($$codeText3)",
        },
        "&.constant, &.deleted, &.property, &.symbol, &.tag": {
            color: "rgb($$codeTextPrimary2)",
        },
        "&.boolean, &.number": {
            color: "rgb($$codeTextTertiary2)",
        },
        "&.attr-name, &.builtin, &.char, &.inserted": {
            color: "rgb($$codeTextPrimary4)",
        },
        "&.selector, &.string": {
            color: "rgb($$codeTextSecondary2)",
        },
        "&.entity, &.operator, &.url, &.variable": {
            color: "rgb($$codeText2)",
        },
        "&.atrule, &.attr-value, &.function": {
            color: "rgb($$codeTextSecondary2)",
        },
        "&.class-name": {
            color: "rgb($$codeText3)",
        },
        "&.keyword": {
            color: "rgb($$codeTextPrimary3)",
        },
        "&.important, &.regex": {
            color: "rgb($$codeTextPrimary1)",
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

const Code = ({ body, lang }: { body: string; lang: string }) => {
    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <Pre tabIndex={0} className={`language-${lang}`}>
            <code className={`language-${lang}`}>{body}</code>
        </Pre>
    );
};

export default Code;
