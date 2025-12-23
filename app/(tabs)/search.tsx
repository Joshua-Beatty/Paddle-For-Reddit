import { useState } from "react";
import { View } from "react-native";
import Header from "@/components/Header";
import { Button, Text, TextInput } from "@/components/library";
import SearchResult from "@/components/SearchResult";

export default function Search() {
    const [term, setTerm] = useState("");
    const [searching, setSearching] = useState(false);

    return (
        <View style={{ flex: 1, marginBottom: 0 }}>
            <Header title="Search" />
            <View
                style={{
                    flex: 1,
                    marginHorizontal: 10,
                    gap: 5,
                    marginTop: 10,
                }}
            >
                <TextInput
                    value={term}
                    onChangeText={(v) => {
                        setTerm(v);
                        setSearching(false);
                    }}
                    onSubmitEditing={() => {
                        setSearching(true);
                    }}
                />
                {searching && <SearchResult searchTerm={term} />}
            </View>
        </View>
    );
}
