import React from 'react'
import PropTypes from 'prop-types'

import { ArticlePublishList } from './components/Publish'
import { ArticleRecommandList } from './components/Recommand'

export function ArticleList({ type }) {
  return (
    <ul className="list-none p-0">
      {type === 'publish' && <ArticlePublishList />}
      {type === 'recommand' && <ArticleRecommandList />}
    </ul>
  )
}

ArticleList.propTypes = {
  type: PropTypes.string.isRequired,
}
