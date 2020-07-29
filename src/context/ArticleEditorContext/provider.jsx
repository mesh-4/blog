import React from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'

const defaultState = {
  id: '',
  slug: '',
  cover: '',
  title: '',
  subtitle: '',
  content: '',
  draft: true,
}

export const ArticleEditorContext = React.createContext()

export const ArticleEditorProvider = ({ children }) => {
  const [markdown, updateMarkdown] = useImmer({ ...defaultState })

  return (
    <ArticleEditorContext.Provider value={[markdown, updateMarkdown]}>
      {children}
    </ArticleEditorContext.Provider>
  )
}

ArticleEditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
