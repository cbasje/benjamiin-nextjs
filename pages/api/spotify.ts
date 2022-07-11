import { getNowPlaying } from '@/lib/spotify';
import { SpotifyData } from '@/models/spotify';
import type { NextRequest, NextResponse } from 'next/server';

// export const config = {
// 	runtime: 'experimental-edge',
// };

export default async function handler(req: NextRequest, res: NextResponse) {
	const response = await getNowPlaying();
	console.log('🚀 --------------------------------🚀');
	console.log('🚀 ~ handler ~ response', response);
	console.log('🚀 --------------------------------🚀');

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
		artist: song.item.artists
			.map((_artist: any) => _artist.name)
			.join(', '),
		album: song.item.album.name,
		albumImage: song.item.album.images[0],
		songUrl: song.item.external_urls.spotify,
	};

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
