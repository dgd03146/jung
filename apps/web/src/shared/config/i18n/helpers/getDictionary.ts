import type { DictionaryType } from '../dictionaries/schema';

/**
 * Object containing functions that import and return dictionaries based on the specified language key.
 */
const dictionaries: Record<string, () => Promise<DictionaryType>> = {
	en: () =>
		import('../dictionaries/en.json').then(
			(module) => module.default as DictionaryType,
		),
	ko: () =>
		import('../dictionaries/ko.json').then(
			(module) => module.default as DictionaryType,
		),
	// ru: () =>
	// 	import('../dictionaries/ru.json').then(
	// 		(module) => module.default as DictionaryType,
	// 	),
	// de: () =>
	// 	import('../dictionaries/de.json').then(
	// 		(module) => module.default as DictionaryType,
	// 	),
	// it: () =>
	// 	import('../dictionaries/it.json').then(
	// 		(module) => module.default as DictionaryType,
	// 	),
	// fr: () =>
	// 	import('../dictionaries/fr.json').then(
	// 		(module) => module.default as DictionaryType,
	// 	),
	// es: () =>
	// 	import('../dictionaries/es.json').then(
	// 		(module) => module.default as DictionaryType,
	// 	),
};

/**
 * Asynchronously retrieves a dictionary based on the specified locale.
 * @param locale The locale for which to retrieve the dictionary.
 * @returns A Promise that resolves to the dictionary for the specified locale.
 */
const getDictionary = async (locale: string): Promise<DictionaryType> => {
	const dictionaryLoader = dictionaries[locale];
	if (dictionaryLoader) {
		return dictionaryLoader();
	}
	throw new Error(`Dictionary for locale ${locale} not found`);
};

export default getDictionary;
