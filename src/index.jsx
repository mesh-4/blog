import React from 'react'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from 'react-toastify'

import './css/reset.css'
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseProvider } from '@/components/FirebaseProvider'
import App from './App'

render(
  <RecoilRoot>
    <FirebaseProvider>
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
    </FirebaseProvider>
  </RecoilRoot>,
  document.getElementById('root')
)
