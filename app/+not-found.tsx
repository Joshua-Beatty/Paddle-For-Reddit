import { Stack } from "expo-router";
import { View } from "react-native";
import { Link, Text } from "@/components/library";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View>
                <Text>This screen doesn't exist.</Text>

                <Link href="/">
                    <Text>Go to home screen!</Text>
                </Link>
            </View>
        </>
    );
}
