import { useTheme } from "@/utils/hooks/useTheme";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

export default function TextInput({ style, children, ...props }: TextInputProps) {
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
          borderRadius: 12
        },
        style,
      ]}
    >
      {children}
    </RNTextInput>
  );
}
