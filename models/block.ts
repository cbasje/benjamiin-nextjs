import { Picture } from "./picture";

export type Block =
    | RichTextBlock
    | CodeBlock
    | PictureBlock
    | CarouselBlock
    | QuoteBlock;

enum CodeLang {
    Markup = "markup",
    C = "clike",
    JS = "javascript",
    JSX = "jsx",
    TS = "typescript",
    TSX = "tsx",
    Python = "python",
    Swift = "swift",
}

export interface BaseBlock {
    id: number;
    __component: string;
}

export interface RichTextBlock extends BaseBlock {
    body: string;
}

export interface CodeBlock extends BaseBlock {
    body: string;
    lang: CodeLang;
}

export interface PictureBlock extends BaseBlock {
    file: {
        data: Picture;
    };
}

export interface CarouselBlock extends BaseBlock {
    files: {
        data: Picture[];
    };
}

export interface QuoteBlock extends BaseBlock {
    body: string;
    link?: string;
    citation?: Citation;
}

interface Citation {
    author: string;
    company?: string;
    link?: string;
}
