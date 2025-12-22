import { useStorageString } from "@/utils/storage";

const CLIENT_SECRET = "CLIENT_SECRET";
const useClientSecret = () => useStorageString(CLIENT_SECRET);
export { CLIENT_SECRET, useClientSecret };

const TOKEN_KEY = "token_key";
export { TOKEN_KEY };

const THEME_KEY = "theme";
const DEFAULT_THEME = "light";
const useThemeName = () => useStorageString(THEME_KEY, DEFAULT_THEME);
export { THEME_KEY, DEFAULT_THEME, useThemeName };
