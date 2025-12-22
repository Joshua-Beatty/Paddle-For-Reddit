import { useTheme } from "@/utils/hooks/useTheme";
import { Text as RNText, TextProps } from "react-native";

export default function Text({ style, children, ...props }: TextProps) {
  const theme = useTheme();
  return (
    <RNText {...props} style={[{ color: theme.text, fontSize: theme.fontSize }, style]}>
      {children}
    </RNText>
  );
}
