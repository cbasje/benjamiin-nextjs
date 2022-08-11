import { QuoteBlock as QuoteBlockType } from "@/models/block";
import { styled } from "@/stitches.config";
import { ReactElement, ReactNode } from "react";

const BlockQuote = styled("blockquote", {
    margin: 0,

    "& p": {
        padding: "15px",
        background: "#eee",
        borderRadius: "5px",

        "&:before": {
            content: "“",
        },

        "&:after": {
            content: "”",
        },
    },
});

const Anchor = ({
    href,
    children,
}: {
    href?: string;
    children: ReactNode;
}): ReactElement => {
    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer noopener">
                {children}
            </a>
        );
    } else {
        return children as ReactElement;
    }
};

const Quote = ({ body, link, citation }: QuoteBlockType) => {
    return (
        <>
            <BlockQuote cite={link}>
                <p>{body}</p>
            </BlockQuote>
            {citation && (
                <figcaption>
                    <Anchor href={citation.link}>
                        {citation.author}
                        {citation.company && (
                            <>
                                {" - "}
                                <cite>{citation.company}</cite>
                            </>
                        )}
                    </Anchor>
                </figcaption>
            )}
        </>
    );
};

export default Quote;
