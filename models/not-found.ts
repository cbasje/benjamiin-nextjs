import { Seo } from "./seo";

export interface NotFound {
    id: number;
    attributes: {
        title: string;
        description?: string;
        seo?: Seo;
    };
}
