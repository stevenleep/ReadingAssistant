import React, { useEffect } from 'react'
import { useBookmarks } from '../../hooks/useBookmarks'
import Bookmark from './Bookmark'
import { MessageHandlerParameters, addListenerMessage } from '../tab'
import { TabEvents } from '../../constant/tab'

export default function RenderBookmark() {
  const { bookmarks, remove, update, open, refresh } = useBookmarks();
  useEffect(() => {
    return addListenerMessage(TabEvents.Refresh, function (...args: MessageHandlerParameters) {
      refresh()
    })
  }, [])

  return <Bookmark bookmarks={bookmarks} remove={remove} update={update} open={open} />
}
