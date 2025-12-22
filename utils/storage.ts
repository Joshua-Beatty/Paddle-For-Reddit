import Constants from 'expo-constants';
import { useSyncExternalStore } from "react";

type Listener = (key: string) => void;

interface StorageLike {
  getString(key: string): string | undefined;
  set(key: string, value: string): void;
  delete(key: string): void;
  addOnValueChangedListener(listener: Listener): { remove: () => void };
}

function createMockStorage(): StorageLike {
  const store = new Map<string, string | boolean>();
  const listeners = new Set<Listener>();

  return {
    getString: (k) => store.get(k) as string,
    set: (k, v) => {
      store.set(k, v);
      listeners.forEach(l => l(k));
    },
    delete: (k) => {
      store.delete(k);
      listeners.forEach(l => l(k));
    },
    addOnValueChangedListener: (listener) => {
      listeners.add(listener);
      return { remove: () => listeners.delete(listener) };
    },
  };
}

let storage: StorageLike;

if (Constants.executionEnvironment === 'storeClient') {
  // ✅ Expo Go → mock only
  storage = createMockStorage();
} else {
  // ✅ Dev client / standalone build → real MMKV
  const { createMMKV } = require('react-native-mmkv');
  storage = createMMKV();
  const thing = createMMKV();
  
}

export { storage };

function subscribe(key: string, callback: () => void) {
  const sub = storage.addOnValueChangedListener((changedKey) => {
    if (changedKey === key) callback();
  });

  return () => sub.remove();
}

export function useStorage<T>(
  key: string,
  get: () => T,
) {
  return useSyncExternalStore(
    (cb) => subscribe(key, cb),
    get
  );
}

