import React from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

import { firebaseConfig } from '@/firebase.config'
import { LoadingScreen } from './LoadingScreen'

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = firebase.storage()
export const firestore = firebase.firestore()

const FirebaseContext = React.createContext()

export function useFirebase() {
  return React.useContext(FirebaseContext)
}

export function FirebaseProvider({ children }) {
  const [user, loading] = useAuthState(auth)

  if (loading) return <LoadingScreen />
  return (
    <FirebaseContext.Provider value={{ user }}>
      {children}
    </FirebaseContext.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
