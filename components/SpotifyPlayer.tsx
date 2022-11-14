import Image from "next/image";
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
        fontWeight: "$regular",
        fontSize: "smaller",
        lineHeight: 1.5,
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
});

const ImagePlaceholder = styled("div", {
    borderRadius: "$full",
    width: "3rem",
    height: "3rem",
    background: "rgb($green400)",
});
const Svg = styled("svg", {
    width: "100%",
    height: "100%",
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
        <StyledLink as="span">
            <TextContainer>
                <span>Offline</span>
                <span>Spotify</span>
            </TextContainer>

            <ImagePlaceholder>
                <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                >
                    <path
                        d="M179.1,108.3a112.1,112.1,0,0,0-102.3.1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></path>
                    <path
                        d="M164.3,136.7a79.9,79.9,0,0,0-72.7.1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></path>
                    <path
                        d="M149.5,165.1A47.3,47.3,0,0,0,128,160a48.7,48.7,0,0,0-21.6,5.1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"
                    ></path>
                </Svg>
            </ImagePlaceholder>
        </StyledLink>
    );
};

export default SpotifyPlayer;
