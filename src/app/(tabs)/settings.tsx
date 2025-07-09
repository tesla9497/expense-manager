import React from "react";
import { Pressable, View, Animated, ScrollView } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Realm from "realm";
import { useRouter } from "expo-router";
// Components
import {
  Button,
  Container,
  Divider,
  HStack,
  Screen,
  Switch,
  Text,
  LoadingOverlay,
  Card,
  VStack,
} from "@/components/core";
import { Header, SelectionBottomSheet } from "@/components/custom";
import { Right } from "@/assets/icons";
import { useTheme } from "@/context";
import { useUserPreference } from "@/database/controllers";
import { APP_INFO } from "@/config/appInfo";
import { CURRENCY_TYPES, CurrencyType } from "@/database/static/currency";
import { LANGUAGE_TYPES, LanguageType } from "@/database/static/language";
import { useBackupService } from "@/services/backupService";
import { AlertPortal } from "@/components/custom/AlertPortal";
import { BottomSheetRef } from "@/types/components.core";

const Settings = () => {
  const { Theme } = useTheme();
  const router = useRouter();
  const { exportData, importData, deleteData, resetData } = useBackupService();
  const currencyRef = React.useRef<BottomSheetRef>(null);
  const languageRef = React.useRef<BottomSheetRef>(null);
  const themeRef = React.useRef<BottomSheetRef>(null);
  const alertRef = React.useRef<BottomSheetRef>(null);
  const { userPreference, updateUserPreference } = useUserPreference();

  const [isExporting, setIsExporting] = React.useState(false);
  const [isImporting, setIsImporting] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const [confirmationState, setConfirmationState] = React.useState<{
    isConfirming: boolean;
    type: "delete" | "reset" | null;
  }>({
    isConfirming: false,
    type: null,
  });
  const userPreferenceData = React.useMemo(() => {
    const data = userPreference[0];
    if (!data) return null;
    return {
      ...data.toJSON(),
      _id: data._id.toString(),
      currency: data.currency,
      currency_symbol: data.currency_symbol,
      language: data.language,
      region: data.region,
      date_format: data.date_format,
      dark_mode: data.dark_mode,
      notifications: data.notifications,
      once_done: data.once_done,
    };
  }, [userPreference]);

  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const animateTransition = (toConfirmation: boolean) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setConfirmationState((prev) => ({
        isConfirming: toConfirmation,
        type: toConfirmation ? prev.type : null,
      }));

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportData();
    } catch (error) {
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsImporting(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });

      if (!result.canceled && result.assets.length > 0) {
        const fileContent = await fetch(result.assets[0].uri);
        const jsonData = await fileContent.json();
        await importData(jsonData);
      }
    } catch (error) {
    } finally {
      setIsImporting(false);
    }
  };

  const handleDeleteConfirmation = async (type: "delete" | "reset") => {
    setConfirmationState((prev) => ({
      ...prev,
      type,
    }));
    animateTransition(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      setIsDeleting(true);
      if (confirmationState.type === "delete") {
        await deleteData();
      } else {
        await resetData();
        router.back();
      }
      setConfirmationState({ isConfirming: false, type: null });
      alertRef.current?.close();
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelConfirmation = () => {
    animateTransition(false);
  };

  const StackedSettingView = ({
    title,
    data,
  }: {
    title: string;
    data: {
      label: string;
      value?: string;
      renderRight?: React.ReactNode;
      onPress?: () => void;
      selection?: boolean;
      onPressLayout?: () => void;
    }[];
  }) => {
    return (
      <View style={{ paddingVertical: 16 }}>
        <Text
          text={title}
          variant="label"
          size="large_promenent"
          color={Theme.color.text.tertiary.default}
          style={{ marginBottom: 16 }}
        />
        {data &&
          data.map((item) => (
            <Pressable
              key={item.label}
              onPress={item.onPressLayout}
              style={{ width: "100%", marginVertical: 12 }}
            >
              <HStack
                align="center"
                justify="space-between"
                style={{ width: "100%" }}
              >
                <>
                  {item.renderRight || item.selection ? (
                    <Text text={item.label} variant="body" size="large" />
                  ) : (
                    <Button
                      variant="text"
                      title={item.label}
                      onPress={item.onPress}
                    />
                  )}
                  {item.renderRight ? (
                    item.renderRight
                  ) : item.selection ? (
                    <Pressable onPress={item.onPress}>
                      <HStack align="center" spacing={4}>
                        <Text
                          text={item.value}
                          variant="body"
                          size="large"
                          color={Theme.color.text.tertiary.default}
                        />
                        <Right
                          width={16}
                          height={16}
                          color={Theme.color.text.tertiary.default}
                        />
                      </HStack>
                    </Pressable>
                  ) : null}
                </>
              </HStack>
            </Pressable>
          ))}
      </View>
    );
  };

  return (
    <Screen>
      <Container sx={{ flex: 1 }}>
        <Header title="settings.title" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <StackedSettingView
            title="settings.user_preference.title"
            data={[
              {
                label: "settings.user_preference.currency",
                value: userPreferenceData?.currency || "USD",
                onPress: () => currencyRef.current?.open(),
                selection: true,
              },
              {
                label: "settings.user_preference.language",
                value:
                  userPreferenceData?.language === "en" ? "English" : "English",
                onPress: () => languageRef.current?.open(),
                selection: true,
              },
              {
                label: "settings.user_preference.theme.label",
                value: userPreferenceData?.dark_mode
                  ? "settings.user_preference.theme.dark"
                  : "settings.user_preference.theme.light",
                renderRight: (
                  <Pressable onPress={() => themeRef.current?.open()}>
                    <HStack align="center" spacing={8}>
                      <Text
                        text={
                          userPreferenceData?.dark_mode
                            ? "settings.user_preference.theme.dark"
                            : "settings.user_preference.theme.light"
                        }
                        variant="body"
                        size="large"
                        color={Theme.color.text.tertiary.default}
                      />
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: Theme.border.radius.x5,
                          backgroundColor: userPreferenceData?.dark_mode
                            ? Theme.color.text.tertiary.default
                            : Theme.color.text.secondary.default,
                        }}
                      />
                    </HStack>
                  </Pressable>
                ),
              },
              {
                label: "settings.user_preference.notifications",
                value: userPreferenceData?.notifications ? "On" : "Off",
                renderRight: (
                  <Switch
                    value={userPreferenceData?.notifications === true}
                    onValueChange={() =>
                      updateUserPreference({
                        ...userPreferenceData,
                        _id: new Realm.BSON.ObjectId(userPreferenceData._id),
                        notifications: !userPreferenceData?.notifications,
                      })
                    }
                  />
                ),
              },
              {
                label: "settings.user_preference.categories",
                onPressLayout: () => router.push("/categories"),
                selection: true,
              },
            ]}
          />
          <Divider />
          <StackedSettingView
            title="settings.data_management.title"
            data={[
              {
                label: "settings.data_management.backup",
                onPress: handleExport,
              },
              {
                label: "settings.data_management.restore",
                onPress: handleImport,
              },
              {
                label: "settings.data_management.delete_reset",
                onPress: () => alertRef.current?.open(),
              },
            ]}
          />
          <Divider />
          <StackedSettingView
            title="settings.general.title"
            data={[
              {
                label: "settings.general.privacy_policy",
                onPress: () => {},
                renderRight: <></>,
              },
              {
                label: "settings.general.terms_conditions",
                onPress: () => {},
                renderRight: <></>,
              },
              {
                label: "settings.general.help_support",
                onPress: () => {},
                renderRight: <></>,
              },
            ]}
          />
          <Text
            text="settings.version"
            params={{ version: APP_INFO.appVersion }}
            variant="body"
            size="small"
            align="center"
            color={Theme.color.text.tertiary.default}
            style={{
              paddingVertical: 16,
            }}
          />
        </ScrollView>
      </Container>
      <SelectionBottomSheet
        title="settings.selection.currency.title"
        data={CURRENCY_TYPES?.sort((a, b) => a.name.localeCompare(b.name)).map(
          ({ name, icon }) => ({ name, icon })
        )}
        ref={currencyRef}
        selected={
          CURRENCY_TYPES.find(
            (item) => item.currency === userPreferenceData?.currency
          )?.name
        }
        onTouchEnd={(item: CurrencyType) => {
          const currency = CURRENCY_TYPES.find(
            (currency) => currency.name === item.name
          );
          updateUserPreference({
            ...userPreferenceData,
            _id: new Realm.BSON.ObjectId(userPreferenceData._id),
            currency: currency?.currency,
            currency_symbol: currency?.icon,
            region: currency?.region,
          });
          currencyRef.current?.close();
        }}
      />
      <SelectionBottomSheet
        title="settings.selection.language.title"
        data={LANGUAGE_TYPES?.sort((a, b) => a.name.localeCompare(b.name)).map(
          ({ name, icon }) => ({ name, icon })
        )}
        ref={languageRef}
        selected={
          LANGUAGE_TYPES.find(
            (item) => item.code === userPreferenceData?.language
          )?.name
        }
        onTouchEnd={(item: LanguageType) => {
          updateUserPreference({
            ...userPreferenceData,
            _id: new Realm.BSON.ObjectId(userPreferenceData?._id),
            language: item.code,
          });
          languageRef.current?.close();
        }}
      />
      <SelectionBottomSheet
        title="settings.selection.theme.title"
        data={[
          { name: "settings.user_preference.theme.light", icon: "☀️" },
          // { name: "settings.user_preference.theme.dark", icon: "🌙" },
        ]}
        ref={themeRef}
        selected={
          userPreferenceData?.dark_mode
            ? "settings.user_preference.theme.dark"
            : "settings.user_preference.theme.light"
        }
        onTouchEnd={(item) => {
          updateUserPreference({
            ...userPreferenceData,
            _id: new Realm.BSON.ObjectId(userPreferenceData?._id),
            dark_mode: item.name === "settings.user_preference.theme.dark",
          });
          themeRef.current?.close();
        }}
      />
      <AlertPortal
        ref={alertRef}
        title={
          confirmationState.isConfirming
            ? confirmationState.type === "delete"
              ? "settings.data_reset.delete.confirm_title"
              : "settings.data_reset.reset.confirm_title"
            : "settings.data_reset.title"
        }
        message={
          confirmationState.isConfirming
            ? "settings.data_reset.delete.confirm_message"
            : "settings.data_reset.message"
        }
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: "100%",
          }}
        >
          {!confirmationState.isConfirming ? (
            <VStack spacing={8} style={{ width: "100%", marginTop: 16 }}>
              <Card
                sx={{
                  padding: 8,
                  borderWidth: Theme.border.size.s,
                  borderColor: Theme.color.stroke_border.teritory,
                  overflow: "hidden",
                }}
                bgColor={`${Theme.color.shadow.secondary}30`}
              >
                <Pressable
                  onPress={() => handleDeleteConfirmation("delete")}
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                >
                  <Text
                    text="settings.data_reset.delete.title"
                    variant="label"
                    size="large"
                    style={{ fontWeight: "bold", marginBottom: 4 }}
                  />
                  <Text
                    text="settings.data_reset.delete.description"
                    variant="label"
                    size="medium"
                    style={{ marginBottom: 8 }}
                  />
                </Pressable>
              </Card>
              <Card
                sx={{
                  padding: 8,
                  borderWidth: Theme.border.size.s,
                  borderColor: Theme.color.stroke_border.teritory,
                  overflow: "hidden",
                }}
                bgColor={`${Theme.color.shadow.secondary}30`}
              >
                <Pressable
                  onPress={() => handleDeleteConfirmation("reset")}
                  style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                >
                  <Text
                    text="settings.data_reset.reset.title"
                    variant="label"
                    size="large"
                    style={{ fontWeight: "bold", marginBottom: 4 }}
                  />
                  <Text
                    text="settings.data_reset.reset.description"
                    variant="label"
                    size="medium"
                    style={{ marginBottom: 8 }}
                  />
                </Pressable>
              </Card>

              <Button
                title="settings.data_reset.cancel"
                onPress={() => alertRef.current?.close()}
                variant="outlined"
              />
            </VStack>
          ) : (
            <VStack spacing={8} style={{ width: "100%", marginTop: 16 }}>
              <Animated.View
                style={{
                  transform: [{ scale: scaleAnim }],
                }}
              >
                <Button
                  title={
                    confirmationState.type === "delete"
                      ? "settings.data_reset.delete.confirm_button"
                      : "settings.data_reset.reset.confirm_button"
                  }
                  onPress={handleConfirmedDelete}
                  color={Theme.color.stroke_border.teritory}
                  style={{ marginBottom: 8 }}
                />
                <Button
                  title="settings.data_reset.no_cancel"
                  onPress={handleCancelConfirmation}
                  variant="outlined"
                />
              </Animated.View>
            </VStack>
          )}
        </Animated.View>
      </AlertPortal>
      <LoadingOverlay
        visible={isExporting || isImporting || isDeleting || isResetting}
      />
    </Screen>
  );
};

export default Settings;
