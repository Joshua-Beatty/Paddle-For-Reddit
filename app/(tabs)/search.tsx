import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Text, TextInput } from "@/components/library";
import SearchResult from "@/components/SearchResult";
import { useThemeName } from "@/constants/storageKeys";
import { refreshTokenWrapper } from "@/utils/client";
import { getToken, useLoggedIn, useToken } from "@/utils/hooks/sessionHooks";

export default function Search() {
    const [term, setTerm] = useState("");
    const [searching, setSearching] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <Header title="Search" />
            <View style={{ marginHorizontal: 10, gap: 10, marginTop: 10 }}>
                <TextInput
                    value={term}
                    onChangeText={(v) => {
                        setTerm(v);
                        setSearching(false);
                    }}
                />
                <Button
                    title="search"
                    onPress={() => {
                        setSearching(true);
                    }}
                />
                {searching && <SearchResult searchTerm={term} />}
            </View>
            <Text>hello!</Text>
        </View>
    );
}
