import "@/utils/polyfills";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import { getLocales } from "expo-localization";
// Components
import "@/components/utils/i18n";
import { supportedLanguages } from "@/locales";
import { AnimatedSplashScreen } from "@/components/custom";
import {
  useAccounts,
  useUserDatabase,
  useUserPreference,
  useGeneralSettings,
} from "@/database/controllers";

export default function Index() {
  const localeValue = getLocales();
  const { settings } = useGeneralSettings();
  const { user } = useUserDatabase();
  const { userPreference, updateUserPreference } = useUserPreference();
  const { accounts } = useAccounts();

  const userPreferenceData = React.useMemo(() => {
    return userPreference[0];
  }, [userPreference]);

  const generalSettingData = React.useMemo(() => {
    return settings[0];
  }, [settings]);

  const [appReady, setAppReady] = useState(false);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Raleway_400: require("@assets/font/Raleway-400.ttf"),
    Raleway_500: require("@assets/font/Raleway-500.ttf"),
    Raleway_600: require("@assets/font/Raleway-600.ttf"),
    Raleway_700: require("@assets/font/Raleway-700.ttf"),
  });

  React.useEffect(() => {
    if (userPreferenceData?.once_done) return;
    const language = supportedLanguages.find(
      (item) => item === localeValue[0].languageCode
    );
    updateUserPreference({
      currency: localeValue[0].currencyCode,
      currency_symbol: localeValue[0].currencySymbol,
      language: language || "en",
      region: localeValue[0].regionCode,
      date_format: "dd/mm/yyyy",
      dark_mode: false,
      notifications: true,
      once_done: true,
    });
  }, [localeValue]);

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      setAppReady(true);
    }
  }, [fontsLoaded, fontError]);

  React.useEffect(() => {
    setTimeout(() => {
      setSplashAnimationFinished(true);
    }, 3000);
  }, []);

  const showAnimatedSplash = !appReady || !splashAnimationFinished;
  if (showAnimatedSplash) {
    return <AnimatedSplashScreen />;
  }

  return generalSettingData?.onboarded ? (
    user ? (
      accounts?.length === 0 ? (
        <Redirect href="/account/account_creation" />
      ) : (
        <Redirect href="/(tabs)/home" />
      )
    ) : (
      <Redirect href="/login" />
    )
  ) : (
    <Redirect href="/onboarding" />
  );
}
