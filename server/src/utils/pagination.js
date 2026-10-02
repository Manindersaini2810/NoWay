const allowedSortFields = new Set(['createdAt', 'price', 'area.totalSqFt', 'views', 'title'])

export const getPagination = (query) => {
  const requestedPage = Number(query.page || 1)
  const requestedLimit = Number(query.limit || 12)
  if (!Number.isInteger(requestedPage) || requestedPage < 1) {
    const error = new Error('page must be a positive integer')
    error.status = 400
    throw error
  }
  if (!Number.isInteger(requestedLimit) || requestedLimit < 1 || requestedLimit > 100) {
    const error = new Error('limit must be an integer between 1 and 100')
    error.status = 400
    throw error
  }

  const requestedSort = String(query.sort || '-createdAt')
  const descending = requestedSort.startsWith('-')
  const field = descending ? requestedSort.slice(1) : requestedSort
  if (!allowedSortFields.has(field)) {
    const error = new Error(`Unsupported sort field: ${field}`)
    error.status = 400
    throw error
  }
  return {
    page: requestedPage,
    limit: requestedLimit,
    skip: (requestedPage - 1) * requestedLimit,
    sort: { [field]: descending ? -1 : 1 }
  }
}

export const getPaginationResponse = (items, total, page, limit) => ({
  items,
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit)
})
