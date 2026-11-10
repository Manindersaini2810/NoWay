import axiosClient, { setAccessToken } from './axiosClient'

export const authApi = {
  async register(userData) {
    const response = await axiosClient.post('/auth/register', userData)
    return response.data
  },

  async verifyEmail({ email, otp }) {
    const response = await axiosClient.post('/auth/verify-email', { email, otp })
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken)
    }
    return response.data
  },

  async resendEmailOtp({ email }) {
    const response = await axiosClient.post('/auth/resend-email-otp', { email })
    return response.data
  },

  async login(credentials) {
    const response = await axiosClient.post('/auth/login', credentials)
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken)
    }
    return response.data
  },

  async verify2FA({ tempToken, otp }) {
    const response = await axiosClient.post('/auth/verify-2fa', { tempToken, otp })
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken)
    }
    return response.data
  },

  async resend2FAOtp({ tempToken }) {
    const response = await axiosClient.post('/auth/resend-2fa-otp', { tempToken })
    return response.data
  },

  async googleSignIn({ credential, role }) {
    const response = await axiosClient.post('/auth/google', { credential, role })
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken)
    }
    return response.data
  },

  async refreshToken() {
    const response = await axiosClient.post('/auth/refresh')
    if (response.data?.accessToken) {
      setAccessToken(response.data.accessToken)
    }
    return response.data
  },

  async logout() {
    try {
      await axiosClient.post('/auth/logout')
    } finally {
      setAccessToken(null)
    }
  },

  async logoutAll() {
    try {
      await axiosClient.post('/auth/logout-all')
    } finally {
      setAccessToken(null)
    }
  },

  async forgotPassword({ email }) {
    const response = await axiosClient.post('/auth/forgot-password', { email })
    return response.data
  },

  async resetPassword({ email, token, newPassword, confirmPassword }) {
    const response = await axiosClient.post('/auth/reset-password', {
      email,
      token,
      newPassword,
      confirmPassword,
    })
    return response.data
  },

  async getMe() {
    const response = await axiosClient.get('/auth/me')
    return response.data
  },
}

export default authApi
