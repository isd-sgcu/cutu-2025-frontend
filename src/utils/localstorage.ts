export type LocalStorageKey = string;

export function setLocalStorageObj<T>(key: LocalStorageKey, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorageObj<T>(key: string): T | null {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}
