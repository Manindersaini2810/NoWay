import axiosClient from './axiosClient'

export const authApi = {
  async register(userData) {
    const response = await axiosClient.post('/auth/register', userData)
    if (response.data?.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken)
      if (response.data.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
      }
      if (response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
      }
    }
    return response.data
  },

  async login(credentials) {
    const response = await axiosClient.post('/auth/login', credentials)
    if (response.data?.data?.accessToken) {
      localStorage.setItem('accessToken', response.data.data.accessToken)
      if (response.data.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.data.refreshToken)
      }
      if (response.data.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user))
      }
    }
    return response.data
  },

  async getMe() {
    const response = await axiosClient.get('/users/me')
    return response.data
  },

  logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  },

  getCurrentUser() {
    try {
      const stored = localStorage.getItem('user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  },
}

export default authApi
