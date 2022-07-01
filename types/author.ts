import { Article } from './article';
import { Picture } from './picture';

export interface Author {
	id: number;
	attributes: {
		name: string;
		email: string;
		picture: {
			data?: Picture;
		};
		articles: {
			data?: Article[];
		};
		createdAt: Date;
		updatedAt: Date;
	};
}
