import { styled } from "@/stitches.config";

import { IframeBlock as IframeBlockType } from "@/models/block";

const Iframe = styled("iframe", {
    aspectRatio: "16 / 9",
    width: "100%",
    borderRadius: "$sm",
});

const IframeBlock = ({ url }: IframeBlockType) => {
    return (
        <Iframe
            src={url}
            loading="lazy"
            allow="layout-animations 'none'; fullscreen; geolocation 'none'; camera 'none'; microphone 'none'"
        />
    );
};

export default IframeBlock;
