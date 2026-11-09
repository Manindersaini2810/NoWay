import { indianCommercialLandProperties } from './indianCommercialLandProperties'

const usCommercialProperties = [
  {
    id: 'us-001',
    _id: 'us-001',
    title: 'Harbor Point Tower',
    price: 2850000,
    currency: 'USD',
    priceFormatted: '$2,850,000',
    pricePerSqFt: 156,
    capRate: 7.2,
    listingType: 'sale',
    propertyType: 'office',
    buildingClass: 'Class A',
    views: 1420,
    mlEstimatedPrice: 2920000,
    area: {
      totalSqFt: 18200,
      lotSqFt: 24000,
      displayArea: '18,200 sq ft'
    },
    location: {
      address: '1200 Westlake Avenue North',
      city: 'Seattle',
      state: 'WA',
      country: 'USA',
      zip: '98109',
      metro_distance: 0.6
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'A premium mixed-use office tower in the heart of downtown with flexible floor plates, LEED Gold certification, and panoramic lake views.',
    structural: {
      yearBuilt: 2019,
      buildingClass: 'Class A',
      floors: 22,
      ceilingHeightFt: 12,
      parkingSpaces: 320,
      loadingDocks: 2,
      hvacType: 'Variable Air Volume (VAV) with HEPA filtration',
      zoning: 'Commercial Mixed Use (CMU-1)',
      occupancyStatus: 'Leased'
    },
    amenities: ['Executive Boardrooms', 'Fiber Optic Backbone', 'EV Charging Stations', '24/7 Security & Concierge', 'Fitness Center', 'Rooftop Terrace'],
    broker: {
      name: 'Alexander Hayes',
      company: 'Apex Commercial Capital',
      email: 'a.hayes@apexcommercial.com',
      phone: '+1 (206) 555-0182'
    },
    tags: ['LEED Gold', 'Waterfront', 'Class A']
  },
  {
    id: 'us-002',
    _id: 'us-002',
    title: 'North Market Retail Plaza',
    price: 1280000,
    currency: 'USD',
    priceFormatted: '$1,280,000',
    pricePerSqFt: 133,
    capRate: 8.1,
    listingType: 'sale',
    propertyType: 'retail',
    buildingClass: 'Class B',
    views: 890,
    mlEstimatedPrice: 1310000,
    area: {
      totalSqFt: 9600,
      lotSqFt: 18000,
      displayArea: '9,600 sq ft'
    },
    location: {
      address: '450 North Lamar Blvd',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      zip: '78703',
      metro_distance: 1.2
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'High-footfall retail center with anchor tenants, prominent frontage along a major commuter artery, and turnkey restaurant infrastructure.',
    structural: {
      yearBuilt: 2011,
      buildingClass: 'Class B',
      floors: 2,
      ceilingHeightFt: 14,
      parkingSpaces: 110,
      loadingDocks: 1,
      hvacType: 'Independent Rooftop Units (RTUs)',
      zoning: 'General Commercial (C-2)',
      occupancyStatus: 'Partially Leased'
    },
    amenities: ['Pylon Signage', 'Grease Traps', 'High-Visibility Corner', 'Dedicated Customer Parking', 'Patio Seating'],
    broker: {
      name: 'Samantha Reed',
      company: 'Austin Retail Advisors',
      email: 's.reed@austinretail.com',
      phone: '+1 (512) 555-0144'
    },
    tags: ['High Footfall', 'Drive-Thru Potential', 'Turnkey']
  },
  {
    id: 'us-003',
    _id: 'us-003',
    title: 'Summit Logistics Hub',
    price: 2140000,
    currency: 'USD',
    priceFormatted: '$2,140,000',
    pricePerSqFt: 86,
    capRate: 7.9,
    listingType: 'sale',
    propertyType: 'warehouse',
    buildingClass: 'Class A',
    views: 1120,
    mlEstimatedPrice: 2190000,
    area: {
      totalSqFt: 24800,
      lotSqFt: 52000,
      displayArea: '24,800 sq ft'
    },
    location: {
      address: '8800 E 40th Ave',
      city: 'Denver',
      state: 'CO',
      country: 'USA',
      zip: '80207',
      metro_distance: 2.5
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1565610222536-ef2f3f5f8f31?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'State-of-the-art fulfillment and cold-storage-ready warehouse featuring 32ft clear ceiling heights, 6 dock doors, and direct I-70 highway access.',
    structural: {
      yearBuilt: 2020,
      buildingClass: 'Class A',
      floors: 1,
      ceilingHeightFt: 32,
      parkingSpaces: 90,
      loadingDocks: 6,
      hvacType: 'Climate Controlled Warehouse & Office Splits',
      zoning: 'Industrial Heavy (I-H)',
      occupancyStatus: 'Vacant'
    },
    amenities: ['ESFR Sprinklers', 'Cross-Dock Capability', 'Truck Staging Yard', '3-Phase 480V 2000A Power', 'Fenced Security Perimeter'],
    broker: {
      name: 'Marcus Vance',
      company: 'Mile High Industrial Realty',
      email: 'mvance@milehighrealty.com',
      phone: '+1 (303) 555-0199'
    },
    tags: ['High Clear Height', 'Cross-Dock', 'I-70 Corridor']
  },
  {
    id: 'us-004',
    _id: 'us-004',
    title: 'Union Square Executive Offices',
    price: 3320000,
    currency: 'USD',
    priceFormatted: '$3,320,000',
    pricePerSqFt: 155,
    capRate: 6.8,
    listingType: 'sale',
    propertyType: 'office',
    buildingClass: 'Class A',
    views: 1840,
    mlEstimatedPrice: 3400000,
    area: {
      totalSqFt: 21400,
      lotSqFt: 28000,
      displayArea: '21,400 sq ft'
    },
    location: {
      address: '200 S Wacker Drive',
      city: 'Chicago',
      state: 'IL',
      country: 'USA',
      zip: '60606',
      metro_distance: 0.2
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'A contemporary office asset with river views, smart BMS automation, redundant generators, and ready-to-move-in executive headquarters suites.',
    structural: {
      yearBuilt: 2017,
      buildingClass: 'Class A',
      floors: 18,
      ceilingHeightFt: 11,
      parkingSpaces: 250,
      loadingDocks: 2,
      hvacType: 'Dual Central Chiller with Fresh Air Pre-Conditioning',
      zoning: 'Downtown Commercial High-Density',
      occupancyStatus: 'Leased'
    },
    amenities: ['Subway Direct Access', 'Conference Center', 'BMS Automation', 'Backup Diesel Generator', 'Valet Parking'],
    broker: {
      name: 'Clara Sterling',
      company: 'Windy City CRE Partners',
      email: 'csterling@windycitycre.com',
      phone: '+1 (312) 555-0167'
    },
    tags: ['Loop Location', 'BMS Automated', 'River Views']
  },
  {
    id: 'us-005',
    _id: 'us-005',
    title: 'Biscayne Bay Retail Lofts',
    price: 990000,
    currency: 'USD',
    priceFormatted: '$990,000',
    pricePerSqFt: 127,
    capRate: 8.5,
    listingType: 'sale',
    propertyType: 'retail',
    buildingClass: 'Class B',
    views: 740,
    mlEstimatedPrice: 1040000,
    area: {
      totalSqFt: 7800,
      lotSqFt: 12000,
      displayArea: '7,800 sq ft'
    },
    location: {
      address: '2500 Biscayne Blvd',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zip: '33137',
      metro_distance: 0.8
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'Designer storefronts and showroom spaces in vibrant Edgewater with high foot traffic, floor-to-ceiling glass display windows, and outdoor promenade frontage.',
    structural: {
      yearBuilt: 2015,
      buildingClass: 'Class B',
      floors: 3,
      ceilingHeightFt: 14,
      parkingSpaces: 40,
      loadingDocks: 1,
      hvacType: 'High-Efficiency Multi-Zone Splits',
      zoning: 'Mixed Commercial Promenade',
      occupancyStatus: 'Occupied'
    },
    amenities: ['Floor-to-Ceiling Glass', 'Outdoor Dining Patio', 'High Visibility', 'Security Surveillance', 'Valet Dropoff'],
    broker: {
      name: 'Diego Morales',
      company: 'Miami Premier Spaces',
      email: 'dmorales@miamipremier.com',
      phone: '+1 (305) 555-0123'
    },
    tags: ['Edgewater Arts', 'Glass Frontage', 'Turnkey']
  },
  {
    id: 'us-006',
    _id: 'us-006',
    title: 'Blue Ridge Distribution Center',
    price: 2460000,
    currency: 'USD',
    priceFormatted: '$2,460,000',
    pricePerSqFt: 79,
    capRate: 8.2,
    listingType: 'sale',
    propertyType: 'warehouse',
    buildingClass: 'Class A',
    views: 950,
    mlEstimatedPrice: 2510000,
    area: {
      totalSqFt: 31200,
      lotSqFt: 70000,
      displayArea: '31,200 sq ft'
    },
    location: {
      address: '4200 Logistics Parkway',
      city: 'Atlanta',
      state: 'GA',
      country: 'USA',
      zip: '30336',
      metro_distance: 3.1
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    description: 'Regional distribution logistics facility minutes from Hartsfield-Jackson airport, featuring 36ft clear heights, 10 dock positions, and deep truck courts.',
    structural: {
      yearBuilt: 2022,
      buildingClass: 'Class A',
      floors: 1,
      ceilingHeightFt: 36,
      parkingSpaces: 140,
      loadingDocks: 10,
      hvacType: 'Industrial Evaporative Cooling & Heating',
      zoning: 'Heavy Logistics Park (M-2)',
      occupancyStatus: 'Vacant'
    },
    amenities: ['10 Overhead Dock Doors', '135ft Truck Apron', 'Airport Corridor Access', 'Heavy Floor Load Capacity', 'Trailer Parking Stalls'],
    broker: {
      name: 'Derrick Robinson',
      company: 'Southeast Logistics Group',
      email: 'drobinson@selogistics.com',
      phone: '+1 (404) 555-0188'
    },
    tags: ['Airport Logistics', '36ft High Bay', 'Class A']
  }
]

// Unified Mock Properties combining Indian Commercial & Land + US Commercial Properties
export const mockProperties = [
  ...indianCommercialLandProperties,
  ...usCommercialProperties
]

export default mockProperties
