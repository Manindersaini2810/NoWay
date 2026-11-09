/**
 * Indian Commercial & Land Listings — Dedicated Demo Dataset
 * Note: Clearly identified demo / reference data for commercial spaces and land parcels.
 * Images are curated illustrative architecture and land representations.
 */

export const indianCommercialLandProperties = [
  {
    id: 'ind-001',
    title: 'CyberCity Tech Park Alpha',
    description: 'Grade-A tech park campus on Golf Course Extension Road with high-efficiency floor plates, LEED Platinum certification, and complete power redundancy.',
    listingType: 'lease',
    propertyType: 'office',
    price: 3200000, // Monthly lease in INR (₹32 Lakhs/mo)
    currency: 'INR',
    priceFormatted: '₹32 L/mo',
    pricePerSqFt: 110,
    capRate: 8.4,
    area: {
      totalSqFt: 29000,
      lotSqFt: 45000,
      displayArea: '29,000 sq ft'
    },
    structural: {
      yearBuilt: 2022,
      buildingClass: 'Class A',
      floors: 14,
      ceilingHeightFt: 13.5,
      parkingSpaces: 260,
      loadingDocks: 2,
      hvacType: 'Chilled Water Multi-Zone VRV',
      zoning: 'IT / Commercial ITES',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'Golf Course Extension Road, Sector 62',
      city: 'Gurgaon',
      state: 'Haryana',
      country: 'India',
      zip: '122102',
      metro_distance: 1.4,
      district: 'NCR'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['24/7 Power Backup', 'Double-Height Lobby', 'Food Court & Cafeteria', 'EV Fast Chargers', 'Multi-tier Security', 'Auditorium'],
    tags: ['Grade A IT Park', 'Ready to Move', 'LEED Platinum'],
    broker: {
      name: 'Vikram Malhotra',
      company: 'NoWay Commercial Capital',
      email: 'vikram.m@nowayestate.com',
      phone: '+91 98110 54321'
    },
    mlEstimatedPrice: 3150000,
    status: 'active',
    views: 142
  },
  {
    id: 'ind-002',
    title: 'Aerocity Prime Commercial Land Parcel',
    description: 'Freehold commercial plot approved for mixed-use corporate tower or luxury hotel development. Located in the high-growth Aerocity corridor near international airport.',
    listingType: 'sale',
    propertyType: 'land',
    price: 480000000, // ₹48 Cr
    currency: 'INR',
    priceFormatted: '₹48 Cr',
    pricePerSqFt: 11000,
    area: {
      totalSqFt: 43560,
      lotSqFt: 43560,
      acres: 1.0,
      sqYards: 4840,
      displayArea: '1.0 Acre (4,840 sq yd)'
    },
    landDetails: {
      landType: 'Commercial Freehold Plot',
      zoning: 'C-4 High-Density Commercial',
      roadFrontage: '160 ft Frontage',
      roadWidth: '100 ft Arterial Road',
      documentStatus: 'Clear Title, Approved Master Plan',
      farPermitted: 3.25
    },
    structural: {
      buildingClass: 'Class A',
      zoning: 'Commercial Mixed Use',
      occupancyStatus: 'Vacant'
    },
    location: {
      address: 'Airport Expressway Sector 82',
      city: 'Mohali',
      state: 'Punjab',
      country: 'India',
      zip: '140306',
      district: 'Tricity'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Wide 100ft Access Road', 'Underground Utility Lines', 'Clear Demarcation Boundary', 'Proximity to Airport'],
    tags: ['Commercial Land', 'Freehold Title', 'Tricity Prime'],
    broker: {
      name: 'Harpreet Singh',
      company: 'Punjab Commercial Advisors',
      email: 'harpreet.s@nowayestate.com',
      phone: '+91 98765 12345'
    },
    mlEstimatedPrice: 472000000,
    status: 'active',
    views: 310
  },
  {
    id: 'ind-003',
    title: 'Madhapur High-Tech Logistics Facility',
    description: 'Modern pre-engineered warehousing facility located near the Outer Ring Road with 36ft clear ceiling heights, dock levelers, and expansive apron space for trailers.',
    listingType: 'lease',
    propertyType: 'warehouse',
    price: 1850000, // ₹18.5 L/mo
    currency: 'INR',
    priceFormatted: '₹18.5 L/mo',
    pricePerSqFt: 37,
    area: {
      totalSqFt: 50000,
      lotSqFt: 85000,
      displayArea: '50,000 sq ft'
    },
    structural: {
      yearBuilt: 2023,
      buildingClass: 'Class A',
      floors: 1,
      ceilingHeightFt: 36,
      parkingSpaces: 45,
      loadingDocks: 8,
      hvacType: 'Natural Ridge Vents with Industrial Exhaust',
      zoning: 'Industrial & Logistics Corridor',
      occupancyStatus: 'Vacant'
    },
    location: {
      address: 'ORR Logistics Node, Shamshabad - Madhapur Link',
      city: 'Hyderabad',
      state: 'Telangana',
      country: 'India',
      zip: '500081'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1565610222536-ef2f3f5f8f31?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Laser Screed Flooring (5 T/sqm)', 'Automatic Fire Sprinklers', '8 Dedicated Loading Docks', 'Driver Rest Area'],
    tags: ['Modern Fulfillment', '36ft Clear Height', 'Immediate Possession'],
    broker: {
      name: 'Nagarjuna Rao',
      company: 'Deccan Asset Management',
      email: 'n.rao@nowayestate.com',
      phone: '+91 94400 67890'
    },
    mlEstimatedPrice: 1820000,
    status: 'active',
    views: 188
  },
  {
    id: 'ind-004',
    title: 'Whitefield Prestige Business Hub',
    description: 'Flagship corporate headquarters building in Whitefield IT cluster. Fully furnished plug-and-play setup for 450+ workstations with executive boardrooms and data center capacity.',
    listingType: 'sale',
    propertyType: 'office',
    price: 265000000, // ₹26.5 Cr
    currency: 'INR',
    priceFormatted: '₹26.5 Cr',
    pricePerSqFt: 7800,
    capRate: 8.9,
    area: {
      totalSqFt: 34000,
      lotSqFt: 50000,
      displayArea: '34,000 sq ft'
    },
    structural: {
      yearBuilt: 2020,
      buildingClass: 'Class A',
      floors: 6,
      ceilingHeightFt: 12,
      parkingSpaces: 110,
      loadingDocks: 1,
      hvacType: '100% Central VRF Climate Control',
      zoning: 'Commercial IT',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'EPIP Zone, Whitefield',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
      zip: '560066',
      metro_distance: 0.9
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Plug & Play Fitout', 'Dedicated Fiber Redundancy', '100% Genset Backup', 'On-site Cafeteria', 'Metro Station 900m'],
    tags: ['Plug & Play Office', 'Bengaluru IT Belt', 'High Cap Rate'],
    broker: {
      name: 'Ananya Sharma',
      company: 'Silicon City Commercial',
      email: 'ananya.s@nowayestate.com',
      phone: '+91 99000 11223'
    },
    mlEstimatedPrice: 262000000,
    status: 'active',
    views: 450
  },
  {
    id: 'ind-005',
    title: 'Bandra-Kurla Complex Financial Suite',
    description: 'Prestigious corner-suite commercial office in G-Block, BKC. Unobstructed boulevard views, private biometric entrance, and seamless transit connectivity.',
    listingType: 'lease',
    propertyType: 'office',
    price: 4500000, // ₹45 L/mo
    currency: 'INR',
    priceFormatted: '₹45 L/mo',
    pricePerSqFt: 375,
    area: {
      totalSqFt: 12000,
      lotSqFt: 22000,
      displayArea: '12,000 sq ft'
    },
    structural: {
      yearBuilt: 2021,
      buildingClass: 'Class A',
      floors: 18,
      ceilingHeightFt: 14,
      parkingSpaces: 40,
      loadingDocks: 1,
      hvacType: 'High-Efficiency Central Chilled Water',
      zoning: 'International Financial District',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'G-Block, Bandra Kurla Complex',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      zip: '400051',
      metro_distance: 0.5
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Concierge Service', 'Private Boardrooms', 'Valet Parking', 'Smart Card Access', 'Fine Dining in Atrium'],
    tags: ['Ultra Luxury BKC', 'Financial Hub', 'Ready Occupancy'],
    broker: {
      name: 'Rohan Mehta',
      company: 'Mumbai Commercial Partners',
      email: 'rohan.m@nowayestate.com',
      phone: '+91 98200 88990'
    },
    mlEstimatedPrice: 4450000,
    status: 'active',
    views: 520
  },
  {
    id: 'ind-006',
    title: 'Madhya Marg Premium Commercial Showroom',
    description: 'Iconic three-story glass showroom on Sector 26 Madhya Marg. Exceptionally high vehicle footfall, 45ft direct road frontage, and dedicated customer parking bay.',
    listingType: 'sale',
    propertyType: 'retail',
    price: 185000000, // ₹18.5 Cr
    currency: 'INR',
    priceFormatted: '₹18.5 Cr',
    pricePerSqFt: 23125,
    area: {
      totalSqFt: 8000,
      lotSqFt: 10000,
      displayArea: '8,000 sq ft (3 Levels)'
    },
    structural: {
      yearBuilt: 2018,
      buildingClass: 'Class A',
      floors: 3,
      ceilingHeightFt: 15,
      parkingSpaces: 35,
      loadingDocks: 1,
      hvacType: 'Split Ductable Central',
      zoning: 'Commercial Showroom Corridor',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'Madhya Marg, Sector 26',
      city: 'Chandigarh',
      state: 'Chandigarh',
      country: 'India',
      zip: '160019'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Full Glass Façade', 'Elevator to All 3 Levels', 'Rear Service Alley', 'High Footfall Corridor'],
    tags: ['Showroom Retail', 'Madhya Marg Frontage', 'City Center'],
    broker: {
      name: 'Gaurav Bhasin',
      company: 'Chandigarh Realty Advisors',
      email: 'gaurav.b@nowayestate.com',
      phone: '+91 98140 22334'
    },
    mlEstimatedPrice: 181000000,
    status: 'active',
    views: 290
  },
  {
    id: 'ind-007',
    title: 'Hinjawadi Phase 2 Light Industrial Park',
    description: 'Engineered manufacturing and assembly park with heavy power load sanction (750 kVA), concrete flooring, EOT crane provision, and worker amenities.',
    listingType: 'sale',
    propertyType: 'industrial',
    price: 135000000, // ₹13.5 Cr
    currency: 'INR',
    priceFormatted: '₹13.5 Cr',
    pricePerSqFt: 6136,
    area: {
      totalSqFt: 22000,
      lotSqFt: 38000,
      displayArea: '22,000 sq ft'
    },
    structural: {
      yearBuilt: 2019,
      buildingClass: 'Class B',
      floors: 2,
      ceilingHeightFt: 24,
      parkingSpaces: 50,
      loadingDocks: 3,
      hvacType: 'Industrial Exhaust Ventilation',
      zoning: 'Industrial Special Zone',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'MIDC Hinjawadi Phase 2',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
      zip: '411057'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['750 kVA Power Sanction', 'EOT Crane Gantry Ready', 'Effluent Treatment Plant Provision', 'MIDC Water Connection'],
    tags: ['Industrial Park', 'Pune Manufacturing', 'MIDC Approved'],
    broker: {
      name: 'Sameer Joshi',
      company: 'Pune Industrial Realty',
      email: 'sameer.j@nowayestate.com',
      phone: '+91 98230 45678'
    },
    mlEstimatedPrice: 132000000,
    status: 'active',
    views: 215
  },
  {
    id: 'ind-008',
    title: 'Sector 62 Institutional & Mixed-Use Plaza',
    description: 'Prominent commercial development in Sector 62 Noida. Ground level retail banks and cafes with 5 upper levels dedicated to corporate spaces and training academies.',
    listingType: 'lease',
    propertyType: 'mixed-use',
    price: 1450000, // ₹14.5 L/mo
    currency: 'INR',
    priceFormatted: '₹14.5 L/mo',
    pricePerSqFt: 85,
    area: {
      totalSqFt: 17000,
      lotSqFt: 28000,
      displayArea: '17,000 sq ft'
    },
    structural: {
      yearBuilt: 2021,
      buildingClass: 'Class A',
      floors: 6,
      ceilingHeightFt: 12.5,
      parkingSpaces: 90,
      loadingDocks: 1,
      hvacType: 'Multi-zone Central AC',
      zoning: 'Mixed Institutional & Commercial',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'Institutional Area, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      country: 'India',
      zip: '201309',
      metro_distance: 0.6
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Direct Blue Line Metro Access', 'Basement Parking', 'High-Speed Elevators', 'Rooftop Cafeteria'],
    tags: ['Mixed Use', 'Noida Metro Hub', 'Institutional'],
    broker: {
      name: 'Alok Tandon',
      company: 'NCR Commercial Corp',
      email: 'alok.t@nowayestate.com',
      phone: '+91 98100 33445'
    },
    mlEstimatedPrice: 1420000,
    status: 'active',
    views: 380
  },
  {
    id: 'ind-009',
    title: 'Sitapura Industrial Zone Development Land',
    description: 'Prime industrial development land plot in Sitapura Industrial Area, suitable for warehousing, solar component fabrication, or export garment manufacture.',
    listingType: 'sale',
    propertyType: 'land',
    price: 65000000, // ₹6.5 Cr
    currency: 'INR',
    priceFormatted: '₹6.5 Cr',
    pricePerSqFt: 2500,
    area: {
      totalSqFt: 26000,
      lotSqFt: 26000,
      acres: 0.6,
      sqYards: 2888,
      displayArea: '0.6 Acres (2,888 sq yd)'
    },
    landDetails: {
      landType: 'RIICO Industrial Freehold Plot',
      zoning: 'RIICO General Industrial',
      roadFrontage: '120 ft Frontage',
      roadWidth: '80 ft Main Road',
      documentStatus: 'RIICO Lease Deed Transferred, Clean Documentation',
      farPermitted: 2.0
    },
    structural: {
      buildingClass: 'Class B',
      zoning: 'Industrial',
      occupancyStatus: 'Vacant'
    },
    location: {
      address: 'Sitapura Industrial Area Phase 3',
      city: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      zip: '302022'
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['RIICO Water Connection', 'Three-Phase Industrial Feeder', 'Boundary Wall Constructed', 'Near Tonk Road'],
    tags: ['RIICO Industrial Plot', 'Jaipur Hub', 'Clean Title'],
    broker: {
      name: 'Rajendra Rathore',
      company: 'Pink City Commercial',
      email: 'rajendra.r@nowayestate.com',
      phone: '+91 94140 12345'
    },
    mlEstimatedPrice: 63000000,
    status: 'active',
    views: 160
  },
  {
    id: 'ind-010',
    title: 'Connaught Place Heritage Corporate Floors',
    description: 'Rarely available full floor office plate in Connaught Place outer circle. High ceilings, classical British colonial colonnades, and modern central air-conditioning.',
    listingType: 'lease',
    propertyType: 'office',
    price: 3800000, // ₹38 L/mo
    currency: 'INR',
    priceFormatted: '₹38 L/mo',
    pricePerSqFt: 380,
    area: {
      totalSqFt: 10000,
      lotSqFt: 15000,
      displayArea: '10,000 sq ft'
    },
    structural: {
      yearBuilt: 1995,
      buildingClass: 'Class A',
      floors: 3,
      ceilingHeightFt: 16,
      parkingSpaces: 25,
      loadingDocks: 0,
      hvacType: 'Modern VRV Retrofitted Central HVAC',
      zoning: 'Central Commercial District',
      occupancyStatus: 'Occupied'
    },
    location: {
      address: 'Barakhamba Road / CP Outer Circle',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
      zip: '110001',
      metro_distance: 0.2
    },
    media: {
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    amenities: ['Central CP Landmark Location', '200m to Rajiv Chowk Metro', 'Heritage Architecture', 'Dedicated Lift Lobby'],
    tags: ['Delhi Landmark', 'Connaught Place', 'Prime Corporate'],
    broker: {
      name: 'Sunil Duggal',
      company: 'Delhi Capital Advisors',
      email: 'sunil.d@nowayestate.com',
      phone: '+91 98111 99887'
    },
    mlEstimatedPrice: 3750000,
    status: 'active',
    views: 640
  }
];

export default indianCommercialLandProperties;
