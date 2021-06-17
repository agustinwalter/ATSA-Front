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
      setUser(user)
      setShowChild(true)
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
