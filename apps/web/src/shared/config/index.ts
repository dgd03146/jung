export { defaultLocale, locales } from './i18n/locales';
export type { DictionaryType } from './i18n/dictionaries/schema';
export { default as getDictionary } from './i18n/helpers/getDictionary';
export { default as getLocale } from './i18n/helpers/getLocale';
export { default as handleLocaleRedirection } from './i18n/helpers/localeRedirection';
export * from './tanstack-query/getQueryClient';
export { queryKeys } from './tanstack-query/queryKeys';
export * from './comment';
