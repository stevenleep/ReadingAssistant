import React from 'react'
import { useBookmarks } from "../../hooks/useBookmarks";
import Bookmark from "./Bookmark";

export default function RenderBookmark() {
    const { bookmarks, remove, update, open } = useBookmarks();
    return <Bookmark bookmarks={bookmarks} remove={remove} update={update} open={open} />
}
