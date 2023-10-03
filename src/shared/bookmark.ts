export function getBookmarksTree() {
  return chrome.bookmarks.getTree();
}

export function updateBookmark(bookmarkID: string, payload: chrome.bookmarks.BookmarkChangesArg) {
  return chrome.bookmarks.update(bookmarkID, payload);
}

export function removeBookmark(bookmarkID: string) {
 return chrome.bookmarks.remove(bookmarkID)
}
