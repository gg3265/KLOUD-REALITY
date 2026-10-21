import { Property } from '../types';

export const initialDemoProperties: Property[] = [
  {
    id: 'prop-demo-01',
    slug: 'harbour-crest-residences-mazgaon',
    title: 'The Harbour Crest Tower',
    tagline: 'Panoramic views over the Mumbai eastern harbour & lush botanic gardens',
    category: 'primary',
    propertyType: 'Apartment',
    price: 48500000,
    priceDisplay: '₹ 4.85 Cr Onwards',
    location: 'Opposite Piramal Aranya, Mazgaon',
    locality: 'Mazgaon',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    carpetArea: '1,420 sq.ft.',
    images: [
      '/images/hero_architecture_1785684802035.jpg',
      '/images/project_exterior_1785684820308.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    description: 'A distinguished high-rise residential landmark positioned in the historic heart of Mazgaon, South Mumbai. Offering dual aspects towards the Arabian Sea harbour and the verdant expanse of the Byculla botanical gardens. Crafted with expansive double-glazed floor-to-ceiling facades, imported marble finishes, and private elevator lobbies.',
    features: [
      'Dual harbor & skyline vantage point',
      'Grand 11-foot finished ceiling height',
      'Triple-height arrival portico with valet',
      'Advanced biometric access control',
      'IGBC Green Building Certified Gold'
    ],
    amenities: [
      'Temperature-regulated infinity rooftop pool',
      'State-of-the-art wellness club & spa',
      'Private screening theater & banquet suite',
      'Landscaped podium reflexology walk',
      'Dedicated business lounge & private meeting rooms'
    ],
    nearby: [
      { label: 'Eastern Freeway Entrance', distance: '3 mins' },
      { label: 'Piramal Aranya', distance: 'Across the road' },
      { label: 'Byculla Railway Station', distance: '5 mins' },
      { label: 'Fort / South Mumbai Business District', distance: '12 mins' }
    ],
    possession: 'December 2026',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'P51900028914 (MahaRERA Demo)',
    isFeatured: true,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'prop-demo-02',
    slug: 'the-sapphire-penthouse-worli',
    title: 'The Sapphire Sky Penthouse',
    tagline: 'Duplex sky residence featuring an expansive private wraparound terrace',
    category: 'resale',
    propertyType: 'Penthouse',
    price: 185000000,
    priceDisplay: '₹ 18.50 Cr',
    location: 'Sea Face Enclave, Worli',
    locality: 'Worli',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 5,
    carpetArea: '3,850 sq.ft.',
    images: [
      '/images/project_interior_1785684832928.jpg',
      '/images/hero_architecture_1785684802035.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    description: 'An architectural statement crowning a premier boutique development along the Worli coastline. Designed across two voluminous levels, this penthouse integrates a dedicated private plunge pool, double-height living salon, Poggenpohl show kitchen, and uninterrupted sunset panoramas of the Arabian Sea.',
    features: [
      'Direct private high-speed elevator access',
      '1,200 sq.ft. open-air entertaining deck',
      'Master suite with customized walk-in dressing lounge',
      'Acoustically isolated entertainment salon',
      '4 covered reserved basement parking bays'
    ],
    amenities: [
      '24/7 dedicated residential concierge',
      'Private sky deck & jacuzzi',
      'Residents-only Olympic gym',
      'Executive boardroom facilities'
    ],
    nearby: [
      { label: 'Bandra-Worli Sea Link', distance: '4 mins' },
      { label: 'St. Regis & Palladium', distance: '8 mins' },
      { label: 'BKC via Coastal Road', distance: '15 mins' }
    ],
    possession: 'Immediate Possession',
    constructionStatus: 'Ready Possession',
    furnishingStatus: 'Fully Furnished',
    reraNumber: 'Verified OC Received',
    isFeatured: true,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-01T11:30:00Z'
  },
  {
    id: 'prop-demo-03',
    slug: 'alibaug-coastal-sanctuary-villa',
    title: 'The Coastal Sanctuary Estate',
    tagline: 'Private tropical residence set within 1.5 acres of mature coconut groves',
    category: 'second-home',
    propertyType: 'Villa',
    price: 92000000,
    priceDisplay: '₹ 9.20 Cr',
    location: 'Awas Beach Road, Alibaug',
    locality: 'Awas / Mandwa',
    city: 'Alibaug',
    bedrooms: 4,
    bathrooms: 5,
    carpetArea: '4,200 sq.ft. (1.5 Acre Plot)',
    images: [
      '/images/project_clubhouse_1785684842599.jpg',
      '/images/project_exterior_1785684820308.jpg',
      '/images/project_interior_1785684832928.jpg'
    ],
    description: 'Crafted as an antidote to urban density, this private retreat is situated just 10 minutes from Mandwa Jetty (20 minutes by Ro-Pax speed ferry from South Mumbai / Gateway of India). Features rammed-earth and basalt architectural lines, open courtyards with water bodies, and a lap pool enveloped by lush flora.',
    features: [
      'Fully gated private estate perimeter',
      '50-foot freshwater swimming pool',
      'Independent staff quarters & manager cabin',
      'Borewell + rainwater collection infrastructure',
      '100% solar-assisted electrical backup'
    ],
    amenities: [
      'Organic kitchen garden & orchard',
      'Outdoor barbecue pavilion & fire pit',
      'Covered cabana and wellness deck',
      'High-speed fiber connectivity for remote work'
    ],
    nearby: [
      { label: 'Mandwa Jetty (Speedboat to Gateway)', distance: '8 mins' },
      { label: 'Awas Beachfront', distance: '4 mins' },
      { label: 'Boardwalk by Flamboyante', distance: '8 mins' }
    ],
    possession: 'Ready Possession',
    constructionStatus: 'Ready Possession',
    furnishingStatus: 'Fully Furnished',
    reraNumber: 'NA Certified Private Land',
    isFeatured: true,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-10T14:15:00Z'
  },
  {
    id: 'prop-demo-04',
    slug: 'lonavala-foothill-villa-plots',
    title: 'Whispering Pines Gated Plots',
    tagline: 'Exclusive residential plots with clear titles overlooking the Sahyadri range',
    category: 'land',
    propertyType: 'Plot',
    price: 16500000,
    priceDisplay: '₹ 1.65 Cr Onwards',
    location: 'Tungarli Hills, Lonavala',
    locality: 'Lonavala',
    city: 'Pune Foothills',
    plotArea: '5,500 to 12,000 sq.ft.',
    images: [
      '/images/project_exterior_1785684820308.jpg',
      '/images/hero_architecture_1785684802035.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    description: 'A boutique development of 18 demarcated residential plots set against a mist-covered hill backdrop. Each parcel benefits from sanctioned residential NA zoning, metered utilities, internal paved access roads with streetlights, and architectural design guidelines for harmonized contemporary living.',
    features: [
      'Collector-sanctioned non-agricultural title',
      'Underground electricity & water connections to plot boundary',
      'Gated secure entrance with 24/7 security booth',
      'Soil testing and boundary survey documentation verified',
      'FSI-compliant zoning for independent villa construction'
    ],
    amenities: [
      'Community clubhouse & tennis court',
      'Perimeter jogging trail & fruit orchards',
      'On-site estate management and maintenance support'
    ],
    nearby: [
      { label: 'Mumbai-Pune Expressway Exit', distance: '10 mins' },
      { label: 'Lonavala Town Center', distance: '7 mins' },
      { label: 'Bushy Dam', distance: '15 mins' }
    ],
    possession: 'Immediate Registration',
    constructionStatus: 'Ready Possession',
    reraNumber: 'Sanctioned NA Layout',
    isFeatured: false,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-15T09:00:00Z'
  },
  {
    id: 'prop-demo-05',
    slug: 'marine-view-luxury-rental-byculla',
    title: 'The Botanica Suite',
    tagline: 'High-floor curated rental overlooking tranquil botanical canopies',
    category: 'rental',
    propertyType: 'Apartment',
    price: 240000,
    priceDisplay: '₹ 2.40 Lakh / mo',
    location: 'Dr. Ambedkar Road, Byculla East',
    locality: 'Byculla',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    carpetArea: '1,680 sq.ft.',
    images: [
      '/images/project_interior_1785684832928.jpg',
      '/images/project_exterior_1785684820308.jpg',
      '/images/hero_architecture_1785684802035.jpg'
    ],
    description: 'An executive residence offered on lease for corporate directors and diplomatic tenants seeking effortless connectivity to South Mumbai and Lower Parel commercial hubs. Fully styled with bespoke teak millwork, Miele appliances, and soundproof acoustic glass.',
    features: [
      'Italian Statuario marble flooring throughout',
      'Motorized blackout blinds and smart climate control',
      'Butler pantry and helper suite with separate service entrance',
      '2 dedicated basement parking slots'
    ],
    amenities: [
      'Concierge desk & parcel reception',
      'Heated 25m indoor swimming pool',
      'Squash court & fitness center',
      'Kids indoor discovery zone'
    ],
    nearby: [
      { label: 'Mazgaon Circle', distance: '4 mins' },
      { label: 'Lower Parel Commercial Hub', distance: '10 mins' },
      { label: 'ITC Grand Central', distance: '6 mins' }
    ],
    possession: 'Immediate Occupancy',
    constructionStatus: 'Ready Possession',
    furnishingStatus: 'Fully Furnished',
    isFeatured: false,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-20T16:00:00Z'
  }
];
