import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  Hits,
  connectHighlight,
  connectSearchBox,
} from 'react-instantsearch-dom'
import { IconButton, TextField, InputAdornment } from '@material-ui/core'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'

import './index.css'

const searchClient = algoliasearch(
  'GV78YA2IS9',
  'ac4ebfe730f698888894d8767ce8d3c3'
)

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => (
  <div>
    <TextField
      fullWidth
      autoFocus
      size="small"
      color="primary"
      variant="outlined"
      helperText="Search by Algolia"
      label="Search article(s)"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
      InputProps={{
        className: 'ais-custom-input',
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              title="Reset Query"
              aria-label="reset search query"
              onClick={() => refine('')}
            >
              <RotateLeftIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />

    {isSearchStalled ? 'My search is stalled' : ''}
  </div>
)

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  isSearchStalled: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
}

const CustomSearchBox = connectSearchBox(SearchBox)

const CustomHighlight = connectHighlight(({ highlight, attribute, hit }) => {
  const parsedHit = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  })

  return (
    <Link
      to={`/article/${hit.slug}`}
      style={{ fontSize: '18px', fontWeight: 600, marginBottom: '1em' }}
    >
      {parsedHit.map(part =>
        part.isHighlighted ? <mark>{part.value}</mark> : part.value
      )}
    </Link>
  )
})

// eslint-disable-next-line
const Hit = ({ hit }) => (
  <p>
    <CustomHighlight attribute="title" hit={hit} />
  </p>
)

export function SearchInput() {
  return (
    <InstantSearch
      indexName="articles"
      searchClient={searchClient}
      stalledSearchDelay={500}
    >
      <CustomSearchBox />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  )
}
