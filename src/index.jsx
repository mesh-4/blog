import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { ToastContainer } from 'react-toastify'

import './css/reset.css'
import 'react-toastify/dist/ReactToastify.css'
import { firebaseConfig } from './firebase.config'
import { rootReducer } from './store/reducers'
import App from './App'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        newestOnTop={false}
        autoClose={3000}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        pauseOnFocusLoss
      />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)
