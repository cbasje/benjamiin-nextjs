import type { NextRequest, NextResponse } from "next/server";

import { getNowPlaying } from "@/lib/now-playing";
import { SpotifyData } from "@/lib/types";

const parseName = (name: string) => {
    return name.split(/[(-]/i)[0];
};

export default async function handler(req: NextRequest, res: NextResponse) {
    const response = await getNowPlaying();

    if (!response.ok || response.status === 204 || response.status >= 400) {
        return new Response(
            JSON.stringify({
                isPlaying: false,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const song = await response.json();
    const data: SpotifyData = {
        isPlaying: song.is_playing,
        title: parseName(song.item.name),
        artist: song.item.artists.map((_artist: any) => _artist.name)[0],
        album: parseName(song.item.album.name),
        albumImage: song.item.album.images[2],
        songUrl: song.item.external_urls.spotify,
    };

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const config = {
    runtime: "experimental-edge",
};
