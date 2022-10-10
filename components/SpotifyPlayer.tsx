import Image from "next/future/image";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

import { SpotifyData } from "@/lib/types";
import { styled } from "@/stitches.config";

const StyledLink = styled(Link, {
    maxWidth: "100%",

    display: "flex",
    flexDirection: "row",
    gap: "$2",
    borderRadius: "$md",
    lineHeight: "24px",
    letterSpacing: "-.01em",
});

const TextContainer = styled("div", {
    maxWidth: "100%",

    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    height: "3rem",
    alignItems: "flex-end",
    justifyContent: "center",
    textAlign: "end",

    "& > span": {
        maxWidth: "100%",

        fontFamily: "$display",
        textTransform: "uppercase",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",

        "&:first-child": { fontWeight: "$bold" },
    },
});

const StyledImage = styled(Image, {
    borderRadius: "$full",
    width: "3rem",
    height: "3rem",

    "&:hover": {
        background: "red", //FIXME:
    },
});

const ImagePlaceholder = styled("div", {
    borderRadius: "$full",
    width: "3rem",
    height: "3rem",
    background: "rgb($green400)",

    "&:hover": {
        background: "red", //FIXME:
    },
});

const SpotifyPlayer = () => {
    const fetcher: Fetcher<SpotifyData> = async (url: string) => {
        const res = await fetch(url);
        return res.json();
    };

    const { data, error } = useSWR("/api/now-playing", fetcher, {
        refreshInterval: 30000,
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false,
    });

    if (error) return <div></div>;

    const { isPlaying, title, artist, album, albumImage, songUrl } = data ?? {
        isPlaying: false,
    };

    return isPlaying ? (
        <StyledLink href={songUrl ?? ""} target="_blank">
            <TextContainer>
                <span>Now playing</span>
                <span>
                    {title} - {artist}
                </span>
            </TextContainer>

            {albumImage && (
                <StyledImage
                    src={albumImage.url}
                    width={albumImage.width}
                    height={albumImage.height}
                    alt={`Album cover of ${album ?? "the album"} by ${
                        artist ?? "the artist"
                    }`}
                />
            )}
        </StyledLink>
    ) : (
        <StyledLink href="#">
            <TextContainer>
                <span>Offline</span>
            </TextContainer>

            <ImagePlaceholder />
        </StyledLink>
    );
};

export default SpotifyPlayer;
