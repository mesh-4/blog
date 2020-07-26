import { atom } from 'recoil'

export const themeAtom = atom({
  key: 'theme',
  default: 'dark',
})

export const playerAtom = atom({
  key: 'audio-player',
  default: {
    title: '',
    url: '',
  },
})

export const editorAtom = atom({
  key: 'markdown-editor',
  default: {
    id: '',
    slug: '',
    cover: '',
    title: '',
    subtitle: '',
    content: '',
    draft: true,
  },
})
