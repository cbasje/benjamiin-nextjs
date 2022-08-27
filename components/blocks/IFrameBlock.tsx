import { styled } from "@/stitches.config";

import { IframeBlock as IframeBlockType } from "@/models/block";

const Iframe = styled("iframe", {});

const IframeBlock = ({ url }: IframeBlockType) => {
    return <Iframe src={url} />;
};

export default IframeBlock;
