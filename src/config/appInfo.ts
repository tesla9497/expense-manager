import { AppInfoProps } from "@/types/config";

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;
const APP_VERSION = process.env.EXPO_PUBLIC_APP_VERSION;
const APP_SLUG = process.env.EXPO_PUBLIC_APP_SLUG;
const APP_SCHEME = process.env.EXPO_PUBLIC_APP_SCHEME;
const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const APP_BUNDLE_ID = process.env.EXPO_PUBLIC_APP_BUNDLE_ID;
const SENTRY_DSN = process.env.EXPO_PUBLIC_SENTRY_DSN;

export const APP_INFO: AppInfoProps = {
  appName: APP_NAME,
  appVersion: APP_VERSION,
  appSlug: APP_SLUG,
  appScheme: APP_SCHEME,
  appId: APP_ID,
  appBundleId: APP_BUNDLE_ID,
  sentryDsn: SENTRY_DSN,
};
