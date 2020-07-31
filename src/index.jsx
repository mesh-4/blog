import React from 'react'
import { render } from 'react-dom'
import { ToastContainer } from 'react-toastify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'

import { RecoilRoot } from 'recoil'
import { Provider } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import './css/reset.css'
import './css/markdown.css'
import 'react-toastify/dist/ReactToastify.css'
import { firebaseConfig } from './firebase.config'
import { configureStore } from './store/createStore'
import App from './App'

firebase.initializeApp(firebaseConfig)
firebase.firestore()

// eslint-disable-next-line
const initialState = window && window.__INITIAL_STATE__
const store = configureStore(initialState)

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
}

render(
  <RecoilRoot>
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
    </Provider>
  </RecoilRoot>,
  document.getElementById('root')
)
