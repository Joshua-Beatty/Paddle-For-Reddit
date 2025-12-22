import { storage, useStorage } from "@/utils/storage";

const TOKEN_KEY = "token_key";

export function useLoggedIn() {
  return useStorage<boolean>(
    TOKEN_KEY,
    () => (!!storage.getString(TOKEN_KEY))
  );
}

export { TOKEN_KEY };
