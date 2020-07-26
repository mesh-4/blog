import { selector } from 'recoil'

import { editorAtom } from './atom'

export const articleEditableState = selector({
  key: 'articleEditableState',
  get: ({ get }) => {
    const article = get(editorAtom)

    if (article.id.length > 0) return true
    return false
  },
})
