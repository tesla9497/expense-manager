import React from "react";
import { useWindowDimensions, View } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useTheme } from "@/context";
import { Text } from "./Text";
import { RangeSliderProps } from "@/types/components.core";

export const RangeSlider: React.FC<RangeSliderProps> = ({
  values = [10, 50],
  min = 0,
  max = 100,
  step = 1,
  onValuesChange = (values: number[]) => {},
}) => {
  const { Theme } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  const getAdjustedLeft = (position: number, value: number) => {
    const numDigits = value?.toString()?.length || 0;
    const adjustment = numDigits === 3 ? -8 : numDigits >= 4 ? -14 : 0;
    return position + adjustment;
  };

  return (
    <View style={{ width: "100%", marginTop: 12 }}>
      <MultiSlider
        values={values}
        min={min}
        max={max}
        step={step}
        onValuesChange={onValuesChange}
        sliderLength={screenWidth - 54}
        selectedStyle={{
          backgroundColor: Theme.color.calendar.date.pressed,
        }}
        unselectedStyle={{
          backgroundColor: Theme.color.base.secondary,
        }}
        trackStyle={{ height: 4 }}
        containerStyle={{ padding: 0, margin: 0, alignItems: "center" }}
        markerStyle={{
          top: 2,
          height: 22,
          width: 22,
          backgroundColor: Theme.color.base.primary,
          borderWidth: 2,
          borderColor: Theme.color.calendar.date.pressed,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 3,
        }}
        touchDimensions={{
          height: 50,
          width: 50,
          borderRadius: 25,
          slipDisplacement: 50,
        }}
        enableLabel
        customLabel={(e) => (
          <>
            <View
              style={{
                position: "absolute",
                left: getAdjustedLeft(
                  e.oneMarkerLeftPosition,
                  Number(e.oneMarkerValue)
                ),
                top: -5,
              }}
            >
              <Text
                text={e.oneMarkerValue?.toString() || ""}
                variant="body"
                size="small"
              />
            </View>
            <View
              style={{
                position: "absolute",
                left: getAdjustedLeft(
                  e.twoMarkerLeftPosition,
                  Number(e.twoMarkerValue)
                ),
                top: -5,
              }}
            >
              <Text
                text={e.twoMarkerValue?.toString() || ""}
                variant="body"
                size="small"
                align="right"
              />
            </View>
          </>
        )}
        allowOverlap={false}
        snapped={true}
        minMarkerOverlapDistance={10}
        markerOffsetY={-2}
      />
    </View>
  );
};
