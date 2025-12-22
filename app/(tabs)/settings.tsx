import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Text } from "@/components/library";
import { useThemeName } from "@/constants/storageKeys";

export default function Settings() {
    const [themeName, setTheme] = useThemeName();
    const isDark = themeName === "dark";

    function changeTheme() {
        setTheme(isDark ? "light" : "dark");
    }

    return (
        <View>
            <Header title="Settings" />
            <Button
                title={`Switch to ${isDark ? "light" : "dark"} theme`}
                onPress={changeTheme}
            ></Button>
        </View>
    );
}
