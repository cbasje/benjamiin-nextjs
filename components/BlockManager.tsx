import { PortableText } from "@portabletext/react";
import { getImageDimensions } from "@sanity/asset-utils";
import { Image as ImageSrc } from "lib/types";
import Link from "next/link";
import { TypedObject } from "sanity";

import Code from "./Code";
import Image from "./Image";

const LinkBlock = ({
    value,
    children,
}: {
    value?: { href: string };
    children: any;
}) => {
    const linkRegex =
        /^(?:https?:\/\/)?(?:localhost:\d{4}|(?:next\.)?benjami\.in)(\/?[\w\/]*$)/g;

    const href = value?.href || "";
    const isInternalLink = href && linkRegex.test(href);

    if (isInternalLink) {
        return (
            <Link href={href.replace(linkRegex, "$1") ?? "/"}>{children}</Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer noindex nofollow"
        >
            {children}
        </a>
    );
};

const ImageBlock = ({ value }: { value: ImageSrc }) => {
    const { width, height } = getImageDimensions(value);

    return <Image src={value} width={500} height={375} />;
};

const CodeBlock = ({ value }: { value: { content: string; lang: string } }) => {
    return <Code body={value.content} lang={value.lang} />;
};

type PrototypeProvider = "figma" | "framer" | "website";
const PrototypeBlock = ({
    value,
}: {
    value: { src: string; provider: PrototypeProvider };
}) => {
    return (
        <iframe
            width="640"
            height="480"
            src={value.src}
            title={`A ${value.provider} prototype`}
            allowFullScreen
        />
    );
};

const components = {
    types: {
        image: ImageBlock,
        code: CodeBlock,
        prototype: PrototypeBlock,
    },
    marks: {
        link: LinkBlock,
    },
};

const BlockManager = ({ content }: { content: TypedObject[] }) => {
    return (
        <section>
            <PortableText value={content} components={components} />
        </section>
    );
};

export default BlockManager;
