import { TextInput as RNTextInput, type TextInputProps } from "react-native";
import { useTheme } from "@/utils/hooks/useTheme";

export default function TextInput({
    style,
    children,
    ...props
}: TextInputProps) {
    const theme = useTheme();
    return (
        <RNTextInput
            placeholderTextColor={theme.textFaded}
            {...props}
            style={[
                {
                    color: theme.text,
                    fontSize: theme.fontSize,
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                    borderWidth: 1,
                    borderRadius: 12,
                },
                style,
            ]}
        >
            {children}
        </RNTextInput>
    );
}
