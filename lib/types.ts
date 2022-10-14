import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Picture = string;

export enum Locale {
    EN = "en",
    NL = "nl",
}

export interface Seo {
    metaTitle: string;
    metaDescription?: string;
    shareImage?: Picture;
    isArticle?: boolean;
    locale?: Locale;
}

export interface Global {
    _id: number;
    siteName: string;
    siteDescription: string;
    defaultSeo: Seo;
    locale?: Locale;
}

export interface NotFound {
    _id: number;
    title: string;
    description?: string;
    seo?: Seo;
}

export interface Home {
    _id: number;
    title: string;
    description: string;
    headshot: string;
    seo?: Seo;
    locale: Locale;
}

export interface Category {
    _id: number;
    title: string;
    description: string;
    slug: string;
    locale: Locale;
    projects?: Project[];
}

type Colour = "purple" | "green" | "blue";
export interface Project {
    _id: string;
    title: string;
    description: string;
    slug: string;
    mainImage: string;
    colour?: Colour;
    categories: Category[];
    content: MDXRemoteSerializeResult;
    publishedAt: Date;
    seo?: Seo;
    locale: Locale;
}

export interface SpotifyData {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImage?: AlbumImage;
    songUrl?: string;
}

interface AlbumImage {
    url: string;
    width: number;
    height: number;
}
