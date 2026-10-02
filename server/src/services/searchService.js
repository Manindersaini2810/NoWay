const positiveNumber = (value, field) => {
  if (value === undefined || value === '') return undefined
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0) {
    const error = new Error(`${field} must be a non-negative number`)
    error.status = 400
    throw error
  }
  return number
}

export const buildPropertyFilter = (query) => {
  const filter = { status: 'active' }
  const equalityFilters = {
    propertyType: 'propertyType',
    listingType: 'listingType',
    buildingClass: 'structural.buildingClass',
    city: 'location.city',
    zoning: 'structural.zoning'
  }
  for (const [parameter, field] of Object.entries(equalityFilters)) {
    if (query[parameter]) filter[field] = query[parameter]
  }

  const minPrice = positiveNumber(query.minPrice, 'minPrice')
  const maxPrice = positiveNumber(query.maxPrice, 'maxPrice')
  const minArea = positiveNumber(query.minArea, 'minArea')
  const maxArea = positiveNumber(query.maxArea, 'maxArea')
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {}
    if (minPrice !== undefined) filter.price.$gte = minPrice
    if (maxPrice !== undefined) filter.price.$lte = maxPrice
  }
  if (minArea !== undefined || maxArea !== undefined) {
    filter['area.totalSqFt'] = {}
    if (minArea !== undefined) filter['area.totalSqFt'].$gte = minArea
    if (maxArea !== undefined) filter['area.totalSqFt'].$lte = maxArea
  }
  return filter
}
