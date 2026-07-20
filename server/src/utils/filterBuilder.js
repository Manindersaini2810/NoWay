export const buildPropertyFilter = (query) => {
  const filter = { status: 'active' }
  const {
    propertyType,
    listingType,
    buildingClass,
    city,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    zoning
  } = query

  if (propertyType) filter.propertyType = propertyType
  if (listingType) filter.listingType = listingType
  if (buildingClass) filter['structural.buildingClass'] = buildingClass
  if (city) filter['location.city'] = city
  if (zoning) filter['structural.zoning'] = zoning
  if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) }
  if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) }
  if (minArea) filter['area.totalSqFt'] = { ...filter['area.totalSqFt'], $gte: Number(minArea) }
  if (maxArea) filter['area.totalSqFt'] = { ...filter['area.totalSqFt'], $lte: Number(maxArea) }
  return filter
}

export const buildSavedSearchFilter = (filters) => {
  const query = { status: 'active' }
  if (filters.propertyType) query.propertyType = filters.propertyType
  if (filters.listingType) query.listingType = filters.listingType
  if (filters.city) query['location.city'] = filters.city
  if (filters.minPrice) query.price = { ...query.price, $gte: Number(filters.minPrice) }
  if (filters.maxPrice) query.price = { ...query.price, $lte: Number(filters.maxPrice) }
  return query
}
