import { TabEvents } from "../constant/tab";
import { getTabById, isNewTab } from "../shared/tabs";

chrome.tabs.onActivated.addListener(activeInfo => {
  getTabById(activeInfo.tabId).then(tab => {
    // 激活的是新标签页（使用插件创建的页面），通知刷新该标签页，来保持数据同步
    if (isNewTab(tab) && tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: TabEvents.Refresh });
    }
  });
});

export {}
