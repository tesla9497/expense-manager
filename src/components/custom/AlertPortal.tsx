import React, { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheet, Button, Text } from "../core";
import { BottomSheetRef } from "@/types/components.core";
import { AlertPortalProps } from "@/types/components.custom";

export const AlertPortal = forwardRef<BottomSheetRef, AlertPortalProps>(
  (
    {
      title = "custom_components.alert_portal.default.title",
      message = "custom_components.alert_portal.default.message",
      message2,
      closeText = "custom_components.alert_portal.default.close",
      confirmText = "custom_components.alert_portal.default.confirm",
      onClose,
      onConfirm,
      closeButtonProps,
      confirmButtonProps,
      titleProps,
      messageProps,
      children,
      containerStyle,
      ...rest
    },
    ref
  ) => {
    return (
      <BottomSheet ref={ref} padding={16} {...rest}>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            ...containerStyle,
          }}
        >
          {title !== null && (
            <Text
              text={title}
              variant="title"
              size="large"
              align="center"
              {...titleProps}
            />
          )}
          <Text
            text={message}
            variant="body"
            size="medium"
            style={{ textAlign: "center", marginBottom: 8 }}
            {...messageProps}
          />
          {message2 && (
            <Text
              text={message2}
              variant="body"
              size="medium"
              style={{ textAlign: "center", marginBottom: 16 }}
              {...messageProps}
            >
              {message2}
            </Text>
          )}
          {children}
          {onClose && (
            <Button
              fullWidth
              title={closeText}
              onPress={onClose}
              {...closeButtonProps}
            />
          )}
          {onConfirm && (
            <Button
              fullWidth
              title={confirmText}
              onPress={onConfirm}
              {...confirmButtonProps}
            />
          )}
        </View>
      </BottomSheet>
    );
  }
);
