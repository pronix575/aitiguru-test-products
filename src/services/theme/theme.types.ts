import type { ThemeMode } from "./theme.shared";

export type ThemeContextValue = {
  isDarkTheme: boolean;
  themeMode: ThemeMode;
  setThemeMode: (theme: ThemeMode) => void;
};
