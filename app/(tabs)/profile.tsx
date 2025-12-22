import { router } from "expo-router";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button } from "@/components/library";
import { TOKEN_KEY } from "@/constants/storageKeys";
import { getToken } from "@/utils/hooks/sessionHooks";
import { storage } from "@/utils/storage";

export default function Profile() {
    const token = getToken();
    function logOut() {
        storage.remove(TOKEN_KEY);
        router.navigate("/");
    }
    console.log(token);

    return (
        <View>
            <Header title="Profile" />
            <Button title="Log Out" onPress={logOut}></Button>
        </View>
    );
}
