import { TabEvents } from "../constant/tab";
import { getTabById, isNewTab } from "../shared/tabs";
import {clearLocalStorage, getLocalStorageVariable} from "../shared/storage";

chrome.tabs.onActivated.addListener(activeInfo => {
  getTabById(activeInfo.tabId).then(tab => {
    // 激活的是新标签页（使用插件创建的页面），通知刷新该标签页，来保持数据同步
    if (isNewTab(tab) && tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: TabEvents.Refresh });
    }
  });
});

let cacheTabs: { [key: string]: chrome.tabs.Tab } = {};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId && tab.url) {
    cacheTabs[tabId] = tab;
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  const targetTab = cacheTabs[tabId] as chrome.tabs.Tab;
  if(targetTab && targetTab.url) {
    getLocalStorageVariable(targetTab.url).then(tabInfo => {
      const tabValue = tabInfo[targetTab.url!];
      if(tabValue && tabValue.id === targetTab.id) {
        chrome.storage.local.remove(targetTab.url!);
      }
    });
  }
  delete cacheTabs[tabId];
});

export {}
