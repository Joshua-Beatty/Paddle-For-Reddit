import { CLIENT_SECRET } from "@/constants/storageKeys";
import { getToken, setToken, type Token } from "./hooks/sessionHooks";
import { storage } from "./storage";

export type JSONPrimitive = string | number | boolean | null;

export type JSONValue =
    | JSONPrimitive
    | { [key: string]: JSONValue }
    | JSONValue[];

const client = {
    get: (endpoint: string, headers?: Record<string, string>) =>
        request(endpoint, null, "GET", headers),
    post: (
        endpoint: string,
        body: JSONValue,
        headers?: Record<string, string>,
    ) => request(endpoint, body, "POST", headers),
    patch: (
        endpoint: string,
        body: JSONValue,
        headers?: Record<string, string>,
    ) => request(endpoint, body, "PATCH", headers),
    put: (
        endpoint: string,
        body: JSONValue,
        headers?: Record<string, string>,
    ) => request(endpoint, body, "PUT", headers),
};

export default client;

async function request(
    endpoint: string,
    body: JSONValue,
    method: string,
    headers?: Record<string, string>,
) {
    const url = new URL(endpoint, "https://oauth.reddit.com/api/v1/");
    let token = getToken();
    if (!token.expires_at || token.expires_at > Date.now()) {
        token = await refreshTokenWrapper(token);
    }
    let bodyInit: BodyInit | null = null;
    switch (typeof body) {
        case "string":
            bodyInit = body;
            break;
        case "number":
        case "bigint":
        case "boolean":
            bodyInit = body.toString();
            break;
        case "object":
            bodyInit = JSON.stringify(body);
            break;
        default:
            throw `Unsuported body type: ${typeof body}`;
    }

    const response = await fetch(url.toString(), {
        method: method,
        body: bodyInit,
        headers: {
            Authorization: `bearer ${token.access_token}`,
            ...headers,
        },
    });
    const success = response.status >= 200 && response.status <= 299;
    const resBody = await response.json();
    if (!success) {
        console.error(
            `Failed to make a ${method} request to ${endpoint}\nRequest Body: ${JSON.stringify(body)}\nResponse Body: ${JSON.stringify(resBody)}`,
        );
    }

    return {
        response,
        body: resBody,
        success,
    };
}
export { refreshTokenWrapper };
type fetchingStates =
    | {
          fetching: false;
      }
    | {
          fetching: true;
          fetchPromise: Promise<Token>;
      };

let fetchingState: fetchingStates = { fetching: false };
async function refreshTokenWrapper(token: Token) {
    if (!fetchingState.fetching) {
        fetchingState = {
            fetching: true,
            fetchPromise: refreshToken(token),
        };

        const newToken = await fetchingState.fetchPromise;
        fetchingState = { fetching: false };

        return newToken;
    } else {
        return await fetchingState.fetchPromise;
    }
}

async function refreshToken(token: Token): Promise<Token> {
    const clientSecret = storage.getString(CLIENT_SECRET);
    if (!clientSecret) throw "Client Secret Required to refresh token";
    const response = await fetch(
        `https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=${token.refresh_token}`,
        {
            method: "POST",
            headers: {
                Authorization: `Basic ${btoa(`${clientSecret}:`)}`,
            },
        },
    );

    const body = await response.json();
    if (response.status > 299) {
        console.error(body);
        throw body;
    }

    setToken(body);

    return getToken();
}
