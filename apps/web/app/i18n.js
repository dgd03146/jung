import i18nConfig from "@/i18nConfig";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

export default async function initTranslations(
	locale,
	namespaces,
	i18nInstance,
	resources,
) {
	const instance = i18nInstance || createInstance();

	instance.use(initReactI18next);

	if (!resources) {
		instance.use(
			resourcesToBackend(
				(language, namespace) =>
					import(`../locales/${language}/${namespace}.json`),
			),
		);
	}

	await instance.init({
		lng: locale,
		resources,
		fallbackLng: i18nConfig.defaultLocale,
		supportedLngs: i18nConfig.locales,
		defaultNS: namespaces[0],
		fallbackNS: namespaces[0],
		ns: namespaces,
		preload: resources ? [] : i18nConfig.locales,
	});

	return {
		i18n: instance,
		resources: instance.services.resourceStore.data,
		t: instance.t,
	};
}
