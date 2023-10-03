import { useEffect, useState } from "react";
import {getBookmarksTree, removeBookmark, updateBookmark} from "../shared/bookmark";
import useActiveBookmarks from "./useActiveBookmarks";

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);
    const { set, get } = useActiveBookmarks({});

    useEffect(() => {
        getAllAndUpdateUI();
    }, []);

    function getAllAndUpdateUI() {
       return getBookmarksTree().then((bookmarks) => {
           const rootChildren = bookmarks[0].children;
           if(Array.isArray(rootChildren) && rootChildren.length) {
               return setBookmarks(rootChildren);
           }
           setBookmarks([]);
           return bookmarks;
       });
    }

    function update(bookmarkID: string, payload: chrome.bookmarks.BookmarkChangesArg) {
      return updateBookmark(bookmarkID, payload).then((bookmarks) => {
            getAllAndUpdateUI();
            return bookmarks;
        })
    }

    function remove(bookmarkID: string) {
      return removeBookmark(bookmarkID).then((bookmarks) => {
            getAllAndUpdateUI();
            return bookmarks;
      })
    }

    /**
     * FIXME: 开启新的标签页的情况下，如果点击的收藏已经被打开，应该切换到已经打开的标签页
     *        当前由于激活的tabID和tab信息存储在React.useState中, 相同newtab未共享
     * @param bookmark
     */
    function open(bookmark: chrome.bookmarks.BookmarkTreeNode) {
        const bookmarkUrl = bookmark.url;
        if (bookmarkUrl) {
            const tab = get(bookmarkUrl);
            if(tab && tab.id) {
                chrome.tabs.update(tab.id, { active: true })
                    // 未找到tab时，创建新的tab
                    // 错误时也尝试创建新的tab
                    .catch(
                        (error) => {
                            chrome.tabs.create({ url: bookmarkUrl, active: true }).then(tab => {
                                set(bookmarkUrl, tab);
                            });
                        }
                );
                return;
            } else {
                chrome.tabs.create({ url: bookmarkUrl, active: true }).then(tab => {
                    set(bookmarkUrl, tab);
                })
            }
        }
    }

    return {
        bookmarks,
        update,
        remove,
        getBookmarksTree,
        open,
    };
}
