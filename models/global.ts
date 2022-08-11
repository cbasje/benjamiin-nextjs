import { Picture } from "./picture";
import { Seo } from "./seo";

export interface Global {
    id: number;
    attributes: GlobalAttributes;
}

export interface GlobalAttributes {
    siteName: string;
    siteDescription: string;
    defaultSeo: Seo;
}
