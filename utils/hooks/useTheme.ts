import { useEffect } from "react";
import { DEFAULT_THEME, useThemeName } from "@/constants/storageKeys";
import Themes from "@/constants/Themes";

export function useTheme() {
    const [themeName, setThemeName] = useThemeName();
    useEffect(() => {
        if (!(themeName in Themes)) {
            setThemeName(DEFAULT_THEME);
        }
    }, [themeName, setThemeName]);
    if (themeName && themeName in Themes) {
        return Themes[themeName as keyof typeof Themes];
    }
    return Themes[DEFAULT_THEME];
}
