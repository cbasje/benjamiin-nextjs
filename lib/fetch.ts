// import fetch from 'isomorphic-unfetch';

import { Fetcher } from "swr";
import { SpotifyData } from "@/models/spotify";

const fetcher: Fetcher<SpotifyData> = async (url: string) => {
    const res = await fetch(url);
    return res.json();
};
export default fetcher;
