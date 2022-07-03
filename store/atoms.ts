import { atom } from 'recoil';

import { Homepage } from '@/models/homepage';
import { Category } from '@/models/category';
import { Contact } from '@/models/contact';

export const homepageState = atom<Homepage>({
	key: 'homepageState',
	default: {} as Homepage,
});
export const categoriesState = atom<Category[]>({
	key: 'categoriesState',
	default: [],
});
export const contactState = atom<Contact>({
	key: 'contactState',
	default: {} as Contact,
});
