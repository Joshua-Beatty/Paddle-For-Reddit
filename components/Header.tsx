import { Text } from "@/components/library";
import { useTheme } from "@/utils/hooks/useTheme";

export default function Header({ title }: { title: string }) {
    const theme = useTheme();
    return (
        <Text
            style={{
                fontSize: 35,
                fontWeight: "600",
                backgroundColor: theme.card,
                paddingBottom: 5,
                paddingLeft: 5,
            }}
        >
            {title}
        </Text>
    );
}
