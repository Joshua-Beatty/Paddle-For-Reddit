import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Link, Text, TextInput } from "@/components/library";
import { useClientSecret } from "@/constants/storageKeys";
import { useLoggedIn, useSignIn } from "@/utils/hooks/sessionHooks";

export default function SignInScreen() {
    const [link, setLink] = useState("");
    const [clientSecret, setClientSecret] = useClientSecret();
    const loggedIn = useLoggedIn();
    const signIn = useSignIn();
    const [error, setError] = useState("");
    useEffect(() => {
        if (loggedIn) {
            router.navigate("/");
        }
    }, [loggedIn]);

    async function attemptSignIn() {
        const res = await signIn(link);
        if (!res.success) {
            setError(`Failed to sign in, view debug logs: ${res.error}`);
        }
    }

    return (
        <View>
            <Header title="Sign In" />
            <View style={{ paddingHorizontal: 10 }}>
                <Text>Start by importing your client secret</Text>
                <TextInput
                    value={clientSecret}
                    onChangeText={(v) => setClientSecret(v)}
                    placeholder="abcdefghijklm"
                    multiline={false}
                    textAlignVertical="center"
                />
                {clientSecret && (
                    <>
                        <Text>
                            <Link
                                href={`https://www.reddit.com/api/v1/authorize?client_id=${clientSecret}&response_type=code&duration=permanent&state=12345&redirect_uri=http://example.com&scope=identity%20edit%20flair%20history%20modconfig%20modflair%20modlog%20modposts%20modwiki%20mysubreddits%20privatemessages%20read%20report%20save%20submit%20subscribe%20vote%20wikiedit%20wikiread`}
                            >
                                Then click here to authorize the application
                            </Link>
                        </Text>
                        <Text>And then paste your redirect link here:</Text>
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
                    </>
                )}
                {!!error && <Text>{error}</Text>}
            </View>
        </View>
    );
}
