import { Block } from "./block";
import { Locale } from "./locale";
import { Seo } from "./seo";

export interface About {
    id: number;
    attributes: {
        title: string;
        description?: string;
        blocks?: Block[];
        seo?: Seo;
        locale: Locale;
    };
}
