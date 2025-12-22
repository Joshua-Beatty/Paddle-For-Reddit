import { useTheme } from "@/utils/hooks/useTheme";
import { Link as ELink, LinkProps } from "expo-router";

export default function Link({ style, children, ...props }: LinkProps) {
  const theme = useTheme();
  return (
    <ELink
      {...props}
      style={[
        {
          color: theme.primaryLink,
          fontSize: theme.fontSize,
          textDecorationColor: theme.primaryLink,
          textDecorationLine: "underline",
        },
        style,
      ]}
    >
      {children}
    </ELink>
  );
}
