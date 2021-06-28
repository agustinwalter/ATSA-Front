import React, { useEffect, useState } from 'react'
import Loading from '../screens/Loading'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Login from '../screens/Login'

export const Auth = React.createContext()

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // Check if the user is admin.
        firebase
          .firestore()
          .doc(`users-v2/${user.uid}`)
          .get()
          .then(snap => {
            if (snap.data().admin) {
              setUser(user)
            } else {
              firebase.auth().signOut()
            }
            setShowChild(true)
          })
      } else {
        setUser(null)
        setShowChild(true)
      }
    })
  }, [])

  if (!showChild) {
    return <Loading />
  } else if (user == null) {
    return <Login />
  } else {
    return <Auth.Provider value={{ user }}>{children}</Auth.Provider>
  }
}
