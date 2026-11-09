import axiosClient from './axiosClient'

export const userApi = {
  async getFavorites() {
    try {
      const response = await axiosClient.get('/users/me/favorites')
      return response.data?.data || []
    } catch {
      // Fallback to local storage favorites
      try {
        const stored = localStorage.getItem('local_favorites')
        return stored ? JSON.parse(stored) : []
      } catch {
        return []
      }
    }
  },

  async addFavorite(propertyId) {
    try {
      const response = await axiosClient.post(`/users/me/favorites/${propertyId}`)
      return response.data
    } catch {
      // Local fallback
      try {
        const stored = JSON.parse(localStorage.getItem('local_favorites') || '[]')
        if (!stored.includes(propertyId)) {
          stored.push(propertyId)
          localStorage.setItem('local_favorites', JSON.stringify(stored))
        }
      } catch {
        // ignore
      }
      return { success: true }
    }
  },

  async removeFavorite(propertyId) {
    try {
      const response = await axiosClient.delete(`/users/me/favorites/${propertyId}`)
      return response.data
    } catch {
      // Local fallback
      try {
        let stored = JSON.parse(localStorage.getItem('local_favorites') || '[]')
        stored = stored.filter((id) => id !== propertyId)
        localStorage.setItem('local_favorites', JSON.stringify(stored))
      } catch {
        // ignore
      }
      return { success: true }
    }
  },
}

export default userApi
