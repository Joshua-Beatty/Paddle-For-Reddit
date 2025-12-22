import Themes from "@/constants/Themes";
import { storage, useStorage } from "@/utils/storage";

const THEME_KEY = "theme";
type ThemeName = keyof typeof Themes;

export function useThemeName() {
  return useStorage<ThemeName>(
    THEME_KEY,
    () => (storage.getString(THEME_KEY) as ThemeName) ?? "light"
  );
}

export function useTheme() {
  const themeName = useThemeName();
  return Themes[themeName];
}

