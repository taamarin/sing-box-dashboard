import { useSyncExternalStore } from "react";

import { loadStoredString, saveStoredString } from "../lib/storage";

const PROXY_GRID_KEY = "proxy-grid-3";
const listeners = new Set<() => void>();

function getSnapshot(): boolean {
  return loadStoredString(PROXY_GRID_KEY) === "true";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setProxyThreeColumns(value: boolean) {
  saveStoredString(PROXY_GRID_KEY, value ? "true" : "false");
  listeners.forEach((listener) => listener());
}

export function useProxyThreeColumns(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot);
}
