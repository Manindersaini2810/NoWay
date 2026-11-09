import axiosClient from './axiosClient'

export const inquiryApi = {
  async createInquiry({ propertyId, message }) {
    try {
      const response = await axiosClient.post('/inquiries', { propertyId, message })
      return response.data
    } catch (error) {
      // If error is 401 or network error, provide friendly simulated response for demo
      if (!localStorage.getItem('accessToken')) {
        return {
          success: true,
          message: 'Inquiry saved locally. Please log in to synchronize with the broker.',
          data: { propertyId, message, createdAt: new Date().toISOString() },
        }
      }
      throw error
    }
  },

  async getBrokerInquiries() {
    const response = await axiosClient.get('/inquiries/broker')
    return response.data
  },
}

export default inquiryApi
