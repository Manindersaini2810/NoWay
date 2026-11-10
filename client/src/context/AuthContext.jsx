import { useState, useEffect } from 'react'
import authApi from '../services/authApi'
import { setAccessToken } from '../services/axiosClient'
import { AuthContext } from './AuthContextInstance'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pendingChallenge, setPendingChallenge] = useState(null) // { tempToken, email, purpose: '2fa' | 'email_verify' }

  // Silent session restoration on initial application load via HttpOnly refresh cookie
  useEffect(() => {
    let isMounted = true

    const runRestore = async () => {
      try {
        const data = await authApi.refreshToken()
        if (isMounted && data?.user) {
          setUser(data.user)
        }
      } catch {
        if (isMounted) {
          setAccessToken(null)
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    runRestore()

    return () => {
      isMounted = false
    }
  }, [])

  // Login handler
  const login = async (credentials) => {
    setPendingChallenge(null)
    const result = await authApi.login(credentials)

    // Check if 2FA challenge is returned
    if (result.requires2FA) {
      setPendingChallenge({
        tempToken: result.tempToken,
        email: result.email || credentials.email,
        purpose: '2fa',
      })
      return { requires2FA: true, tempToken: result.tempToken, email: result.email }
    }

    // Check if unverified email
    if (result.requiresEmailVerification) {
      setPendingChallenge({
        email: result.email || credentials.email,
        purpose: 'email_verify',
      })
      return { requiresEmailVerification: true, email: result.email }
    }

    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  // Register handler
  const register = async (userData) => {
    setPendingChallenge(null)
    const result = await authApi.register(userData)
    setPendingChallenge({
      email: result.email || userData.email,
      purpose: 'email_verify',
    })
    return result
  }

  // Verify Email OTP
  const verifyEmail = async (email, otp) => {
    const result = await authApi.verifyEmail({ email, otp })
    if (result.user) {
      setUser(result.user)
      setPendingChallenge(null)
    }
    return result
  }

  // Verify 2FA Login OTP
  const verify2FA = async (tempToken, otp) => {
    const result = await authApi.verify2FA({ tempToken, otp })
    if (result.user) {
      setUser(result.user)
      setPendingChallenge(null)
    }
    return result
  }

  // Resend OTP
  const resendOTP = async (purpose, identifier) => {
    if (purpose === 'email_verify') {
      return authApi.resendEmailOtp({ email: identifier })
    }
    return authApi.resend2FAOtp({ tempToken: identifier })
  }

  // Google Sign-In
  const googleSignIn = async (credential, role = 'buyer') => {
    setPendingChallenge(null)
    const result = await authApi.googleSignIn({ credential, role })

    if (result.requires2FA) {
      setPendingChallenge({
        tempToken: result.tempToken,
        email: result.email,
        purpose: '2fa',
      })
      return { requires2FA: true, tempToken: result.tempToken, email: result.email }
    }

    if (result.user) {
      setUser(result.user)
    }
    return result
  }

  // Logout
  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      setUser(null)
      setPendingChallenge(null)
      setAccessToken(null)
    }
  }

  // Logout from all devices
  const logoutAll = async () => {
    try {
      await authApi.logoutAll()
    } finally {
      setUser(null)
      setPendingChallenge(null)
      setAccessToken(null)
    }
  }

  const value = {
    user,
    setUser,
    isAuthenticated: Boolean(user),
    isLoading,
    pendingChallenge,
    setPendingChallenge,
    login,
    register,
    verifyEmail,
    verify2FA,
    resendOTP,
    googleSignIn,
    logout,
    logoutAll,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
