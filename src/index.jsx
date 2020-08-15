import React from 'react'
import { render } from 'react-snapshot'
import 'react-toastify/dist/ReactToastify.css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/analytics'

import './css/main.css'
import { firebaseConfig } from './firebase.config'
import { App } from './App'
import { register } from './serviceWorker'

firebase.initializeApp(firebaseConfig)
firebase.analytics()

render(<App />, document.getElementById('root'))

register()

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
