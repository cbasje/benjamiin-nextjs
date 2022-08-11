import { ReactNode } from "react";

import {
    Block as BlockType,
    RichTextBlock as RichTextBlockType,
    CodeBlock as CodeBlockType,
    PictureBlock as PictureBlockType,
    CarouselBlock as CarouselBlockType,
    QuoteBlock as QuoteBlockType,
} from "@/models/block";

import { BlocksContainer } from "@/stitches.config";
import RichTextBlock from "./blocks/RichTextBlock";
import CodeBlock from "./blocks/CodeBlock";
import PictureBlock from "./blocks/PictureBlock";
import CarouselBlock from "./blocks/CarouselBlock";
import QuoteBlock from "./blocks/QuoteBlock";

const getBlockComponent = (blockType: BlockType, index: number): ReactNode => {
    let block: ReactNode;
    let props;

    const key = `i-${index}`;

    switch (blockType.__component) {
        case "blocks.rich-text":
            props = blockType as RichTextBlockType;
            block = <RichTextBlock key={`block-${key}`} {...props} />;
            break;
        case "blocks.code":
            props = blockType as CodeBlockType;
            block = <CodeBlock key={`block-${key}`} {...props} />;
            break;
        case "blocks.media":
            props = blockType as PictureBlockType;
            block = <PictureBlock key={`block-${key}`} {...props} />;
            break;
        case "blocks.carousel":
            props = blockType as CarouselBlockType;
            block = <CarouselBlock key={`block-${key}`} {...props} />;
            break;
        case "blocks.quote":
            props = blockType as QuoteBlockType;
            block = <QuoteBlock key={`block-${key}`} {...props} />;
            break;
    }

    return block;
};

const BlockManager = (
    { blocks }: { blocks?: BlockType[] } = {
        blocks: [],
    }
) => {
    return (
        <BlocksContainer>
            {blocks && blocks.map(getBlockComponent)}
        </BlocksContainer>
    );
};

export default BlockManager;
