import React from "react";
import { View, Keyboard, Pressable, ViewStyle } from "react-native";
import DatePicker from "react-native-date-picker";
// Components
import { Input } from "./Input";
import { useTheme } from "@/context";
import { DatePickerProps } from "@/types/components.core";

export const DatePick: React.FC<
  DatePickerProps & React.ComponentProps<typeof Input>
> = ({ date, onDateChange, minDate, maxDate, dateContainerStyle, ...rest }) => {
  const { Theme } = useTheme();

  const [showPicker, setShowPicker] = React.useState(false);

  const handleOutsidePress = () => {
    setShowPicker(false);
    Keyboard.dismiss();
  };

  return (
    <Pressable style={dateContainerStyle} onPress={handleOutsidePress}>
      <View style={{ position: "relative" }}>
        <Input
          onTouchEnd={() => setShowPicker(!showPicker)}
          {...rest}
          value={date.toLocaleDateString()}
          editable={false}
          textStyle={{ color: Theme.color.text.primary.default }}
        />
        {showPicker && (
          <DatePicker
            mode="date"
            minimumDate={minDate}
            maximumDate={maxDate}
            date={date}
            onDateChange={onDateChange}
            theme="light"
          />
        )}
      </View>
    </Pressable>
  );
};
