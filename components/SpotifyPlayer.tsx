import Image from "next/future/image";
import Link from "next/link";
import useSWR, { Fetcher } from "swr";

import { SpotifyData } from "@/lib/types";
import { styled } from "@/stitches.config";

const PlayerContainer = styled("div", {
    display: "flex",
    lineHeight: "24px",
    letterSpacing: "-.01em",
});

const StyledLink = styled(Link, {
    display: "flex",
    flexDirection: "row-reverse",
    gap: "$2",
    padding: "$1 $2",
    transition: "background .6s cubic-bezier(.23,1,.32,1)",
    borderRadius: "$md",

    "&:hover": {
        background: "rgb($gray300)",
    },
});

const TextContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    height: "3rem",
    alignItems: "flex-end",
    textAlign: "end",
});

const StyledImage = styled(Image, {
    borderRadius: "$full",
    width: "3rem",
    height: "3rem",
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

    return (
        <PlayerContainer>
            {isPlaying ? (
                <StyledLink href={songUrl ?? ""} target="_blank">
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

                    <TextContainer>
                        <span>Now playing</span>
                        <span>
                            {title} - {artist}
                        </span>
                    </TextContainer>
                </StyledLink>
            ) : (
                <div>Not playing</div>
            )}
        </PlayerContainer>
    );
};

export default SpotifyPlayer;
