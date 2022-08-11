import { Locale } from "./locale";
import { Seo } from "./seo";

export interface Contact {
    id: number;
    attributes: {
        title: string;
        description?: string;
        seo?: Seo;
        locale: Locale;
    };
}
