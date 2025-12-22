import { Text as RNText, type TextProps } from "react-native";
import { useTheme } from "@/utils/hooks/useTheme";

export default function Text({ style, children, ...props }: TextProps) {
    const theme = useTheme();
    return (
        <RNText
            {...props}
            style={[{ color: theme.text, fontSize: theme.fontSize }, style]}
        >
            {children}
        </RNText>
    );
}
