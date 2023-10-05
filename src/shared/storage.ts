export function seLocalStorageVariable(key: string, value: any) {
 return chrome.storage.local.set({ [key]: value });
}

export function getLocalStorageVariable(key: string) {
  return chrome.storage.local.get(key);
}

export function removeLocalStorageVariable(key: string) {
  return chrome.storage.local.remove(key);
}

export function clearLocalStorage() {
  return chrome.storage.local.clear();
}

export function getLocalStorageBytesInUse() {
  return chrome.storage.local.getBytesInUse();
}
