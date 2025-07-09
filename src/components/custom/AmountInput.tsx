import React from "react";
import { TextInput } from "react-native";
import { useTranslation } from "react-i18next";
// Components
import { Card, Container, HStack, Text } from "../core";
import { useTheme } from "@/context";
import { FontFamily } from "@/theme/typography";
import { useUserPreference } from "@/database/controllers";
import { AmountInputProps } from "@/types/components.custom";

export const AmountInput: React.FC<AmountInputProps> = ({
  title,
  amount,
  onchangeAmount,
}) => {
  const { Theme } = useTheme();
  const { t } = useTranslation();
  const { userPreference } = useUserPreference();

  const userPreferenceData = React.useMemo(() => {
    return userPreference[0];
  }, [userPreference]);

  return (
    <Container sx={{ paddingTop: 16 }}>
      <Text text={title} variant="label" size="medium" />
      <Card
        bgColor={Theme.color.background.input.primary}
        sx={{
          height: 120,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 4,
        }}
      >
        <Text
          text="custom_components.amount_input.label"
          variant="body"
          size="small"
          align="center"
          color={Theme.color.text.tertiary.default}
        />

        <HStack align="center">
          <Text
            text={(userPreferenceData?.currency_symbol as string) || "$"}
            variant="headline"
            size="large"
            color={Theme.color.text.primary.default}
          />
          <TextInput
            defaultValue="0"
            placeholder={t("custom_components.amount_input.placeholder")}
            placeholderTextColor={"#B0B0B0"}
            keyboardType="numeric"
            style={[
              Theme.typography.headline.large,
              { fontFamily: `${FontFamily}_600` },
            ]}
            cursorColor={Theme.color.text.primary.default}
            value={amount}
            onChangeText={onchangeAmount}
          />
        </HStack>
      </Card>
    </Container>
  );
};
