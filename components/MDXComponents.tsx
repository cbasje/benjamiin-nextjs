import Link from "next/link";
import NextImage, { ImageProps } from "next/future/image";

import {
    ClassAttributes,
    AnchorHTMLAttributes,
    IframeHTMLAttributes,
} from "react";

const CustomLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href;
    const isInternalLink =
        href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
        return (
            <Link href={href}>
                <a {...props}>{props.children}</a>
            </Link>
        );
    }

    return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function Image(props: ImageProps) {
    return <NextImage alt={props.alt} width={500} height={375} {...props} />;
}

function FramerPrototype(props: IframeHTMLAttributes<HTMLIFrameElement>) {
    return (
        <iframe
            style={{ border: "1px solid rgba(0, 0, 0, 0.1)" }}
            width="640"
            height="480"
            src={props.src}
            allowFullScreen
        />
    );
}

const MDXComponents = {
    CustomLink,
    Image,
    FramerPrototype,
};

export default MDXComponents;
