import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/analytics'

import { RecoilRoot } from 'recoil'
import { Provider } from 'react-redux'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'

import './styles.css'
import './css/markdown.css'
import 'react-toastify/dist/ReactToastify.css'
import { firebaseConfig } from './firebase.config'
import { configureStore } from './store/createStore'
import App from './App'

firebase.initializeApp(firebaseConfig)
firebase.analytics()
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

ReactDOM.render(
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

// eslint-disable-next-line
window.isUpdateAvailable = new Promise((resolve, reject) => {
  // lazy way of disabling service workers while developing
  if (
    'serviceWorker' in navigator &&
    ['localhost', '127'].indexOf(window.location.hostname) === -1
  ) {
    window.addEventListener('load', () => {
      // register service worker file
      navigator.serviceWorker
        .register('/sw.js')
        .then(reg => {
          reg.onupdatefound = () => {
            const installingWorker = reg.installing
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            }
          }
        })
        .catch(err => {
          // eslint-disable-next-line
          console.error('[SW ERROR]', err)
        })
    })
  }
})
