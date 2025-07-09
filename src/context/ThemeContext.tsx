import React, { createContext, useContext, ReactNode } from "react";
// Theme
import { LightTheme, ThemeType } from "@/theme";

const ThemeContext = createContext<ThemeType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeContext.Provider value={LightTheme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): { Theme: ThemeType } => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { Theme: context };
};
