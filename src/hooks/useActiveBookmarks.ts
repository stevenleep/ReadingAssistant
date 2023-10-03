import {useState} from "react";

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
