import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { adminAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helper function to decode JWT and check expiration
  const isTokenExpired = useCallback((token) => {
    if (!token) return true
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp < currentTime
    } catch (error) {
      return true
    }
  }, [])

  // Auto-logout when token expires
  const checkTokenExpiration = useCallback(() => {
    if (token && isTokenExpired(token)) {
      logout()
    }
  }, [token, isTokenExpired])

  // Check token expiration every minute
  useEffect(() => {
    const interval = setInterval(checkTokenExpiration, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [checkTokenExpiration])

  useEffect(() => {
    // Check for stored auth data on app load
    const storedToken = localStorage.getItem('adminToken')
    const storedUser = localStorage.getItem('adminUser')
    
    if (storedToken && storedUser) {
      // Check if token is still valid
      if (!isTokenExpired(storedToken)) {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } else {
        // Token expired, clear storage
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
      }
    }
    
    setLoading(false)
  }, [isTokenExpired])

  const login = async (username, password) => {
    try {
      const response = await adminAPI.login(username, password)
      const { token: newToken, admin } = response
      
      setToken(newToken)
      setUser(admin)
      
      // Store in localStorage
      localStorage.setItem('adminToken', newToken)
      localStorage.setItem('adminUser', JSON.stringify(admin))
      
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
  }

  const value = {
    user,
    token,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}