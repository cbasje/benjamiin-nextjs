import { getNowPlaying } from '@/lib/spotify';
import { SpotifyData } from '@/models/spotify';
import type { NextRequest, NextResponse } from 'next/server';

export const config = {
	runtime: 'experimental-edge',
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
					'Content-Type': 'application/json',
				},
			}
		);
	}

	const song = await response.json();
	const data: SpotifyData = {
		isPlaying: song.is_playing,
		title: song.item.name,
		artist: song.item.artists.map((_artist: any) => _artist.name),
		album: song.item.album.name,
		albumImage: song.item.album.images[2],
		songUrl: song.item.external_urls.spotify,
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
