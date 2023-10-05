import { TabEvents } from "../constant/tab";

export type MessageHandler = Parameters<typeof chrome.runtime.onMessage.addListener>[0];
export type MessageHandlerParameters = Parameters<MessageHandler>;

type MessageKeys = TabEvents | string | null | TabEvents[] | string[];

function isMatched(messageKey: string | TabEvents, userDefineKeys: MessageKeys) {
  const isNull = userDefineKeys === null;
  const keys = Array.isArray(userDefineKeys) ? userDefineKeys : [userDefineKeys];
  return isNull || keys.includes(messageKey);
}

export function addListenerMessage(key: MessageKeys, handler: MessageHandler) {
  function messageHandlerWrapper(...args: Parameters<MessageHandler>) {
    const [message] = args;
    const messageKey = message.type;
    if(isMatched(messageKey, key)) {
      handler(...args);
    };

    return true;
  }

  chrome.runtime.onMessage.addListener(messageHandlerWrapper);

  return () => {
    chrome.runtime.onMessage.removeListener(messageHandlerWrapper);
  }
}
