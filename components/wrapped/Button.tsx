import { Pressable, Text, type TextStyle, type ViewStyle } from "react-native";
import { useTheme } from "@/utils/hooks/useTheme";

type ButtonProps = {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
};

export default function Button({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
}: ButtonProps) {
    const theme = useTheme();
    const styles = {
        base: {
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: theme.primary,
            alignItems: "center",
            justifyContent: "center",
        },
        pressed: {
            opacity: 0.85,
            transform: [{ scale: 0.98 }],
        },
        disabled: {
            backgroundColor: theme.primaryDisabled,
        },
        text: {
            color: "white",
            fontSize: 16,
            fontWeight: "600",
        },
        textDisabled: {
            color: "#ddd",
        },
    };
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            style={({ pressed }) => [
                { marginVertical: 15 },
                styles.base,
                pressed && styles.pressed,
                disabled && styles.disabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    disabled && styles.textDisabled,
                    textStyle,
                ]}
            >
                {title}
            </Text>
        </Pressable>
    );
}
