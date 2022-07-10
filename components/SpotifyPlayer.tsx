import { SpotifyData } from '@/models/spotify';
import Image from 'next/future/image';
import Link from 'next/link';

const SpotifyPlayer = ({
	isPlaying,
	title,
	artist,
	album,
	albumImage,
	songUrl,
}: SpotifyData) => {
	return (
		<div>
			{isPlaying ? (
				<Link href={songUrl}>
					{albumImage && (
						<Image
							src={albumImage.url}
							width={albumImage.width}
							height={albumImage.height}
						/>
					)}
					title: {title} <br />
					artist: {artist} <br />
					album: {album}
				</Link>
			) : (
				<div>Not playing</div>
			)}
		</div>
	);
};

export default SpotifyPlayer;
