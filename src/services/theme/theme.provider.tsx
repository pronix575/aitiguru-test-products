import {
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeContext } from "./theme.context";
import {
  applyTheme,
  getStoredTheme,
  THEME_STORAGE_KEY,
  type ThemeMode,
} from "./theme.shared";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredTheme);

  useEffect(() => {
    applyTheme(themeMode);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    } catch {
      return;
    }
  }, [themeMode]);

  const value = useMemo(
    () => ({
      isDarkTheme: themeMode === "dark",
      themeMode,
      setThemeMode,
    }),
    [themeMode],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
