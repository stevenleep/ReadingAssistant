export function getAllTabs(tabProperties?: chrome.tabs.QueryInfo, userFilter?: (tab: chrome.tabs.Tab) => boolean) {
  return chrome.tabs.query({ ...tabProperties }).then(tabs => {
    if (userFilter) {
      return tabs.filter(userFilter)
    }
    return tabs
  })
}

export function getActiveTab(): Promise<chrome.tabs.Tab[]> {
  return chrome.tabs.query({ active: true, currentWindow: true });
}

export function getTabById(tabId: number): Promise<chrome.tabs.Tab> {
  return chrome.tabs.get(tabId);
}

export function isNewTab(tab: chrome.tabs.Tab): boolean {
  return tab.url === 'chrome://newtab/'
}
