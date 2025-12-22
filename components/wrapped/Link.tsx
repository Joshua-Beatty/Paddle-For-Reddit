import { Link as ELink, type LinkProps } from "expo-router";
import { useTheme } from "@/utils/hooks/useTheme";

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
