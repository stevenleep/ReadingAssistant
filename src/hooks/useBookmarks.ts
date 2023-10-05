import { useEffect, useState } from "react";
import {getBookmarksTree, removeBookmark, updateBookmark} from "../shared/bookmark";
import { seLocalStorageVariable, getLocalStorageVariable } from "../shared/storage";
import { createTab, updateTab } from "../shared/tabs";

export function useBookmarks() {
    const [bookmarks, setBookmarks] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

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
    async function open(bookmark: chrome.bookmarks.BookmarkTreeNode) {
      const targetBookmarkSiteUrl = bookmark.url;
      /**
       * 理论上不会出现这种情况，因为收藏夹中的收藏都是有url的 但是为了防止意外，还是加上这个判断
       */
      if(!targetBookmarkSiteUrl) {
        return;
      }

      // 在当前标签页打开后，会将已开启的标签页的信息缓存到Chrome.storage.local中
      // 如果获取到了缓存的标签页信息，只需要激活对应Tab即可，无需重复创建
      const cacheTabObject = await getLocalStorageVariable(targetBookmarkSiteUrl);
      const cacheTab = cacheTabObject[targetBookmarkSiteUrl] || {};
      console.log('cacheTab', cacheTabObject, cacheTab);

      if(!cacheTab || !cacheTab.id) {
        console.log("没有缓存的标签页信息，创建新的标签页")
        const newTabInfo =  await createTab(targetBookmarkSiteUrl, true);
        await seLocalStorageVariable(targetBookmarkSiteUrl, newTabInfo);
        return;
      }

      console.log('直接激活哦', cacheTab.id);
      await updateTab(cacheTab.id, { active: true });
    }

    return {
        bookmarks,
        update,
        remove,
        getBookmarksTree,
        open,
        refresh: getAllAndUpdateUI,
    };
}
