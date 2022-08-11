import { Locale } from "./locale";
import { Project } from "./project";

export interface Category {
    id: number;
    attributes: {
        title: string;
        slug: string;
        description?: string;
        projects?: { data: Project[] };
        createdAt: Date;
        updatedAt: Date;
        locale: Locale;
    };
}
