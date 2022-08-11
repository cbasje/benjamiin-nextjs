import { Block } from "./block";
import { Category } from "./category";
import { Locale } from "./locale";
import { Picture } from "./picture";
import { Seo } from "./seo";

export interface Project {
    id: number;
    attributes: {
        title: string;
        description: string;
        slug: string;
        cover: { data?: Picture };
        category: {
            data?: Category;
        };
        blocks: Block[];
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date;
        seo?: Seo;
        locale: Locale;
    };
}
