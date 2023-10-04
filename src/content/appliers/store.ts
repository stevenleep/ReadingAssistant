export const applierStore = new Map();

export function getKeys() {
  return Array.from(applierStore.keys());
}

export function getApplier(name: string) {
  return applierStore.get(name);
}
