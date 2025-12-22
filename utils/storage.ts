import { useSyncExternalStore } from "react";
import { createMMKV } from "react-native-mmkv";

const storage = createMMKV();

export { storage };

function subscribe(key: string, callback: () => void) {
    const sub = storage.addOnValueChangedListener((changedKey) => {
        if (changedKey === key) callback();
    });

    return () => sub.remove();
}

export function useStorageString(key: string, fallback?: string) {
    return [
        useSyncExternalStore(
            (cb) => subscribe(key, cb),
            () => storage.getString(key) ?? fallback ?? "",
        ),
        (value: string) => {
            storage.set(key, value);
        },
    ] as const;
}
