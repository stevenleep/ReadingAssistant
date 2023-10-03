import "./bookmark.css";

interface BookmarkProps {
    bookmarks: chrome.bookmarks.BookmarkTreeNode[],
    remove?: (id: string) => void,
    update?: (id: string, bookmarkChanges: chrome.bookmarks.BookmarkChangeInfo) => void,
    open?: (bookmark: chrome.bookmarks.BookmarkTreeNode) => void
}

export default function Bookmark(props: BookmarkProps) {
    const { bookmarks, remove, update, open }  = props || {};

    function recursion(bookmark: chrome.bookmarks.BookmarkTreeNode) {
        const values = bookmark.children || [];
        return { values, isRecursion: !!values.length }
    }

    return (
        <div className='bookmark-container'>
            <ul className="bookmarks">
                {bookmarks.map(child => {
                    const result = recursion(child);
                    return (
                        <li key={child.id} className='bookmark-item' onClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            open && open(child);
                        }}>
                            <span>{child.title}</span>
                            { result.isRecursion ? <Bookmark bookmarks={result.values} remove={remove} update={update} open={open} /> : null}
                        </li>
                    )
                })}
            </ul>
        </div>
  )
}
