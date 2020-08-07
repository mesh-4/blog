import React from 'react'
import PropTypes from 'prop-types'
import { useImmer } from 'use-immer'

export const ArticleEditorContext = React.createContext(null)

export const ArticleEditorProvider = ({ children }) => {
  const [markdown, updateMarkdown] = useImmer({
    id: '',
    slug: '',
    cover: '',
    title: '',
    subtitle: '',
    content: '',
    draft: true,
  })

  return (
    <ArticleEditorContext.Provider value={[markdown, updateMarkdown]}>
      {children}
    </ArticleEditorContext.Provider>
  )
}

ArticleEditorProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
