import Link from "next/link";
import NextImage, { ImageProps } from "next/image";

import { AnchorHTMLAttributes, IframeHTMLAttributes } from "react";

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
    return <NextImage width={500} height={375} {...props} />;
}

type PrototypeProvider = "Figma" | "Framer";
function Prototype(
    props: IframeHTMLAttributes<HTMLIFrameElement> & {
        provider: PrototypeProvider;
    }
) {
    return <iframe width="640" height="480" src={props.src} allowFullScreen />;
}

const MDXComponents = {
    CustomLink,
    Image,
    Prototype,
};

export default MDXComponents;
