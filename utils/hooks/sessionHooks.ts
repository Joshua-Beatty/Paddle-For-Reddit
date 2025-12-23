import { useCallback } from "react";
import * as z from "zod/mini";
import { TOKEN_KEY, useClientSecret } from "@/constants/storageKeys";
import { storage, useStorageString } from "@/utils/storage";

export function useLoggedIn() {
    const [loggedIn, _setLoggedIn] = useStorageString(TOKEN_KEY);
    return !!loggedIn;
}
const TokenSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
    expires_at: z.number(),
    refresh_token: z.string(),
    scope: z.string(),
    token_type: z.literal("bearer"),
});

export type Token = z.infer<typeof TokenSchema>;

export function getToken() {
    return TokenSchema.parse(JSON.parse(storage.getString(TOKEN_KEY) ?? ""));
}
export function setToken(newToken: Token) {
    if (newToken.expires_in && !newToken.expires_at)
        newToken.expires_at = +new Date() + newToken.expires_in * 1000 * 0.9;
    try {
        storage.set(TOKEN_KEY, JSON.stringify(TokenSchema.parse(newToken)));
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export function useToken() {
    const [tokenString, setTokenString] = useStorageString(TOKEN_KEY);

    let parsedToken: Token | null = null;

    if (tokenString) {
        try {
            const json = JSON.parse(tokenString);
            if (!json.expires_at) json.expires_at == 0;
            const result = TokenSchema.safeParse(json);

            if (result.success) {
                parsedToken = result.data;
            }
        } catch (e) {
            console.error(e);
        }
    }

    return [
        parsedToken,
        (newToken: Token) => {
            setToken(newToken);
        },
    ] as const;
}

export function useSignIn() {
    const [clientSecret] = useClientSecret();

    return useCallback(
        async (redirectLink: string) => {
            const url = new URL(redirectLink);
            const code = url.searchParams.get("code");
            const response = await fetch(
                `https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=${code}&redirect_uri=http://example.com`,
                {
                    method: "POST",
                    headers: {
                        Authorization: "Basic " + btoa(`${clientSecret}:`),
                    },
                },
            );
            const body = await response.json();
            try {
                setToken(body as any);
                return { success: true };
            } catch (e) {
                return { success: false, error: `${e}` };
            }
        },
        [clientSecret],
    );
}
