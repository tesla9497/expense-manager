import "@/utils/polyfills";
import React from "react";
import { Stack } from "expo-router";
import { PortalProvider } from "@gorhom/portal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants, { ExecutionEnvironment } from "expo-constants";
import * as Sentry from "@sentry/react-native";
// Components
import "@/components/utils/i18n";
import { ThemeProvider } from "@/context";
import { RealmCustomProvider } from "@/providers";
import { APP_INFO } from "@/config/appInfo";

function RootLayout() {
  const navigationIntegration = Sentry.reactNavigationIntegration({
    enableTimeToInitialDisplay:
      Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
  });
  Sentry.init({
    dsn: APP_INFO.sentryDsn,
    tracesSampleRate: 1.0,
    integrations: [navigationIntegration],
    enableNativeFramesTracking:
      Constants.executionEnvironment === ExecutionEnvironment.StoreClient,
  });
  return (
    <ThemeProvider>
      <RealmCustomProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </PortalProvider>
        </GestureHandlerRootView>
      </RealmCustomProvider>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
