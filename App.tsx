import React, {useState, useEffect} from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
import {getLocales} from 'react-native-localize';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './ts/navigation/AppNavigator';
import {loadTheme} from './ts/shared/theme';
import {loadLocale} from './ts/shared/utils/locale';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const colorScheme = useColorScheme();

  const [{languageCode, isRTL}] = getLocales();
  const theme = loadTheme(colorScheme || 'light', isRTL);

  useEffect(() => {
    (async () => {
      loadLocale('en');
      setIsLoading(false);
      SplashScreen.hide();
    })();
  }, [languageCode]);

  if (isLoading) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default App;
