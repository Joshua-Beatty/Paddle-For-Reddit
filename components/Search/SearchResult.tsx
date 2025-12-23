import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, View } from "react-native";
import client from "@/utils/client";
import { useTheme } from "@/utils/hooks/useTheme";
import { Text } from "../library";
import type { SearchResultType } from "./SearchResultInterface";

const FALLBACK_IMAGE =
    "https://redditinc.com/hs-fs/hubfs/Reddit%20Inc/Content/Brand%20Page/Reddit_Logo.png?width=150&height=150&name=Reddit_Logo.png";

export default function SearchResult({ searchTerm }: { searchTerm: string }) {
    const info = useQuery({
        queryKey: ["search", searchTerm],
        queryFn: async () => {
            return await client.get(`/subreddits/search?q=${searchTerm}`);
        },
    });
    const theme = useTheme();

    if (info.isLoading) {
        return <Text>Loading</Text>;
    }
    if (info.isError) {
        return <Text>Errored: {JSON.stringify(info.error)}</Text>;
    }
    const data = info.data?.body as SearchResultType;

    return (
        <FlatList
            data={data.data.children.map((x) => x.data)}
            renderItem={({ item }) => {
                let imageUri = item.icon_img
                    ? item.icon_img
                    : (item.community_icon ?? "").split("?")[0];
                if (imageUri.trim().length === 0) imageUri = FALLBACK_IMAGE;
                return (
                    <View
                        key={item.id}
                        style={{
                            flexDirection: "row",
                            marginVertical: 3,
                            padding: 5,
                            alignItems: "center",
                            gap: 10,
                            backgroundColor: theme.card,
                            borderRadius: 15,
                            borderColor: theme.border,
                            borderWidth: 1,
                        }}
                    >
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={{
                                uri: imageUri,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                alignItems: "flex-start",
                                marginLeft: 8,
                            }}
                        >
                            <Text
                                style={{
                                    flexShrink: 1,
                                }}
                            >
                                {trimTitle(item.title)}
                            </Text>
                            <Text>{item.display_name_prefixed}</Text>
                        </View>
                    </View>
                );
            }}
            keyExtractor={(x) => x.id}
        />
    );
}

function trimTitle(title: string) {
    return title.split("-")[0].split(":")[0].trim();
}
