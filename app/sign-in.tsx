import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Link, Text, TextInput } from "@/components/library";
import { TOKEN_KEY } from "@/utils/hooks/useLoggedIn";
import { storage } from "@/utils/storage";

export default function SignInScreen() {
    const [link, setLink] = useState("");

    function attemptSignIn() {
        storage.set(TOKEN_KEY, link);
        router.replace("/");
    }

    return (
        <View>
            <Header title="Sign In" />
            <View style={{ paddingHorizontal: 10 }}>
                <Text>
                    Click here:{" "}
                    <Link href="https://www.example.com">Hello!</Link>
                </Text>
                <Text>Paste your redirect link here:</Text>
                <TextInput
                    value={link}
                    onChangeText={(v) => setLink(v)}
                    placeholder="http://localhost:3232?state=12345&code="
                    multiline={false}
                    textAlignVertical="center"
                />
                <Button
                    title="Log In"
                    onPress={attemptSignIn}
                    disabled={link.length < 6}
                />
            </View>
        </View>
    );
}
