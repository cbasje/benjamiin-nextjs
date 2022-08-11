export interface Picture {
    id: number;
    attributes: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        formats: Formats;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

interface Formats {
    large: PictureFormat;
    small: PictureFormat;
    medium: PictureFormat;
    thumbnail: PictureFormat;
}

interface PictureFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    size: number;
    width: number;
    height: number;
}
