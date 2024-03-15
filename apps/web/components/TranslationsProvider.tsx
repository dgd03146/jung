'use client';

import React, { type PropsWithChildren } from 'react';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '../app/i18n';

interface TranslationProviderProps {
  locale: string;
  namespaces: string[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  resources: any;
}

const TranslationProvider = React.memo<
  PropsWithChildren<TranslationProviderProps>
>(({ children, locale, namespaces, resources }) => {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
});

export default TranslationProvider;

TranslationProvider.displayName = 'TranslationProvider';
