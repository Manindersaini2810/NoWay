import axiosClient from './axiosClient'
import mockProperties from '../data/mockProperties'

export const propertyApi = {
  // Fetch properties with filters, sorting, and pagination
  async getProperties(params = {}) {
    try {
      const response = await axiosClient.get('/properties', { params })
      if (response.data && response.data.success && response.data.data?.items?.length > 0) {
        return response.data.data
      }
      // If server returns empty list or data format differs, merge server with fallback
      if (response.data?.data?.items) {
        return response.data.data
      }
      return filterLocalMockProperties(params)
    } catch {
      // Backend offline or error -> fallback to rich local dataset
      return filterLocalMockProperties(params)
    }
  },

  // Fetch single property by ID
  async getPropertyById(id) {
    try {
      const response = await axiosClient.get(`/properties/${id}`)
      if (response.data && response.data.success && response.data.data) {
        return response.data.data
      }
    } catch {
      // fallback
    }

    // Lookup in local mock
    const found = mockProperties.find(
      (p) => String(p.id) === String(id) || String(p._id) === String(id)
    )
    if (found) return found
    throw new Error('Property not found')
  },

  // Fetch similar properties
  async getSimilarProperties(id) {
    try {
      const response = await axiosClient.get(`/properties/${id}/similar`)
      if (response.data && response.data.success && response.data.data?.length > 0) {
        return response.data.data
      }
    } catch {
      // fallback
    }

    const current = mockProperties.find(
      (p) => String(p.id) === String(id) || String(p._id) === String(id)
    )
    const type = current?.propertyType?.toLowerCase() || 'office'

    return mockProperties
      .filter(
        (p) =>
          String(p.id) !== String(id) &&
          String(p._id) !== String(id) &&
          (p.propertyType?.toLowerCase() === type || p.listingType === current?.listingType)
      )
      .slice(0, 3)
  },

  // Create property
  async createProperty(propertyData) {
    const isFormData = propertyData instanceof FormData
    const response = await axiosClient.post('/properties', propertyData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    })
    return response.data
  },

  // Update property
  async updateProperty(id, propertyData) {
    const isFormData = propertyData instanceof FormData
    const response = await axiosClient.put(`/properties/${id}`, propertyData, {
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    })
    return response.data
  },

  // Delete property
  async deleteProperty(id) {
    const response = await axiosClient.delete(`/properties/${id}`)
    return response.data
  },
}

function filterLocalMockProperties(params = {}) {
  let list = [...mockProperties]

  // Filter property types
  if (params.propertyType) {
    const types = Array.isArray(params.propertyType)
      ? params.propertyType.map((t) => t.toLowerCase())
      : [params.propertyType.toLowerCase()]
    list = list.filter((p) => types.includes((p.propertyType || '').toLowerCase()))
  }

  // Filter listing type (sale vs lease)
  if (params.listingType && params.listingType !== 'all') {
    list = list.filter(
      (p) => (p.listingType || 'sale').toLowerCase() === params.listingType.toLowerCase()
    )
  }

  // Filter city / location
  if (params.city && params.city !== 'All') {
    list = list.filter(
      (p) =>
        (p.location?.city || p.city || '').toLowerCase() === params.city.toLowerCase()
    )
  }

  // Filter building class
  if (params.buildingClass && params.buildingClass !== 'All') {
    list = list.filter(
      (p) =>
        (p.structural?.buildingClass || p.buildingClass || '').toLowerCase() ===
        params.buildingClass.toLowerCase()
    )
  }

  // Filter search keyword query
  if (params.query || params.search) {
    const q = (params.query || params.search).toLowerCase()
    list = list.filter(
      (p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.location?.city || p.city || '').toLowerCase().includes(q) ||
        (p.location?.state || p.state || '').toLowerCase().includes(q) ||
        (p.propertyType || '').toLowerCase().includes(q)
    )
  }

  // Filter max price
  if (params.maxPrice && Number(params.maxPrice) > 0) {
    list = list.filter((p) => (p.price || 0) <= Number(params.maxPrice))
  }

  // Filter min price
  if (params.minPrice && Number(params.minPrice) > 0) {
    list = list.filter((p) => (p.price || 0) >= Number(params.minPrice))
  }

  // Sort
  if (params.sort) {
    if (params.sort === 'price-asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0))
    } else if (params.sort === 'price-desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0))
    } else if (params.sort === 'area-desc') {
      list.sort(
        (a, b) =>
          (b.area?.totalSqFt || b.area || 0) - (a.area?.totalSqFt || a.area || 0)
      )
    } else {
      // Default: newest / views
      list.sort((a, b) => (b.views || 0) - (a.views || 0))
    }
  }

  const page = Number(params.page || 1)
  const limit = Number(params.limit || 6)
  const total = list.length
  const totalPages = Math.ceil(total / limit)
  const items = list.slice((page - 1) * limit, page * limit)

  return {
    items,
    total,
    page,
    limit,
    totalPages,
  }
}

export default propertyApi
