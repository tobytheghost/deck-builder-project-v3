import React, { useContext, useEffect, useState, createContext } from 'react'
import { auth, FirebaseUser, UserCredential } from '../firebase'
import nookies from 'nookies'

interface AuthStateTypes {
  currentUser: FirebaseUser | null
  signUp: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
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

const AuthContext = createContext<AuthStateTypes>({
  signUp,
  login,
  logout,
  resetPassword,
  currentUser: null
})

const AuthProvider = ({ children }: AuthProviderType) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (user: FirebaseUser | null) => {
        if (!user) {
          setCurrentUser(null)
          setIsLoading(false)
          nookies.set(undefined, 'token', '', { path: '/' })
        } else {
          const token = await user.getIdToken()
          setCurrentUser(user)
          setIsLoading(false)
          nookies.set(undefined, 'token', token, { path: '/' })
        }
      }
    )
    return () => unsubscribeAuth()
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
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
