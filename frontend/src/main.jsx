import '@digdir/designsystemet-theme/altinn.css';
import '@digdir/designsystemet-css';
import '@/resources/css/Common.css';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import no_nb from './localizations/no_nb.json';
import no_nn from './localizations/no_nn.json';
import en from './localizations/en.json';
import { Router } from '@/routes/Router/Router';
import { getConfig } from '../config';
import store from './rtk/app/store';

use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      no_nb: { translation: no_nb },
      no_nn: { translation: no_nn },
      en: { translation: en },
    },
    fallbackLng: getConfig('defaultLocale'),
    keySeparator: '.',
    returnNull: false,
    interpolation: { escapeValue: false },
  });

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={Router}></RouterProvider>
      </Provider>
    </StrictMode>,
  );
});
