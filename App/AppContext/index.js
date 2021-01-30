import React, {createContext, useEffect, useState} from 'react';
import translations, {DEFAULT_LANGUAGE} from '../Localization';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import {DEFAULT_THEME, Theme} from '../Theme';
import {Appearance} from 'react-native';
import {omit} from 'lodash';

const APP_LANGUAGE = 'appLanguage';
const APP_THEME = 'appTheme';

export const AppContext = createContext({
  translations,
  setAppLanguage: () => {},
  appLanguage: DEFAULT_LANGUAGE,
  initializeAppLanguage: () => {},
  appTheme: DEFAULT_THEME,
  initializeAppTheme: () => {},
  setAppTheme: () => {},
});

export const AppContextProvider = ({children}) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);
  const [appTheme, setAppTheme] = useState(DEFAULT_THEME);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    setInitialLoad();
  });

  const setInitialLoad = async () => {
    if (isInit) {
      await initializeAppTheme();
      await initializeAppLanguage();
      setIsInit(false);
    }
  };

  const setLanguage = (language) => {
    translations.setLanguage(language);
    setAppLanguage(language);
    AsyncStorage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async (languageCode = null) => {
    const currentLanguage = await AsyncStorage.getItem(APP_LANGUAGE);
    if (!currentLanguage && !languageCode) {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        (locale) => locale.languageCode,
      );
      phoneLocaleCodes.some((code) => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    } else {
      if (languageCode) {
        setLanguage(languageCode);
        AsyncStorage.setItem(APP_LANGUAGE, languageCode);
      } else {
        setLanguage(currentLanguage);
      }
    }
  };

  const setTheme = (theme) => {
    setAppTheme(theme);
    AsyncStorage.setItem(APP_THEME, theme);
  };

  const initializeAppTheme = async (themeType) => {
    const currentTheme = await AsyncStorage.getItem(APP_THEME);
    if (!currentTheme && !themeType) {
      const colorScheme = Appearance.getColorScheme();
      setAppTheme((colorScheme && colorScheme) || DEFAULT_THEME);
    } else {
      if (themeType) {
        setAppTheme(themeType);
        AsyncStorage.setItem(APP_THEME, themeType);
      } else {
        setAppTheme(currentTheme);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        translations: omit(translations, ['_props', '_opts']),
        setAppLanguage: setLanguage,
        appLanguage,
        initializeAppLanguage,
        appTheme: Theme[appTheme],
        setAppTheme: setTheme,
        initializeAppTheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};
