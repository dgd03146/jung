import { CATEGORIES } from '../constants';
import type { Category, CategoryId } from '../types/category';

export function getCategoryById(id: CategoryId): Category | undefined {
	return CATEGORIES.find((category) => category.id === id);
}

export function isCategoryId(value: string): value is CategoryId {
	return CATEGORIES.some((category) => category.id === value);
}

export function getCategoryDisplayName(
	category: Category,
	lang: 'ko' | 'en' = 'ko',
): string {
	return category.displayName[lang];
}

export function getCategoryDescription(
	category: Category,
	lang: 'ko' | 'en' = 'ko',
): string | undefined {
	return category.description?.[lang];
}
