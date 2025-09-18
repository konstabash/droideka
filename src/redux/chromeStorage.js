function makeChromeStorage(area) {
  return {
    getItem: (key) =>
      new Promise((resolve) => {
        area.get([key], (res) => resolve(res[key] ?? null));
      }),
    setItem: (key, value) =>
      new Promise((resolve) => {
        area.set({ [key]: value }, () => resolve());
      }),
    removeItem: (key) =>
      new Promise((resolve) => {
        area.remove([key], () => resolve());
      }),
  };
}

export const chromeLocalStorage = makeChromeStorage(chrome.storage.local);
export const chromeSyncStorage = makeChromeStorage(
  chrome.storage?.sync ?? chrome.storage.local
);
