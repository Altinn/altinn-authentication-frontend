import React, { useState } from 'react';
import no_nb from './localizations/no_nb.json';
import no_nn from './localizations/no_nn.json';
import en from './localizations/en.json';

/**
 * {
 *     common.cancel: {
 *       'no_nb: 'Avbryt',
 *       'no_nn: 'Avbryt',
 *       'en: 'Cancel',
 *     }
 * }
 */
interface TopTranslation {
  [i18nKey: string]: {
    [language: string]: string;
  };
}

interface TranslationRow {
  [language: string]: string;
}

/**
 * {
 *     no_nb: {
 *       common: {
 *         cancel: 'Avbryt'
 *       }
 *     }
 * }
 */
interface TopLevelTranslation {
  [language: string]: {
    [heading: string]: {
      [i18nKey: string]: string;
    };
  };
}

const config: TopLevelTranslation = {
  no_nb: no_nb,
  no_nn: no_nn,
  en: en,
};

export const LanguageUtil = (): React.ReactNode => {
  const [editField, setEditField] = useState<string>('');
  const [newKeyText, setNewKeyText] = useState<string>('');

  const languages = Object.keys(config);
  const masterLanguage = languages[0];
  const baseTranslations: TopTranslation = {};

  Object.keys(config[masterLanguage]).forEach((heading) => {
    Object.keys(config[masterLanguage][heading]).forEach((key2) => {
      const mergedKey = `${heading}.${key2}`;
      const itemTranslations: TranslationRow = {};
      languages.forEach((lang) => {
        itemTranslations[lang] = config[lang][heading][key2];
      });
      baseTranslations[mergedKey] = itemTranslations;
    });
  });
  const [translations, setTranslations] = useState<TopTranslation>(baseTranslations);

  const getEditFieldKey = (transKey: string, lang: string): string => {
    return `${transKey}-${lang}`;
  };

  return (
    <table>
      <thead>
        <tr style={{ position: 'sticky', top: 0, backgroundColor: '#aaaaaa', zIndex: 10 }}>
          <td>Key</td>
          {languages.map((lang) => {
            return (
              <td key={lang}>
                {lang}
                <button
                  onClick={() => {
                    const returnValue: TopTranslation = {};
                    Object.keys(translations).forEach((x) => {
                      const [heading, key] = x.split('.');

                      if (!returnValue.hasOwnProperty(heading)) {
                        returnValue[heading] = {};
                      }
                      returnValue[heading][key] = translations[x][lang];
                    });
                    console.log(returnValue);
                    navigator.clipboard.writeText(JSON.stringify(returnValue));
                  }}
                >
                  Eksporter
                </button>
              </td>
            );
          })}
          <td />
        </tr>
      </thead>
      <tbody>
        {Object.keys(translations).map((transKey, index) => {
          return (
            <tr key={transKey} style={{ backgroundColor: index % 2 ? '#ffffff' : '#e3e3e3' }}>
              <td>{transKey}</td>
              {Object.keys(translations[transKey]).map((lang) => {
                const editFieldKey = getEditFieldKey(transKey, lang);
                return (
                  <td key={editFieldKey} style={{ position: 'relative' }}>
                    {editField === editFieldKey ? (
                      <textarea
                        autoFocus
                        style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}
                        defaultValue={translations[transKey][lang]}
                        onBlur={(event) => {
                          setEditField('');
                          setTranslations((old) => {
                            const newObj = { ...old };
                            newObj[transKey][lang] = event.target.value;
                            return newObj;
                          });
                        }}
                      />
                    ) : (
                      <div
                        onClick={() => setEditField(editFieldKey)}
                        tabIndex={0}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            event.preventDefault();
                            setEditField(editFieldKey);
                          }
                        }}
                      >
                        {translations[transKey][lang] || (
                          <div style={{ color: 'red' }}>MANGLER</div>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
              <td>
                <button
                  onClick={() => {
                    setTranslations((old) => {
                      const newObj = { ...old };
                      delete newObj[transKey];
                      return newObj;
                    });
                  }}
                >
                  Slett
                </button>
              </td>
            </tr>
          );
        })}
        <tr style={{ position: 'sticky', bottom: 0, backgroundColor: '#aaaaaa' }}>
          <td colSpan={100}>
            <input value={newKeyText} onChange={(event) => setNewKeyText(event.target.value)} />
            <button
              onClick={() => {
                setTranslations((old) => {
                  const newTrans: TranslationRow = {};
                  languages.forEach((lang) => {
                    newTrans[lang] = '';
                  });
                  return {
                    ...old,
                    [newKeyText]: newTrans,
                  };
                });
                setNewKeyText('');
                setEditField(getEditFieldKey(newKeyText, masterLanguage));
              }}
            >
              Legg til ny tekst
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
