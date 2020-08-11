import React from 'react'
import ReactDOM from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/analytics'

import { RecoilRoot } from 'recoil'

import './main.css'
import 'react-toastify/dist/ReactToastify.css'
import { firebaseConfig } from './firebase.config'
import App from './App'

firebase.initializeApp(firebaseConfig)
firebase.storage()
firebase.firestore()
firebase.analytics()

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
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
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
)

/*
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
*/
