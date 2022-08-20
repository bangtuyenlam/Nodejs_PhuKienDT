import React, { useState, createContext, useContext } from 'react'
import { getToken, getUser, removeUserSession, setUserSession } from './Common' 
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = () => {
    setUser(getUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ getUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}