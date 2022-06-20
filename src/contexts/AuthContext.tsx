import React, { useContext, useEffect, useState, createContext } from 'react'
import firebase from 'firebase/compat/app'
import { auth, FirebaseUser } from '../firebase'

interface DefaultStateTypes {
  currentUser: FirebaseUser | null,
  signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>
}

interface AuthProviderType {
  children: React.ReactNode
}

const signUp = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password)
}

const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password)
}

const logout = () => {
  return auth.signOut()
}

const resetPassword = (email: string) => {
  return auth.sendPasswordResetEmail(email)
}

const AuthContext = createContext<DefaultStateTypes>({
  signUp,
  login,
  logout,
  resetPassword,
  currentUser: null,
})

const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user: FirebaseUser | null) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return () => unsubscribeAuth()
  }, [])

  const value = {
    signUp,
    login,
    logout,
    resetPassword,
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  return useContext(AuthContext)
}

export default AuthProvider
