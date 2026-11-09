import { Property } from '../types';

export const initialDemoProperties: Property[] = [
  // 1. LODHA AUREUS — SEWRI
  {
    id: 'prop-lodha-aureus',
    slug: 'lodha-aureus-sewri',
    title: 'Lodha Aureus',
    developer: 'Lodha Group / Lodha Developers Limited',
    subheading: 'ART DECO ELEGANCE ON SEWRI’S EASTERN WATERFRONT',
    mainHeadline: 'Expansive Horizontal Living with Infinite Sea & Horizon Panoramas.',
    tagline: 'A rare Art Deco-inspired waterfront development along Sewri’s Eastern Waterfront, crafted for elevated privacy, expansive decks, and signature hospitality.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 0,
    priceDisplay: 'Price on Request',
    isPriceIndicative: false,
    priceRevisionNote: 'Pricing is available upon formal request for verified buyer mandates.',
    location: 'Zakaria Bunder Road, Sewri, South Mumbai, Mumbai, Maharashtra 400015',
    locality: 'Sewri',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 4,
    carpetArea: '3 & 4 BHK Private Residences with Expansive Decks',
    configurationsAvailable: ['3 BHK Luxury Residences', '4 BHK Grand Horizon Suites'],
    floorPlanDetails: [
      {
        configuration: '3 BHK Luxury Residence',
        carpetArea: 'Spacious 3 Bed Layout with Horizon Deck',
        description: 'Expansive living-dining salon opening to a sea-facing deck, ensuite bedrooms, and private elevator vestibule access.',
        image: '/images/properties/lodha-aureus-deck.jpg'
      },
      {
        configuration: '4 BHK Grand Horizon Suite',
        carpetArea: 'Bespoke 4 Bed Horizontal Layout',
        description: 'Corner layout with dual-aspect waterfront panoramas, master suite with walk-in dressing zone, and dedicated service entry.',
        image: '/images/properties/lodha-aureus-sewri.jpg'
      }
    ],
    images: [
      '/images/properties/lodha-aureus-sewri.jpg',
      '/images/properties/lodha-aureus-deck.jpg',
      '/images/properties/lodha-aureus-amenities.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    creativeImage: '/images/properties/lodha-aureus-sewri.jpg',
    description: 'Lodha Aureus represents a landmark luxury residential enclave situated along Sewri’s transformative Eastern Waterfront. Characterized by timeless Art Deco architectural sensibilities, expansive horizontal living spaces, and oversized private sea-facing decks. Residences feature private elevator access where applicable and sweeping vistas across the Arabian Sea, the Mumbai Trans Harbour Link (Atal Setu), and the verdant flamingo sanctuary.',
    features: [
      'Art Deco-inspired architectural facade and grand double-height porte-cochère',
      'Spacious horizontal living layouts with expansive private waterfront decks',
      'Private elevator vestibules for select residences ensuring complete privacy',
      'Panoramic Eastern Waterfront views across the harbour and horizon',
      'Exclusive luxury clubhouse conceived by world-renowned design studio Yodezeen',
      'Signature Lodha hospitality, 5-tier security, and dedicated concierge management'
    ],
    amenities: [
      'Multiple Swimming Pools & Infinity Lap Pool',
      'State-of-the-Art Gymnasium & Cardio Theater',
      'Pickleball & Padel Courts',
      'Designer Clubhouse by Yodezeen',
      'Multipurpose Sports Courts & Indoor Games Lounge',
      'Elevated Landscaped Jogging Track',
      'Open-Air Rooftop Horizon Lounge',
      'Outdoor Alfresco Café & Dining Pavilion',
      'Executive Co-Working Business Lounge',
      'Banquet Facilities & Private Party Terraces'
    ],
    nearby: [
      { label: 'Sewri Railway Station (Harbour Line)', distance: '4 mins' },
      { label: 'Mumbai Trans Harbour Link (Atal Setu)', distance: '5 mins' },
      { label: 'Eastern Freeway Entrance', distance: '3 mins' },
      { label: 'Coastal Road Connection', distance: '12 mins' },
      { label: 'Phoenix Palladium & Lower Parel', distance: '12 mins' },
      { label: 'K.E.M. Hospital & Parel Medical Hub', distance: '8 mins' },
      { label: 'Tata Memorial Hospital', distance: '7 mins' }
    ],
    upcomingInfrastructure: [
      {
        name: 'Sewri–Worli Elevated Connector',
        status: 'Under Construction',
        label: 'Upcoming direct elevated link between Eastern Waterfront (Sewri) and Western Waterfront (Worli / Coastal Road)'
      },
      {
        name: 'Mumbai Port Trust (MbPT) Waterfront Redevelopment',
        status: 'Proposed / Upcoming',
        label: 'Planned eastern waterfront promenade, marina, and commercial garden corridor'
      }
    ],
    possession: 'Proposed Completion: April 2033 (RERA Filing)',
    possessionRera: 'April 2033 (RERA-recorded proposed completion date)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'PR1170002502863',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    phaseReraBreakdown: [
      {
        phase: 'Lodha Aureus Main Phase',
        towerOrWing: 'Tower 1 & Associated Wings',
        reraNumber: 'PR1170002502863',
        possession: 'April 2033 (Proposed RERA Completion)',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      }
    ],
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-08T10:00:00Z',
    badgeText: 'PREMIUM WATERFRONT',
    ctaPrimaryText: 'VIEW PROJECT DETAILS',
    disclaimerText: 'Proposed completion date of April 2033 represents the official MahaRERA registered statutory date and not a guaranteed handover date. Project specifications, availability, and pricing are subject to developer confirmation and applicable approvals.'
  },

  // 2. BHOOMI SIMĀNA — LALBAUG
  {
    id: 'prop-bhoomi-simana',
    slug: 'bhoomi-simana-lalbaug',
    title: 'Simāna by Bhoomi',
    developer: 'Bhoomi Group',
    subheading: 'AN URBAN SANCTUARY WITH 80% OPEN GREENS',
    mainHeadline: 'Three Towers of Distinction, 54+ Curated Amenities, and Club AIKYAM.',
    tagline: 'Experience an urban sanctuary in Lalbaug/Parel with approx. 80% open landscaped spaces, 11.8-foot floor-to-floor heights, and over 54 lifestyle amenities.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 0,
    priceDisplay: 'Price on Request',
    isPriceIndicative: false,
    priceRevisionNote: 'Phase-wise unit pricing and availability available upon enquiry.',
    location: 'Western India Mills Compound, G.D. Ambekar Marg, Lalbaug, Parel, South Mumbai 400033',
    locality: 'Lalbaug',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    carpetArea: '2, 3, 4 & 5 BHK Tailored Luxury Residences',
    configurationsAvailable: ['2 BHK Premium', '3 BHK Smart', '4 BHK Superior', '5 BHK Supreme'],
    floorPlanDetails: [
      {
        configuration: '2 BHK Premium',
        carpetArea: 'Well-appointed 2 Bed Layout',
        description: 'Vastu-conscious orientation with 11.8 ft ceiling height, premium marble flooring, and modular fittings.',
        image: '/images/properties/bhoomi-simana-interior.webp'
      },
      {
        configuration: '3 BHK Smart',
        carpetArea: 'Spacious 3 Bed Family Residence',
        description: 'Spacious master suite with bay windows, open-plan kitchen, utility enclave, and panoramic city vistas.',
        image: '/images/properties/bhoomi-simana-lalbaug.jpg'
      },
      {
        configuration: '4 BHK Superior',
        carpetArea: 'Expansive 4 Bed Luxury Suite',
        description: 'Generous living-dining salon, private bedroom wings, wrap-around glazing, and cross-ventilation.',
        image: '/images/properties/bhoomi-simana-amenities.webp'
      },
      {
        configuration: '5 BHK Supreme',
        carpetArea: 'Grand Jodi / Penthouse Suite',
        description: 'Palatial multi-generational residence occupying premium high floors with dual-aspect skyline vistas.',
        image: '/images/properties/bhoomi-simana-clubhouse.webp'
      }
    ],
    images: [
      '/images/properties/bhoomi-simana-lalbaug.jpg',
      '/images/properties/bhoomi-simana-clubhouse.webp',
      '/images/properties/bhoomi-simana-interior.webp',
      '/images/properties/bhoomi-simana-amenities.webp'
    ],
    creativeImage: '/images/properties/bhoomi-simana-lalbaug.jpg',
    description: 'Simāna by Bhoomi is an address of rare scale and serenity located in the heart of Lalbaug and Parel. Spread across three soaring towers within an expansive compound boasting approx. 80% open landscaped greens. Designed for grand vertical living with soaring 11.8-foot floor-to-floor heights, over 54 lifestyle amenities, dedicated dual entry/exit gates, and the signature Clubhouse AIKYAM.',
    features: [
      'Three iconic architectural towers set amidst approx. 80% open green landscapes',
      'Signature multi-level clubhouse AIKYAM offering over 54 lifestyle amenities',
      'Voluminous 11.8 ft floor-to-floor ceiling heights for superior ventilation and light',
      'Distinct configurations ranging from 2 BHK Premium to bespoke 5 BHK Supreme',
      'Dedicated dual access gates providing seamless, secure vehicle flow and privacy',
      'Centrally positioned between Lower Parel financial center and the Eastern Freeway'
    ],
    amenities: [
      'Signature Clubhouse AIKYAM',
      'Resort-Style Swimming Pool & Kids Splash Zone',
      'Advanced Fitness Center & Cardio Studio',
      'Yoga & Meditation Decks with Green Pavilions',
      'Landscaped Gardens & Reflexology Walking Paths',
      'Indoor Games Arcade & Billiards Lounge',
      'Multipurpose Social Celebration & Banquet Hall',
      'Children’s Adventure Play Park & Sensory Garden',
      'Senior Citizen Serenity Pavilion',
      '24/7 Multi-Tier Electronic Security & Access Control'
    ],
    nearby: [
      { label: 'Currey Road & Lower Parel Stations', distance: '4 mins' },
      { label: 'Eastern Freeway Lalbaug Ramp', distance: '3 mins' },
      { label: 'ITC Grand Central & St. Regis', distance: '6 mins' },
      { label: 'Phoenix Palladium Retail Hub', distance: '8 mins' },
      { label: 'K.E.M. & Global Hospital', distance: '5 mins' },
      { label: 'BKC via Eastern Freeway / Connector', distance: '15 mins' }
    ],
    possession: 'Phase-wise Possession (2028–2029)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'A Wing: P51900033361 | B Wing: P51900033360 | C Wing: PR1170002500564',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    phaseReraBreakdown: [
      {
        phase: 'Tower A',
        towerOrWing: 'A Wing',
        reraNumber: 'P51900033361',
        possession: 'Dec 2028 (RERA Target)',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Tower B',
        towerOrWing: 'B Wing',
        reraNumber: 'P51900033360',
        possession: 'Dec 2028 (RERA Target)',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Tower C',
        towerOrWing: 'C Wing',
        reraNumber: 'PR1170002500564',
        possession: 'June 2029 (RERA Target)',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      }
    ],
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-07T10:00:00Z',
    badgeText: 'CLUB AIKYAM & GREENS',
    ctaPrimaryText: 'VIEW PROJECT DETAILS',
    disclaimerText: 'Project registrations are granted wing-wise under MahaRERA. Measurements, timelines, and open-space statements are based on developer filings. Independent verification of sanctioned plans is recommended.'
  },

  // 3. MONTE SOUTH — BYCULLA
  {
    id: 'prop-monte-south',
    slug: 'monte-south-byculla',
    title: 'Monte South',
    developer: 'Adani Realty and Marathon Group',
    subheading: '12.5-ACRE MASTER DEVELOPMENT BY HAFEEZ CONTRACTOR',
    mainHeadline: 'Ready Possession Towers with OC & Near-Completion Residences in Byculla.',
    tagline: 'An expansive 12.5-acre development featuring a podium beach, Amazon-themed landscaping, terrace pool, Jain Derasar, and ready possession with OC up to 64th floor.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 0,
    priceDisplay: 'Price on Request',
    isPriceIndicative: false,
    priceRevisionNote: 'Ready inventory with OC and under-construction units available; price on request based on floor and tower selection.',
    location: 'Khatau Mills Compound, Haines Road, Byculla West, South Mumbai 400011',
    locality: 'Byculla',
    city: 'Mumbai',
    bedrooms: 3,
    bathrooms: 3,
    carpetArea: '2, 2.5, 3 & 3.5 BHK (758 to 1,678 sq. ft. RERA Carpet)',
    configurationsAvailable: [
      '2 BHK — approx. 758–932 sq. ft.',
      '2.5 BHK — approx. 1,255 sq. ft.',
      '3 BHK — approx. 1,092–1,408 sq. ft.',
      '3.5 BHK — approx. 1,678 sq. ft.'
    ],
    floorPlanDetails: [
      {
        configuration: '2 BHK Luxury Residence',
        carpetArea: '758–932 sq. ft. RERA Carpet Area',
        description: 'Optimized space planning with grand living room, ensuite master bedroom, and kitchen with dry utility.',
        image: '/images/properties/monte-south-interior.jpg'
      },
      {
        configuration: '2.5 BHK Residence',
        carpetArea: 'approx. 1,255 sq. ft. RERA Carpet Area',
        description: 'Flexible configuration with dedicated study/guest enclave, spacious dining zone, and large windows.',
        image: '/images/properties/monte-south-byculla.jpg'
      },
      {
        configuration: '3 BHK Grand Suite',
        carpetArea: '1,092–1,408 sq. ft. RERA Carpet Area',
        description: 'Luxurious 3-bedroom residence with expansive foyer, panoramic city views, and premium ensuite bathrooms.',
        image: '/images/properties/monte-south-beach.jpg'
      },
      {
        configuration: '3.5 BHK Sky Residence',
        carpetArea: 'approx. 1,678 sq. ft. RERA Carpet Area',
        description: 'Stately master residence with staff quarters, oversized salon, and corner views across South Mumbai.',
        image: '/images/properties/monte-south-pool.jpg'
      }
    ],
    images: [
      '/images/properties/monte-south-byculla.jpg',
      '/images/properties/monte-south-beach.jpg',
      '/images/properties/monte-south-pool.jpg',
      '/images/properties/monte-south-interior.jpg'
    ],
    creativeImage: '/images/properties/monte-south-byculla.jpg',
    description: 'Monte South is an expansive 12.5-acre landmark joint venture between Adani Realty and Marathon Group, designed by master architect Hafeez Contractor on the historic Khatau Mills land in Byculla. Comprising multiple 64-storey residential towers, Monte South delivers one of the most distinctive amenity ecosystems in Mumbai, including an authentic podium artificial beach, lush Amazon-themed landscaping, terrace swimming pool, and an in-compound Jain Derasar.',
    features: [
      'Joint development by Adani Realty and Marathon Group spanning approx. 12.5 acres',
      'Master planning and architecture envisioned by master architect Hafeez Contractor',
      'Tower A: Occupancy Certificate (OC) received up to the 64th floor (Ready to Move In)',
      'Tower B: Occupancy Certificate (OC) received up to the 45th floor',
      'Podium beach with real sand and Amazon-themed landscaping for resort-style living',
      'Terrace swimming pool, Jain Derasar, and sports pavilions inside the private estate'
    ],
    amenities: [
      'Podium Beach with Real Sand & Cabanas',
      'Amazon-Themed Landscaped Sanctuary',
      'Terrace Swimming Pool with Skyline Views',
      'Jain Derasar on Premises',
      'Grand Multi-Storey Clubhouse & Wellness Spa',
      'Full-Sized Tennis Court & Badminton Courts',
      'Indoor Games Salon & Bowling Alley',
      'Private Screening Theatre & Banquet Halls',
      'Children’s Themed Playground & Skating Rink',
      'Pet Park & Sensory Walkways'
    ],
    nearby: [
      { label: 'Byculla Railway Station', distance: '4 mins' },
      { label: 'Rani Baug / Jijamata Udyan', distance: '3 mins' },
      { label: 'Eastern Freeway Entry', distance: '4 mins' },
      { label: 'Lower Parel Commercial Hub', distance: '8 mins' },
      { label: 'Masina Hospital & K.E.M. Hospital', distance: '5 mins' },
      { label: 'South Mumbai CBD (Fort / Nariman Pt)', distance: '15 mins' }
    ],
    possession: 'Ready OC Inventory (Tower A & B) / Phased up to 2027',
    constructionStatus: 'Ready Possession',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'Tower 4: P51800001585 | Tower 3: P51800001681 | Tower 5: P51900001346 | Tower 6: P51800002818',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    towerBreakdown: [
      { name: 'Tower A', storeys: 'OC Received up to 64th Floor (Ready Inventory)' },
      { name: 'Tower B', storeys: 'OC Received up to 45th Floor' },
      { name: 'Titlis / Pilatus / Zermatt Towers', storeys: 'Under Construction (Possession options up to 2027)' }
    ],
    phaseReraBreakdown: [
      {
        phase: 'Tower 4 (Tower A)',
        towerOrWing: 'Tower A',
        reraNumber: 'P51800001585',
        possession: 'OC Received up to 64th Floor',
        status: 'Ready Possession (OC Received)',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Tower 3 (Tower B)',
        towerOrWing: 'Tower B',
        reraNumber: 'P51800001681',
        possession: 'OC Received up to 45th Floor',
        status: 'Ready Possession (Part OC)',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Tower 5',
        towerOrWing: 'Tower 5',
        reraNumber: 'P51900001346',
        possession: 'Phased Handover 2026–2027',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Tower 6',
        towerOrWing: 'Tower 6',
        reraNumber: 'P51800002818',
        possession: 'Phased Handover 2027',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Titlis',
        towerOrWing: 'Wing Titlis',
        reraNumber: 'P51900048944',
        possession: 'RERA Timeline 2027',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Pilatus',
        towerOrWing: 'Wing Pilatus',
        reraNumber: 'P51900049688',
        possession: 'RERA Timeline 2027',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Zermatt',
        towerOrWing: 'Wing Zermatt',
        reraNumber: 'P51900033347',
        possession: 'RERA Timeline 2027',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      }
    ],
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-06T10:00:00Z',
    badgeText: 'READY OC & 12.5 ACRES',
    ctaPrimaryText: 'VIEW PROJECT DETAILS',
    disclaimerText: 'Occupancy Certificate is granted floor-wise and tower-wise. Tower A has received OC up to the 64th floor; Tower B has received OC up to the 45th floor. Other inventory is under construction with deliveries extending up to 2027. Carpet areas shown are RERA carpet as per approved plans.'
  },

  // 4. EMBASSY CITADEL — WORLI
  {
    id: 'prop-embassy-citadel',
    slug: 'embassy-citadel-worli',
    title: 'Embassy Citadel',
    developer: 'Embassy Developments Limited',
    subheading: 'ULTRA-LUXURY MONOLITHIC TOWER ON DR. E. MOSES ROAD',
    mainHeadline: 'One Million Sq. Ft. of Pure Luxury and 100,000 Sq. Ft. of Curated Lifestyle.',
    tagline: 'An ultra-luxury single-tower landmark in Worli featuring approx. 1 million sq. ft. RERA carpet area, 100,000 sq. ft. of amenities across 7 levels, and panoramic views of the Arabian Sea and Racecourse.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 0,
    priceDisplay: 'Price on Request',
    isPriceIndicative: false,
    priceRevisionNote: 'Bespoke price and floor elevation details available upon confidential inquiry.',
    location: 'Dr. E. Moses Road, Worli Naka, Worli, South Mumbai, Mumbai 400018',
    locality: 'Worli',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 5,
    carpetArea: '3, 4, 5 BHK & Exclusive Triplex Mansions',
    configurationsAvailable: [
      '3 BHK / 3 BHK + Study Residences',
      '4 BHK Ultra-Luxury Residences',
      '5 BHK Grand Palatial Suites',
      'Exclusive Triplex Mansion Residences'
    ],
    floorPlanDetails: [
      {
        configuration: '3 BHK / 3 BHK + Study',
        carpetArea: 'Generous 3 Bed + Study Layout',
        description: 'Private elevator entrance, separate study retreat, floor-to-ceiling glass balconies overlooking the skyline.',
        image: '/images/properties/embassy-citadel-interior.png'
      },
      {
        configuration: '4 BHK Ultra-Luxury Residence',
        carpetArea: 'Expansive 4 Bed Panoramic Residence',
        description: 'Grand reception living salon, wrap-around sunset deck with Arabian Sea vistas, and private staff quarters.',
        image: '/images/properties/embassy-citadel-deck.png'
      },
      {
        configuration: '5 BHK Grand Palatial Suite',
        carpetArea: 'Palatial 5 Bed Single-Floor Residence',
        description: 'Dual living salons, private dining room, bespoke master wing with his/her wardrobes, and racecourse views.',
        image: '/images/properties/embassy-citadel-lobby.png'
      },
      {
        configuration: 'Exclusive Triplex Mansion Residence',
        carpetArea: 'Custom Ultra-Luxury Triplex Mansion',
        description: 'Three-level private sky mansion featuring double-height volumes, private lap pool terrace, and dedicated internal elevator.',
        image: '/images/properties/embassy-citadel-worli.jpg'
      }
    ],
    images: [
      '/images/properties/embassy-citadel-worli.jpg',
      '/images/properties/embassy-citadel-deck.png',
      '/images/properties/embassy-citadel-lobby.png',
      '/images/properties/embassy-citadel-interior.png'
    ],
    creativeImage: '/images/properties/embassy-citadel-worli.jpg',
    description: 'Embassy Citadel marks the Embassy Group’s flagship ultra-luxury residential statement in Mumbai. Located on prime Dr. E. Moses Road in Worli, this soaring single-tower marvel encompasses approximately 1 million sq. ft. of RERA carpet area and over 100,000 sq. ft. of ultra-exclusive amenities spread across seven dedicated levels. Offering unobstructed 270-degree panoramas of the Arabian Sea, Mumbai skyline, and the lush Mahalaxmi Racecourse.',
    features: [
      'Iconic single-tower ultra-luxury development with private residence lobbies',
      'Approximately 1 million sq. ft. of total RERA carpet area across the project',
      'Over 100,000 sq. ft. of world-class lifestyle amenities across 7 dedicated levels',
      'Five-level signature resident clubhouse and grand triple-height arrival court',
      'Dual panoramic vistas encompassing the Arabian Sea and Mahalaxmi Racecourse',
      'Exclusive offering includes standard 3, 4, 5 BHK suites and bespoke Triplex Sky Mansions'
    ],
    amenities: [
      'Seven Amenity Levels & 5-Level Clubhouse',
      'Temperature-Controlled Indoor & Outdoor Swimming Pools',
      'Luxury Spa, Hydrotherapy & Wellness Enclaves',
      'High-Tech Fitness Studio & Private Pilates Enclave',
      'Indoor Sports Courts, Padel Court & Squash Court',
      'Private 4-Lane Bowling Alley',
      'Private AV / Screening Theatre Suite',
      'Open-Air Yoga & Meditation Sky Deck',
      'Signature Sky Lounge with Arabian Sea Panoramas',
      'Executive Boardrooms & Resident Dining Salons'
    ],
    nearby: [
      { label: 'Four Seasons Hotel Mumbai', distance: '2 mins' },
      { label: 'Phoenix Palladium & The St. Regis', distance: '4 mins' },
      { label: 'Mahalaxmi Racecourse', distance: '5 mins' },
      { label: 'Worli Sea Face Promenade', distance: '5 mins' },
      { label: 'Bandra–Worli Sea Link Entrance', distance: '7 mins' },
      { label: 'Lower Parel Financial District', distance: '4 mins' }
    ],
    possession: 'Under Construction (MahaRERA: Oct 2034)',
    possessionRera: 'October 2034 (MahaRERA statutory completion target)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'PR1170002501931',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    phaseReraBreakdown: [
      {
        phase: 'Embassy Citadel Tower',
        towerOrWing: 'Main Ultra-Luxury Tower',
        reraNumber: 'PR1170002501931',
        possession: 'October 2034 (MahaRERA Proposed Target)',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      }
    ],
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-09T10:00:00Z',
    badgeText: 'ULTRA-LUXURY WORLI',
    ctaPrimaryText: 'VIEW PROJECT DETAILS',
    disclaimerText: 'Embassy Citadel is registered under MahaRERA PR1170002501931. Status is actively under construction. RERA proposed completion date is October 2034. Triplex mansion and apartment availability is strictly upon developer confirmation.'
  },

  // 5. HUBTOWN 25 SOUTH — PRABHADEVI
  {
    id: 'prop-hubtown-25-south',
    slug: 'hubtown-25-south-prabhadevi',
    title: 'Hubtown 25 South',
    developer: 'Hubtown Limited',
    subheading: 'PRABHADEVI’S 5.3-ACRE SEAFRONT SANCTUARY',
    mainHeadline: 'G+57 Storeys of Rare Coastal Majesty Opposite Shree Siddhivinayak Temple.',
    tagline: 'An iconic 5.3-acre residential development rising G+57 storeys by the bay in Prabhadevi, offering bespoke residences, expansive sea views, and extensive resort amenities.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 0,
    priceDisplay: 'Price on Request',
    isPriceIndicative: false,
    priceRevisionNote: 'Phase-specific and floor-specific pricing available on request.',
    location: 'Yadav Patel Lane, Off Veer Savarkar Marg, Prabhadevi, South Mumbai 400025',
    locality: 'Prabhadevi',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 4,
    carpetArea: '3, 4, 4.5 BHK & 6 BHK Bespoke Duplexes',
    configurationsAvailable: [
      '3 BHK — approx. 1,716 sq. ft.',
      '4 BHK — approx. 2,188–2,832 sq. ft.',
      '4.5 BHK — approx. 4,334 sq. ft.',
      '6 BHK Bespoke Duplex Residences'
    ],
    floorPlanDetails: [
      {
        configuration: '3 BHK Sea-View Residence',
        carpetArea: 'approx. 1,716 sq. ft. RERA Carpet',
        description: 'Large horizontal living room overlooking the bay, master suite with walk-in closet, and spacious secondary suites.',
        image: '/images/properties/hubtown-25-south-bay.webp'
      },
      {
        configuration: '4 BHK Luxury Bayfront Suite',
        carpetArea: '2,188–2,832 sq. ft. RERA Carpet',
        description: 'Corner residence with expansive wrap-around ocean views, chef’s kitchen, and dedicated staff quarters.',
        image: '/images/properties/hubtown-25-south-prabhadevi.jpg'
      },
      {
        configuration: '4.5 BHK Grand Horizon Home',
        carpetArea: 'approx. 4,334 sq. ft. RERA Carpet',
        description: 'Double-volume entertaining areas, private family lounge, and sea-facing master sanctuary.',
        image: '/images/properties/hubtown-25-south-amenities.webp'
      },
      {
        configuration: '6 BHK Bespoke Duplex',
        carpetArea: 'Custom Duplex Penthouse Floorplan',
        description: 'Monumental duplex residence spanning two upper levels with private sky terrace and panoramic vistas.',
        image: '/images/properties/hubtown-25-south-bay.webp'
      }
    ],
    images: [
      '/images/properties/hubtown-25-south-prabhadevi.jpg',
      '/images/properties/hubtown-25-south-bay.webp',
      '/images/properties/hubtown-25-south-amenities.webp',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    creativeImage: '/images/properties/hubtown-25-south-prabhadevi.jpg',
    description: 'Hubtown 25 South is a rare 5.3-acre waterfront sanctuary positioned in prestigious Prabhadevi, directly overlooking the Arabian Sea and immediately adjacent to the iconic Shree Siddhivinayak Temple. Rising to G+57 storeys, the project features bespoke horizontal residences by the bay, soaring ceiling heights, meticulously themed landscaped grounds, and a complete suite of resort amenities managed to international luxury standards.',
    features: [
      'Rare 5.3-acre coastal land parcel in Prabhadevi rising G+57 storeys',
      'Uninterrupted Arabian Sea bay views, Worli sea face vistas, and city skyline',
      'Prestigious spiritual and cultural address opposite Shree Siddhivinayak Temple',
      'Expansive apartment footprints spanning 3 BHK (1,716 sq.ft.) up to 6 BHK duplexes',
      'Multiple MahaRERA-registered phases ensuring statutory transparency',
      'Resort-style lifestyle amenities with themed landscaping and seaside meditation deck'
    ],
    amenities: [
      'Seafront Horizon Swimming Pool & Sunken Lounges',
      'Tranquil Meditation Corner & Zen Reflexology Gardens',
      'Multipurpose Outdoor Sports Arena',
      'Open-Air Amphitheatre for Community Events',
      'Children’s Discovery Play Arena',
      'Themed Landscaped Gardens & Shaded Pergolass',
      'Outdoor Barbecue & Entertaining Terraces',
      'Dedicated Senior Citizens Pavilion',
      'World-Class Health Club & Fitness Studio',
      'Wellness Spa, Sauna & Treatment Enclaves',
      'Private Banquet Hall & Party Suites',
      'International-Standard Squash Court'
    ],
    nearby: [
      { label: 'Shree Siddhivinayak Temple', distance: '2 mins walking' },
      { label: 'Prabhadevi Railway Station', distance: '5 mins' },
      { label: 'Dadar Shivaji Park', distance: '7 mins' },
      { label: 'Worli Sea Face Promenade', distance: '6 mins' },
      { label: 'Bandra–Worli Sea Link Interchange', distance: '8 mins' },
      { label: 'Phoenix Palladium Mall', distance: '10 mins' },
      { label: 'P.D. Hinduja Hospital', distance: '8 mins' }
    ],
    possession: 'Phase-wise Possession (Please enquire for specific tower timelines)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'Phase 1: P51900006860 | Phase 2: P51900011418 | Phase 3: P51900030729',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    phaseReraBreakdown: [
      {
        phase: 'Phase 1 (Lower Floors)',
        towerOrWing: 'Plinth to 10th Floor',
        reraNumber: 'P51900006860',
        possession: 'Nearing Completion / Handover in Progress',
        status: 'Nearing Completion',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Phase 2 (Upper Floors)',
        towerOrWing: '11th to 47th Floors',
        reraNumber: 'P51900011418',
        possession: 'Projected Phase Handover',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Phase 3 (Extended Wings)',
        towerOrWing: 'Tower North / Central',
        reraNumber: 'P51900030729',
        possession: 'Projected Phase Handover',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Wing Additional Approvals',
        towerOrWing: 'Phase 2A / Wings',
        reraNumber: 'P51900025184',
        possession: 'Consult Advisor for Details',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      },
      {
        phase: 'Wing Additional Approvals',
        towerOrWing: 'Phase 2B / Wings',
        reraNumber: 'P51900030600',
        possession: 'Consult Advisor for Details',
        status: 'Under Construction',
        link: 'https://maharera.maharashtra.gov.in/'
      }
    ],
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-05T10:00:00Z',
    badgeText: 'PRABHADEVI SEAFRONT',
    ctaPrimaryText: 'VIEW PROJECT DETAILS',
    disclaimerText: 'Hubtown 25 South consists of multiple phased registrations under MahaRERA (P51900006860, P51900011418, P51900030729, P51900025184, P51900030600). Possession timelines and availability differ by phase and tower. Please enquire for verified phase-wise inventory.'
  },

  // 6. RUNWAL RAAYA — WORLI
  {
    id: 'prop-runwal-raaya',
    slug: 'runwal-raaya-worli',
    title: 'Runwal Raaya',
    developer: 'Runwal Realty',
    subheading: '5 Acres of Private Luxury. One Exceptional Address.',
    mainHeadline: '5 Acres of Private Luxury. One Exceptional Address.',
    tagline: 'Discover an exclusive residential address in Worli, designed for those who appreciate space, privacy and refined urban living.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 95000000,
    priceDisplay: 'Price on Enquiry',
    isPriceIndicative: true,
    priceRevisionNote: 'Looking for the latest pricing and available residences?',
    location: 'Worli, Mumbai',
    locality: 'Worli',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 4,
    carpetArea: '4 & 5 Bed Private Residences',
    configurationsAvailable: ['4 BHK Private Residences', '5 BHK Private Residences'],
    landParcel: '5 Acres',
    clubhouseDetails: '35,000 sq. ft. Clubhouse',
    images: [
      '/images/properties/runwal-raaya-worli.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_clubhouse_1785684842599.jpg',
      '/images/hero_architecture_1785684802035.jpg'
    ],
    creativeImage: '/images/properties/runwal-raaya-worli.jpg',
    description: 'Discover an exclusive residential address in Worli, designed for those who appreciate space, privacy and refined urban living. Set across a rare 5-acre private sanctuary in South Mumbai, Runwal Raaya presents 300 private residences with private elevators, dedicated arrival lobbies, an infinity-edge wellness pool, and four distinct curated amenity zones.',
    features: [
      'Rare 5-acre low-density private luxury sanctuary in Worli',
      'Exclusive collection of only 300 private residences',
      'Lavish 35,000 sq. ft. clubhouse with lifestyle zones',
      'Private elevators and dedicated individual floor lobbies',
      'Infinity-edge wellness temperature-regulated pool',
      'Four distinct curated amenity and wellness zones'
    ],
    amenities: [
      '35,000 sq. ft. Signature Clubhouse',
      'Infinity-Edge Wellness Pool',
      'Private Elevators & High-Speed Lobbies',
      'Four Curated Lifestyle Zones',
      'Wellness Spa & Steam Enclaves',
      'Private Screening Theatre & Banquet Hall',
      'Landscaped Walking Loops & Gardens',
      'Children Discovery Arena'
    ],
    nearby: [
      { label: 'Bandra-Worli Sea Link', distance: '5 mins' },
      { label: 'Worli Sea Face Promenade', distance: '3 mins' },
      { label: 'The St. Regis Mumbai & Palladium', distance: '7 mins' },
      { label: 'Lower Parel Commercial District', distance: '6 mins' }
    ],
    possession: 'Under Construction (RERA Timeline)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'P51900080252 & P51900080218',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-01T10:00:00Z',
    specificEnquiryType: 'raaya'
  },

  // 2. PIRAMAL ARANYA — BYCULLA
  {
    id: 'prop-piramal-aranya',
    slug: 'piramal-aranya-byculla',
    title: 'Piramal Aranya',
    developer: 'Piramal Realty',
    subheading: 'Nature. Heritage. Luxury.',
    mainHeadline: 'A rare address where nature, heritage and modern living come together.',
    tagline: 'Experience a distinctive residential address where green surroundings, Mumbai\'s heritage and contemporary luxury come together.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 38900000,
    priceDisplay: '₹ 3.89 Cr++ Onwards',
    isPriceIndicative: true,
    disclaimerText: 'Prices and availability are subject to confirmation. Please contact our property advisory team for current offers and applicable charges.',
    location: 'E.S. Patanwala Road, Byculla, near Rani Baug, Mumbai',
    locality: 'Byculla',
    city: 'Mumbai',
    bedrooms: 2,
    bathrooms: 2,
    carpetArea: '2, 3, 4 & 5 BHK Residences',
    configurationsAvailable: ['2 BHK Residences', '3 BHK Residences', '4 BHK Residences', '5 BHK Luxury Suites'],
    towerBreakdown: [
      { name: 'Tower 1 (Arav)', storeys: 'G + 72 Storeys' },
      { name: 'Tower 2 (Avyan)', storeys: 'G + 45 Storeys' },
      { name: 'Tower 3 (Ahan)', storeys: 'G + 41 Storeys' },
      { name: 'Tower 4', storeys: 'G + 50 Storeys' }
    ],
    images: [
      '/images/properties/piramal-aranya-byculla.jpg',
      '/images/project_exterior_1785684820308.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    creativeImage: '/images/properties/piramal-aranya-byculla.jpg',
    description: 'Experience a distinctive residential address where green surroundings, Mumbai\'s heritage and contemporary luxury come together. Towering over the verdant 60-acre Rani Baug botanical gardens and the Mumbai eastern harbour, Piramal Aranya offers ready and near-possession luxury residences with dual panoramas and unmatched architectural craftsmanship.',
    features: [
      'Unobstructed vistas of 60-acre Rani Baug Botanical Gardens',
      'Four iconic residential towers soaring up to G+72 storeys',
      'OC Received for select inventory and nearing possession',
      'Starting price from ₹3.89 crore onwards for 2 BHK',
      'Heritage South Mumbai address with immediate Eastern Freeway connectivity',
      'Extensive multi-tier wellness, sports, and recreational facilities'
    ],
    amenities: [
      'Grand Double-Height Entrance Lobbies',
      'Olympic-Length Swimming Pool & Kids Pool',
      'Cricket Pitch & Multi-Sport Courts',
      'Spa, Steam & Wellness Enclaves',
      'Private Screening Theatre & Banquet Rooms',
      'Library Lounge & Senior Citizens Pavilion',
      'Gymnasium with International Equipment',
      'Lush Landscaped Nature Trails'
    ],
    nearby: [
      { label: 'Rani Baug Botanical Gardens', distance: 'Across the road' },
      { label: 'Eastern Freeway Entrance', distance: '3 mins' },
      { label: 'Byculla Railway Station', distance: '4 mins' },
      { label: 'Lower Parel Commercial Hub', distance: '10 mins' },
      { label: 'Fort / South Mumbai CBD', distance: '12 mins' }
    ],
    possession: 'OC Received & Nearing Possession',
    constructionStatus: 'Ready Possession',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'P51900003324, P51900018039, P51900020330',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-02T10:00:00Z',
    specificEnquiryType: 'aranya'
  },

  // 3. THE MINERVA — SOUTH MUMBAI
  {
    id: 'prop-minerva',
    slug: 'minerva-south-mumbai',
    title: 'The Minerva',
    developer: 'Shapoorji Pallonji / Lokhandwala',
    subheading: 'South Mumbai\'s Finest Address.',
    mainHeadline: 'A Legacy Above All Horizons.',
    tagline: 'Rare by nature, reserved for the few. Unmatched dual panoramas of Mahalaxmi Racecourse and the Arabian Sea.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 85000000,
    priceDisplay: 'Price on Enquiry',
    isPriceIndicative: true,
    location: 'Minerva Road, off N.M. Joshi Marg, Mahalaxmi / South Mumbai',
    locality: 'Mahalaxmi',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 4,
    carpetArea: 'Expansive 3.5, 4 & 5 BHK Sky Mansions',
    configurationsAvailable: ['3.5 BHK Sky Residences', '4 BHK Luxury Mansions', '5 BHK Duplex Penthouses'],
    images: [
      '/images/properties/minerva-south-mumbai.jpg',
      '/images/hero_architecture_1785684802035.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    creativeImage: '/images/properties/minerva-south-mumbai.jpg',
    description: 'A soaring architectural landmark rising majestically above South Mumbai. Offering dual-aspect vistas across the emerald expanse of the 225-acre Mahalaxmi Racecourse and the vast horizon of the Arabian Sea. The Minerva is crafted for connoisseurs of monumental scale, bespoke privacy, and commanding skyline presence.',
    features: [
      'Sweeping 225-acre Mahalaxmi Racecourse vistas',
      'Uninterrupted Arabian Sea panoramic sunset views',
      'Iconic dual-tower skyscraper architecture in South Mumbai',
      'Ultra-exclusive sky mansions with private observation decks',
      'Multi-level podium parking and grand triple-height arrival lobby'
    ],
    amenities: [
      'Temperature-Controlled Sky Infinity Pool',
      'Bespoke Concierge & Valet Desk',
      'Private Cigar & Wine Tasting Lounge',
      'World-Class Technogym Fitness Sanctuary',
      'Outdoor Meditation Deck & Sky Terraces',
      'Private Dining & Event Banquet Suites',
      'Squash Court & Indoor Games Salon'
    ],
    nearby: [
      { label: 'Mahalaxmi Racecourse', distance: 'Directly Overlooking' },
      { label: 'Willingdon Sports Club', distance: '4 mins' },
      { label: 'Lower Parel Financial District', distance: '5 mins' },
      { label: 'Marine Drive / Nariman Point', distance: '15 mins' }
    ],
    possession: 'Under Construction (RERA Timeline)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'P51900008204',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-03T10:00:00Z',
    specificEnquiryType: 'minerva'
  },

  // 4. THE ADDRESS BY GS — WADALA
  {
    id: 'prop-the-address-gs',
    slug: 'the-address-by-gs-wadala',
    title: 'The Address by GS',
    developer: 'Raymond Realty',
    subheading: 'THE ART OF AN ADDRESS',
    mainHeadline: 'An exquisite welcome into a world of your own.',
    tagline: 'An exquisite welcome into a world of your own. 2 & 3 Bed luxury residences situated at the nexus of Central and South Mumbai.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 24600000,
    priceDisplay: '₹ 2.46 Cr* (All Incl) Onwards',
    isPriceIndicative: true,
    disclaimerText: '*Price of ₹2.46 Cr (all-inclusive) is indicative as stated in developer creative, subject to confirmation with our advisory team for current inventory, floor rise, and charges.',
    location: 'Wadala / Sion, Central Mumbai',
    locality: 'Wadala',
    city: 'Mumbai',
    bedrooms: 2,
    bathrooms: 2,
    carpetArea: '2 & 3 Bedroom Luxury Homes',
    configurationsAvailable: ['2 Bed Luxury Residences', '3 Bed Luxury Residences with Balconies'],
    images: [
      '/images/properties/the-address-by-gs-wadala.jpg',
      '/images/project_clubhouse_1785684842599.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_exterior_1785684820308.jpg'
    ],
    creativeImage: '/images/properties/the-address-by-gs-wadala.jpg',
    description: 'An exquisite welcome into a world of your own by Raymond Realty. Positioned in the prime connectivity hub of Wadala, The Address by GS combines visionary curvilinear architecture, sprawling lifestyle club facilities, and rapid transit access to BKC, Lower Parel, and South Mumbai via the Eastern Freeway and Monorail.',
    features: [
      '2 & 3 Bed luxury residences starting at ₹2.46 Cr (All Inclusive, Indicative)',
      'Sculptural organic architectural facade and grand arrival portico',
      'Grand lifestyle clubhouse with signature Raymond hospitality touches',
      'Central location offering 15-minute reach to BKC, Fort, and Lower Parel',
      'High-floor configurations with panoramic city skyline and harbour vistas'
    ],
    amenities: [
      'Signature Grand Clubhouse',
      'Temperature-Regulated Swimming Pool',
      'Squash & Badminton Courts',
      'Landscaped Reflexology Garden',
      'High-Tech Co-working Business Hub',
      'Dedicated Yoga & Aerobics Studio',
      'Indoor Children Play Lounge'
    ],
    nearby: [
      { label: 'Eastern Freeway Wadala Ramp', distance: '3 mins' },
      { label: 'Bandra-Kurla Complex (BKC) Connector', distance: '12 mins' },
      { label: 'Lower Parel Commercial District', distance: '12 mins' },
      { label: 'Wadala Monorail Station', distance: '2 mins' }
    ],
    possession: 'Under Construction (Projected 2031)',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Unfurnished',
    reraNumber: 'PR1170002501879',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-04T10:00:00Z',
    specificEnquiryType: 'address-gs'
  },

  // 5. IMPERIAL TOWER 3 — TARDEO, SOUTH MUMBAI
  {
    id: 'prop-imperial-tower-3',
    slug: 'imperial-tower-3-tardeo',
    title: 'Imperial Tower 3',
    developer: 'Shapoorji Pallonji Real Estate',
    subheading: 'THE CITY. PERFECTLY CONNECTED.',
    mainHeadline: 'A New Perspective on Elevated Living.',
    tagline: 'Explore spacious residences, expansive balconies and an elevated residential experience in one of Mumbai\'s landmark developments.',
    category: 'primary',
    propertyType: 'Apartment',
    price: 120000000,
    priceDisplay: 'Price on Enquiry',
    isPriceIndicative: true,
    disclaimerText: 'Floor availability (between 33rd and 60th floors) and configurations are subject to confirmation with our advisory team. RERA-stated possession timeline: March 2033, subject to verification against the registered project details (Internal target: March 2032).',
    location: 'B.B. Nakashe Marg, M.P. Mill Compound, Tardeo, South Mumbai',
    locality: 'Tardeo',
    city: 'Mumbai',
    bedrooms: 4,
    bathrooms: 5,
    carpetArea: '4 BHK (2,046 to 2,849 sq.ft.)',
    configurationsAvailable: [
      '4 BHK — 2,046 sq. ft. (33rd–45th floors)',
      '4 BHK — 2,697–2,849 sq. ft. (47th–60th floors)'
    ],
    landParcel: 'Approx. 2.13 Acres',
    habitableFloors: 'Ground floor + 13-storey podium + triple-height green zone + 3-level clubhouse + 52 habitable storeys (19th floor is first habitable floor)',
    availableFloors: 'Residences available between 33rd and 60th floors (subject to confirmation)',
    clubhouseDetails: 'Three-level clubhouse with dedicated lifestyle amenities',
    balconyDetails: 'Expansive private balconies up to 700 sq. ft.',
    ceilingHeight: '11-foot finished floor-to-ceiling heights',
    possessionRera: 'March 2033',
    possessionInternal: 'March 2032',
    images: [
      '/images/properties/imperial-tower-3-tardeo.jpg',
      '/images/hero_architecture_1785684802035.jpg',
      '/images/project_interior_1785684832928.jpg',
      '/images/project_clubhouse_1785684842599.jpg'
    ],
    creativeImage: '/images/properties/imperial-tower-3-tardeo.jpg',
    description: 'A monumental addition to South Mumbai\'s most prestigious skyline. Set across an expansive 2.13-acre enclave in Tardeo, Imperial Tower 3 (Wing C) offers expansive 4-bedroom residences beginning from the 19th floor upwards, featuring soaring 11-foot ceilings, massive private balconies up to 700 sq.ft., and a 3-level clubhouse with direct connectivity to the Mumbai Coastal Road and South Mumbai business centers.',
    features: [
      '2.13-acre prime South Mumbai land parcel',
      'Ground + 13-storey podium + triple-height green zone + 3-level clubhouse + 52 habitable storeys',
      'First habitable floor begins on the 19th floor ensuring dramatic city & sea views',
      'Available inventory on premier high floors: 33rd to 60th floors (subject to confirmation)',
      '4 BHK — 2,046 sq. ft. (33rd–45th floors) & 4 BHK — 2,697–2,849 sq. ft. (47th–60th floors)',
      'Expansive private balconies up to 700 sq. ft. with Vastu-compliant layouts',
      'Impressive 11-foot finished floor-to-ceiling heights throughout',
      'RERA-stated possession timeline: March 2033, subject to verification against registered project details (Internal target: March 2032)'
    ],
    amenities: [
      'Three-Level Designer Clubhouse',
      'Rooftop Heated Wellness Pool',
      'Triple-Height Landscaped Green Zone',
      'Private Resident Dining Suite',
      'Squash Court & Indoor Sports Arena',
      'Children Discovery & Recreation Hub',
      'Advanced Biometric Access & Concierge'
    ],
    nearby: [
      { label: 'Mumbai Coastal Road Interchange', distance: '3 mins' },
      { label: 'Haji Ali & Mahalaxmi', distance: '4 mins' },
      { label: 'Bandra-Worli Sea Link Entrance', distance: '8 mins' },
      { label: 'Breach Candy / Marine Drive', distance: '10 mins' }
    ],
    possession: 'March 2033 (RERA) / Target March 2032',
    constructionStatus: 'Under Construction',
    furnishingStatus: 'Semi-Furnished',
    reraNumber: 'PR1171012502413 (Imperial T3 Wing C)',
    reraRegistrationLink: 'https://maharera.maharashtra.gov.in/',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-03-05T10:00:00Z',
    specificEnquiryType: 'imperial'
  },

  // 6. RESALE SKY PENTHOUSE — WORLI
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
    isFeatured: false,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-01T11:30:00Z'
  },

  // 7. SECOND HOME — ALIBAUG COASTAL SANCTUARY
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
    isFeatured: false,
    isDemoData: true,
    verificationStatus: 'Demonstration Listing',
    published: true,
    createdAt: '2026-02-10T14:15:00Z'
  },

  // 8. LAND — LONAVALA VILLA PLOTS
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
      '/images/land/lonavala-whispering-pines-plots.jpg',
      '/images/land/land-hero-corridor.jpg'
    ],
    creativeImage: '/images/land/lonavala-whispering-pines-plots.jpg',
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

  // 9. RENTAL — THE BOTANICA SUITE BYCULLA
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
  },

  // 10. RAIGAD–PEN GROWTH CENTRE
  {
    id: 'prop-land-raigad-pen',
    slug: 'raigad-pen-growth-centre',
    title: 'RAIGAD–PEN GROWTH CENTRE',
    tagline: 'Proposed 1,217-acre government growth corridor across 16 villages in Pen taluka',
    category: 'land',
    propertyType: 'Plot',
    price: 0,
    priceDisplay: 'Development Corridor Advisory',
    location: 'Pen Taluka, Raigad District, Maharashtra',
    locality: 'Pen Taluka',
    city: 'Raigad District',
    images: [
      '/images/land/raigad-pen-growth-centre.jpg',
      '/images/land/land-hero-corridor.jpg'
    ],
    creativeImage: '/images/land/raigad-pen-growth-centre.jpg',
    description: 'Explore land opportunities around the proposed Raigad–Pen Growth Centre, a planned development initiative intended to support future urban and economic activity in the region.',
    features: [
      'Official MMRDA planned growth corridor spanning approx. 1,217.71 acres',
      'Territory covers 5 development clusters and 16 villages in Pen taluka',
      'Situated 25 km from Panvel and 30 km from Navi Mumbai Airport (NMIA)',
      'Integrated vision for residential, commercial, logistics, and education'
    ],
    amenities: [
      'Regional Road Connectivity',
      'MMRDA Master Plan Influence',
      'Proposed Infrastructure Corridors',
      'Bespoke Sourcing Advisory'
    ],
    nearby: [
      { label: 'Panvel Junction', distance: '25 km' },
      { label: 'Navi Mumbai International Airport (NMIA)', distance: '30 km' },
      { label: 'Mumbai-Goa Highway (NH-66)', distance: '10 mins' }
    ],
    possession: 'Corridor Planning Stage',
    constructionStatus: 'Newly Launched',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-10-29T10:00:00Z',
    badgeText: 'PROPOSED GROWTH CENTRE',
    ctaPrimaryText: 'EXPLORE OPPORTUNITY',
    planningAuthority: 'MMRDA (Mumbai Metropolitan Region Development Authority)',
    officialReferenceUrl: 'https://mmrda.maharashtra.gov.in/en/projects/additional/raigad/pen/growth/centre/ltd',
    disclaimerText: 'All planning parameters are governed by MMRDA notifications. The existence of a proposed government growth corridor does not mean every parcel is pre-approved for private construction. Independent legal and title verification is required before purchase.'
  },

  // 11. KSC NEW TOWN / MUMBAI 3.0
  {
    id: 'prop-land-ksc-mumbai-3',
    slug: 'ksc-new-town-mumbai-3',
    title: 'KSC NEW TOWN',
    subheading: 'MUMBAI 3.0',
    tagline: 'Karnala–Sai–Chirner notified New Town region across 323.44 sq. km',
    category: 'land',
    propertyType: 'Plot',
    price: 0,
    priceDisplay: 'New Town Strategic Corridor',
    location: 'Raigad District, Maharashtra',
    locality: 'Uran / Panvel / Pen',
    city: 'Raigad District',
    images: [
      '/images/land/ksc-new-town-mumbai-3.jpg',
      '/images/land/land-hero-corridor.jpg'
    ],
    creativeImage: '/images/land/ksc-new-town-mumbai-3.jpg',
    description: 'Discover land opportunities around KSC New Town, a planned urban development associated with the wider Mumbai Metropolitan Region. Explore suitable options with professional guidance and careful due diligence.',
    features: [
      'KSC represents the Karnala–Sai–Chirner regional growth corridor',
      'Notified New Town covers ~323.44 sq. km across 124 notified villages',
      'MMRDA designated as Special New Town Development Authority (NTDA)',
      'Direct influence zone of Atal Setu (MTHL) and regional transit'
    ],
    amenities: [
      'Direct Atal Setu Influence Zone',
      'NTDA Regional Planning Framework',
      'Port & Transit Proximity',
      'Title Scrutiny Coordination'
    ],
    nearby: [
      { label: 'Atal Setu (MTHL) Interchange', distance: '15 mins' },
      { label: 'JNPT Port', distance: '20 mins' },
      { label: 'Navi Mumbai International Airport', distance: '25 mins' }
    ],
    possession: 'New Town Notified Zone',
    constructionStatus: 'Newly Launched',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-10-29T10:00:00Z',
    badgeText: 'PLANNED NEW TOWN',
    ctaPrimaryText: 'EXPLORE OPPORTUNITY',
    planningAuthority: 'MMRDA (New Town Development Authority - NTDA)',
    officialReferenceUrl: 'https://mmrda.maharashtra.gov.in/en/planning/new-town-development-authority/overview',
    disclaimerText: 'Notified New Town designation designates a regional planning framework and does not signify that all regional land is available for private development. KLOUD REALTY does not promise future appreciation or guaranteed infrastructure completion dates. Comprehensive land-use checks are mandatory.'
  },

  // 12. PALI LAND OPPORTUNITIES
  {
    id: 'prop-land-pali',
    slug: 'pali-land-opportunities',
    title: 'PALI LAND OPPORTUNITIES',
    tagline: 'Scenic Raigad destination for private acreage, second homes, and rural retreats',
    category: 'land',
    propertyType: 'Plot',
    price: 0,
    priceDisplay: 'Price on Evaluation',
    location: 'Pali, Raigad District, Maharashtra',
    locality: 'Pali Valley',
    city: 'Raigad District',
    images: [
      '/images/land/pali-raigad-landscape.jpg'
    ],
    creativeImage: '/images/land/pali-raigad-landscape.jpg',
    description: 'Explore land opportunities in Pali, with options to be evaluated according to your intended use, location preferences, budget, and the applicable land-use requirements.',
    features: [
      'Picturesque Sahyadri foothill setting with lush seasonal streams and pure air',
      'Suited for private residential acreage, future second homes, and agrarian retreats',
      'Direct arterial accessibility via the Khopoli-Pali-Wakan highway',
      'Bespoke parcel discovery with boundary survey and title vetting'
    ],
    amenities: [
      'Scenic Mountain Views',
      'Natural River & Stream Proximity',
      'Quiet Agrarian Atmosphere',
      'Survey Demarcation Support'
    ],
    nearby: [
      { label: 'Khopoli-Pali Highway', distance: '3 mins' },
      { label: 'Ballaleshwar Pali Temple', distance: '8 mins' },
      { label: 'Adlabs Imagicaa', distance: '25 mins' }
    ],
    possession: 'Immediate Title Transfer',
    constructionStatus: 'Ready Possession',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-10-29T10:00:00Z',
    badgeText: 'EXPLORE LAND',
    ctaPrimaryText: 'REQUEST DETAILS',
    planningAuthority: 'Raigad District Collectorate / Local Gram Panchayat',
    officialReferenceUrl: 'https://raigad.gov.in/',
    disclaimerText: 'Pali represents an expansive geographical destination and not a single unified project. Land suitability for residential building or retreat development must be verified against revenue land classification (NA status), survey demarcation, right-of-way access, and water availability.'
  },

  // 13. KHOPOLI LAND & PLOTTED DEVELOPMENTS
  {
    id: 'prop-land-khopoli',
    slug: 'khopoli-land-plotted-developments',
    title: 'KHOPOLI LAND & PLOTTED DEVELOPMENTS',
    tagline: 'Strategically connected Mumbai–Pune gateway with emerging plotted communities',
    category: 'land',
    propertyType: 'Plot',
    price: 0,
    priceDisplay: 'Plotted Enclaves On Request',
    location: 'Khopoli, Raigad District, Maharashtra',
    locality: 'Khopoli Foothills',
    city: 'Raigad District',
    images: [
      '/images/land/khopoli-land-plotted.jpg'
    ],
    creativeImage: '/images/land/khopoli-land-plotted.jpg',
    description: 'Explore land and plotted-development opportunities around Khopoli, with a focus on location, access, property documentation, and suitability for your requirements.',
    features: [
      'Strategic position along the Mumbai–Pune Expressway corridor',
      'Emerging plotted enclave hub offering foothill vistas and clean environments',
      'Includes pre-launch announcements (e.g. Shapoorji Pallonji) with MahaRERA in progress',
      'Flexible options spanning demarcated private parcels to master-planned layouts'
    ],
    amenities: [
      'Expressway Rapid Transit',
      'Gated Community Layouts',
      'Clear-Boundary Demarcation',
      'Utility Access Feasibility'
    ],
    nearby: [
      { label: 'Mumbai-Pune Expressway', distance: '5 mins' },
      { label: 'Lonavala Ghats', distance: '18 mins' },
      { label: 'Khopoli Railway Station', distance: '8 mins' }
    ],
    possession: 'Plotted Layout Development',
    constructionStatus: 'Newly Launched',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-10-29T10:00:00Z',
    badgeText: 'LAND OPPORTUNITIES',
    ctaPrimaryText: 'REQUEST DETAILS',
    planningAuthority: 'Khopoli Municipal Council / Planning Authority',
    officialReferenceUrl: 'https://maharera.maharashtra.gov.in/',
    disclaimerText: 'Developer pre-launch plotted townships in Khopoli are in preliminary planning and statutory MahaRERA approval stages. No sales or commitments are executed without valid MahaRERA registration. Individual private parcels are subject to independent title verification.'
  },

  // 14. KARJAT SECOND HOMES
  {
    id: 'prop-second-home-karjat',
    slug: 'karjat-second-homes',
    title: 'KARJAT SECOND HOMES',
    tagline: 'Serene nature retreat destination amidst the Sahyadri foothills and perennial rivers',
    category: 'second-home',
    propertyType: 'Estate',
    price: 0,
    priceDisplay: 'Retreats & Land On Enquiry',
    location: 'Karjat, Maharashtra',
    locality: 'Karjat Foothills',
    city: 'Karjat',
    images: [
      '/images/second-homes/karjat-nature-retreat.jpg'
    ],
    creativeImage: '/images/second-homes/karjat-nature-retreat.jpg',
    description: 'Discover second-home opportunities around Karjat, from potential weekend retreats to suitable villa, bungalow, or land options for a future home.',
    features: [
      'Pristine Sahyadri foothill setting with lush greenery and clean air quality',
      '90-minute effortless drive from Mumbai & Navi Mumbai via expressway',
      'Three categories: Weekend Homes, Villa/Bungalows, and Land for Future Home',
      'Advisory assistance across NA certification, title history, and road access'
    ],
    amenities: [
      'Riverfront & Mountain Views',
      'Private Retreat Atmosphere',
      'Bespoke Sourcing Coordination',
      'Title Due-Diligence Support'
    ],
    nearby: [
      { label: 'Panvel-Karjat Highway', distance: '10 mins' },
      { label: 'Karjat Railway Station', distance: '12 mins' },
      { label: 'ND Studios', distance: '15 mins' }
    ],
    possession: 'Curated Sourcing Available',
    constructionStatus: 'Ready Possession',
    isFeatured: true,
    isDemoData: false,
    verificationStatus: 'Verified by KLOUD',
    published: true,
    createdAt: '2026-10-29T10:00:00Z',
    badgeText: 'SECOND HOMES',
    ctaPrimaryText: 'EXPLORE SECOND HOMES',
    planningAuthority: 'Karjat Planning Authority / Raigad Collectorate',
    disclaimerText: 'Not every plot in Karjat is suitable for immediate residential construction. Land classification, actual all-weather road access, and legal title must be verified on an individual basis before purchasing.'
  }
];
