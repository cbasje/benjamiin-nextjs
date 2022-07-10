import { SpotifyData } from '@/models/spotify';

const SpotifyPlayer = ({
	isPlaying,
	title,
	artist,
	album,
	albumImageUrl,
	songUrl,
}: SpotifyData) => {
	return (
		<div>
			isPlaying: {isPlaying}
			title: {title}
			artist: {artist}
			album: {album}
			albumImageUrl: {albumImageUrl}
			songUrl: {songUrl}
		</div>
	);
};

export default SpotifyPlayer;
