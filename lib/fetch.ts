// import fetch from 'isomorphic-unfetch';

import { SpotifyData } from "@/lib/types";
import { Fetcher } from "swr";

const fetcher: Fetcher<SpotifyData> = async (url: string) => {
    const res = await fetch(url);
    return res.json();
};
export default fetcher;
