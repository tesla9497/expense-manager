import { useState, useEffect } from "react";

export const useContrastTextColor = (color: string) => {
  const [textColor, setTextColor] = useState("#252F2C");

  useEffect(() => {
    const isDarkColor = (hex: string) => {
      if (!hex) return false;
      hex = hex.replace("#", "");
      let r = parseInt(hex.substring(0, 2), 16);
      let g = parseInt(hex.substring(2, 4), 16);
      let b = parseInt(hex.substring(4, 6), 16);

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance < 128;
    };

    if (isDarkColor(color)) {
      setTextColor("#FFFFFE");
    } else {
      setTextColor("#252F2C");
    }
  }, [color]);

  return textColor;
};
