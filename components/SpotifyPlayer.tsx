import Link from 'next/link';
import Image from 'next/future/image';
import useSWR, { Fetcher } from 'swr';

// import fetch from '@/lib/fetch';
// import fetch from 'isomorphic-unfetch';

import { SpotifyData } from '@/models/spotify';

const SpotifyPlayer = () => {
	const fetcher: Fetcher<SpotifyData> = async (url: string) => {
		const res = await fetch(url);
		return res.json();
	};

	const { data, error } = useSWR('/api/spotify', fetcher, {
		refreshInterval: 30000,
		// revalidateIfStale: false,
		// revalidateOnFocus: false,
		// revalidateOnReconnect: false,
	});

	const { isPlaying, title, artist, album, albumImage, songUrl } = data ?? {};

	return (
		<div>
			{isPlaying ? (
				<Link href={songUrl ?? ''} target="_blank">
					{albumImage && (
						<Image
							src={albumImage.url}
							width={albumImage.width}
							height={albumImage.height}
							alt={`Album cover of ${album ?? 'the album'} by ${
								artist?.join(', ') ?? 'the artist'
							}`}
						/>
					)}
					title: {title} <br />
					artist: {artist?.join(', ')} <br />
					album: {album}
				</Link>
			) : (
				<div>Not playing</div>
			)}
		</div>
	);
};

export default SpotifyPlayer;
