const mockProperties = [
  {
    id: 1,
    title: 'Harbor Point Tower',
    price: 2850000,
    area: 18200,
    city: 'Seattle',
    propertyType: 'Office',
    buildingClass: 'Class A',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A premium mixed-use office tower in the heart of downtown with flexible floor plans and premium amenities.',
    specs: {
      yearBuilt: 2019,
      floors: 22,
      ceilingHeight: '12 ft',
      parking: '320 spaces',
      zoning: 'Commercial Mixed Use',
      occupancy: 'Leased'
    }
  },
  {
    id: 2,
    title: 'North Market Retail Plaza',
    price: 1280000,
    area: 9600,
    city: 'Austin',
    propertyType: 'Retail',
    buildingClass: 'Class B',
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-footfall retail center with anchor tenants and excellent frontage along a major commuter route.',
    specs: {
      yearBuilt: 2011,
      floors: 2,
      ceilingHeight: '14 ft',
      parking: '110 spaces',
      zoning: 'Retail Corridor',
      occupancy: 'Partially Leased'
    }
  },
  {
    id: 3,
    title: 'Summit Logistics Hub',
    price: 2140000,
    area: 24800,
    city: 'Denver',
    propertyType: 'Warehouse',
    buildingClass: 'Class A',
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565610222536-ef2f3f5f8f31?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'State-of-the-art fulfillment warehouse with clear heights, dock doors, and modern security systems.',
    specs: {
      yearBuilt: 2020,
      floors: 1,
      ceilingHeight: '32 ft',
      parking: '90 spaces',
      zoning: 'Industrial Flex',
      occupancy: 'Vacant'
    }
  },
  {
    id: 4,
    title: 'Cedar Industrial Plaza',
    price: 1650000,
    area: 15600,
    city: 'Phoenix',
    propertyType: 'Industrial',
    buildingClass: 'Class B',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Flexible industrial space suited for manufacturing, storage, and distribution operations.',
    specs: {
      yearBuilt: 2008,
      floors: 1,
      ceilingHeight: '24 ft',
      parking: '70 spaces',
      zoning: 'Light Industrial',
      occupancy: 'Occupied'
    }
  },
  {
    id: 5,
    title: 'Union Square Offices',
    price: 3320000,
    area: 21400,
    city: 'Chicago',
    propertyType: 'Office',
    buildingClass: 'Class A',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A contemporary office asset with panoramic views, smart building systems, and executive suites.',
    specs: {
      yearBuilt: 2017,
      floors: 18,
      ceilingHeight: '11 ft',
      parking: '250 spaces',
      zoning: 'Downtown Office',
      occupancy: 'Leased'
    }
  },
  {
    id: 6,
    title: 'Riverfront Retail Lofts',
    price: 990000,
    area: 7800,
    city: 'Miami',
    propertyType: 'Retail',
    buildingClass: 'Class C',
    images: [
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Creative retail and showroom space with outdoor seating and strong street visibility.',
    specs: {
      yearBuilt: 1998,
      floors: 3,
      ceilingHeight: '13 ft',
      parking: '40 spaces',
      zoning: 'Mixed Retail',
      occupancy: 'Occupied'
    }
  },
  {
    id: 7,
    title: 'Blue Ridge Distribution Center',
    price: 2460000,
    area: 31200,
    city: 'Atlanta',
    propertyType: 'Warehouse',
    buildingClass: 'Class A',
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Large-scale distribution center with multiple loading docks and easy highway access.',
    specs: {
      yearBuilt: 2022,
      floors: 1,
      ceilingHeight: '36 ft',
      parking: '140 spaces',
      zoning: 'Logistics Park',
      occupancy: 'Vacant'
    }
  },
  {
    id: 8,
    title: 'Lakeside Flex Campus',
    price: 1780000,
    area: 13400,
    city: 'Dallas',
    propertyType: 'Industrial',
    buildingClass: 'Class A',
    images: [
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Flexible industrial campus designed for light manufacturing, service, and workshop use.',
    specs: {
      yearBuilt: 2014,
      floors: 2,
      ceilingHeight: '20 ft',
      parking: '95 spaces',
      zoning: 'Flex Industrial',
      occupancy: 'Leased'
    }
  }
]

export default mockProperties
