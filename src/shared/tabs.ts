export function getAllTabs(tabProperties?: chrome.tabs.QueryInfo, userFilter?: (tab: chrome.tabs.Tab) => boolean) {
  return chrome.tabs.query({ ...tabProperties }).then(tabs => {
    if (userFilter) {
      return tabs.filter(userFilter)
    }
    return tabs
  })
}
