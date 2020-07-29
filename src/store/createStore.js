import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { getFirebase } from 'react-redux-firebase'

import { rootReducer } from './reducers'

export function configureStore(initialState = {}) {
  const enhancers = []

  if (window && window.location && window.location.hostname === 'localhost') {
    // eslint-disable-next-line
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const middlewares = [thunk.withExtraArgument(getFirebase)]

  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares), ...enhancers)
  )

  return store
}
