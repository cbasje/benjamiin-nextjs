import { getStrapiURL } from "./api";
import { Picture as PictureType } from "@/models/picture";

export function getStrapiMedia(media?: PictureType): string {
    if (!media) return "";

    const { url } = media.attributes;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
}
