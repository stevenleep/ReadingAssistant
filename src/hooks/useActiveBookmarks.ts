/**
 * useActiveBookmarks hook
 * 在内存中保存当前活动的书签
 *
 * @deprecated 该 hook 在使用过程中发现了一些问题，已经不再使用
 * 1. 无法在多个页面中共享数据
 */

import { useState } from "react";

export interface ActiveBookmark extends chrome.tabs.Tab {
    [key: string]: any;
}

export type ActiveBookmarkMaps = Record<string, ActiveBookmark>

export default function useActiveBookmarks(initialState: ActiveBookmarkMaps) {
    const [actives, setActiveBookmarks] = useState<ActiveBookmarkMaps>(initialState);

    function set(id: string, value: ActiveBookmark) {
        setActiveBookmarks(originalState => {
            return { ...originalState, [id]: value };
        })
    }

    function get(id: string): ActiveBookmark | undefined {
        return Reflect.get(actives, id) || undefined;
    }

    function has(id: string) {
        return get(id) !== undefined
    }

    return {
        actives,
        set,
        get,
        has,
    }
}
