// import { Theme } from '@/constants/Colors';

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useTheme } from "@/utils/hooks/useTheme";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    const theme = useTheme();

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav theme={theme} />;
}

import { DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "react-native";
import type { Theme } from "@/constants/Themes";

function RootLayoutNav({ theme }: { theme: Theme }) {
    const MyTheme: typeof DefaultTheme = {
        ...DefaultTheme,
        dark: theme.dark,
        colors: {
            ...DefaultTheme.colors,
            primary: theme.primary,
            background: theme.background,
            card: theme.card,
            text: theme.text,
            border: theme.border,
            notification: theme.notification,
        },
    };

    return (
        <ThemeProvider value={MyTheme}>
            <StatusBar
                barStyle={theme.dark ? "light-content" : "dark-content"}
            />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: theme.safeAreaColor }}
                edges={["top"]}
            >
                <Stack screenOptions={{ headerShown: false }}></Stack>
            </SafeAreaView>
        </ThemeProvider>
    );
}
