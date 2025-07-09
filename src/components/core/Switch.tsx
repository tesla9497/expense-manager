import React, { useRef, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
import { SwitchProps } from "@/types/components.core";

export const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  activeColor = "#34C759",
  inactiveColor = "#E5E5EA",
  thumbColor = "#FFF",
  size = 1,
}) => {
  const switchWidth = 50 * size;
  const switchHeight = 30 * size;
  const thumbSize = 26 * size;

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [inactiveColor, activeColor],
  });

  const thumbPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, switchWidth - thumbSize - 2],
  });

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={toggleSwitch}>
      <Animated.View
        style={[
          styles.switchContainer,
          {
            width: switchWidth,
            height: switchHeight,
            borderRadius: switchHeight / 2,
            backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: thumbColor,
              transform: [{ translateX: thumbPosition }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    justifyContent: "center",
    position: "relative",
  },
  thumb: {
    position: "absolute",
    top: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
});
