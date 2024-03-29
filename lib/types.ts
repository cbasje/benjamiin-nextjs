import { TypedObject } from "sanity";

export type Image = string;

export enum Locale {
    EN = "en",
    NL = "nl",
}

export interface Seo {
    metaTitle: string;
    metaDescription?: string;
    shareImage?: Image;
    isArticle?: boolean;
    locale?: Locale;
}

export interface Global {
    _id: number;
    siteName: string;
    siteKeywords: string;
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
    description?: string;
    callToAction?: string;
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

export interface Company {
    _id: number;
    title: string;
    url?: string;
    logo: string;
}

export type ProjectColour = "purple" | "green" | "blue";
export interface Project {
    _id: string;
    title: string;
    description: string;
    excerpt: string;
    slug: string;
    mainImage: string;
    colour?: ProjectColour;
    categories: Pick<Category, "_id" | "title">[];
    content: TypedObject[];
    company?: Company;
    publishedAt: string;
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
