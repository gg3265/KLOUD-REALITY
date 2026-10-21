export type PropertyCategory = 
  | 'primary' 
  | 'resale' 
  | 'rental' 
  | 'second-home' 
  | 'land' 
  | 'redevelopment';

export type PropertyType = 
  | 'Apartment' 
  | 'Penthouse' 
  | 'Villa' 
  | 'Plot' 
  | 'Estate' 
  | 'Commercial';

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: PropertyCategory;
  propertyType: PropertyType;
  price: number;
  priceDisplay: string;
  location: string;
  locality: string;
  city: string;
  bedrooms?: number;
  bathrooms?: number;
  carpetArea?: string;
  plotArea?: string;
  images: string[];
  description: string;
  features: string[];
  amenities: string[];
  nearby: { label: string; distance: string }[];
  possession: string;
  constructionStatus: 'Ready Possession' | 'Under Construction' | 'Newly Launched' | 'Immediate Possession';
  furnishingStatus?: 'Unfurnished' | 'Semi-Furnished' | 'Fully Furnished';
  reraNumber?: string;
  isFeatured: boolean;
  isDemoData: boolean;
  verificationStatus: 'Verified by KLOUD' | 'Developer Verified' | 'Demonstration Listing';
  published: boolean;
  createdAt: string;
}

export type LeadSource = 
  | 'Entry Modal' 
  | 'Homepage Hero' 
  | 'Property Details' 
  | 'Buy Page' 
  | 'Rent Page' 
  | 'Second Homes' 
  | 'Land' 
  | 'Redevelopment' 
  | 'Contact Page' 
  | 'Navbar CTA';

export type ServiceVertical = 
  | 'Primary Market' 
  | 'Secondary Market' 
  | 'Second Homes & Land' 
  | 'Redevelopment Consulting' 
  | 'Rental' 
  | 'General Consultation';

export type ContactMethod = 'Phone Call' | 'WhatsApp' | 'Email';

export type LeadStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Qualified' 
  | 'Site Visit Scheduled' 
  | 'Negotiation' 
  | 'Converted' 
  | 'Closed';

export interface Lead {
  id: string; // e.g. KR-2026-10492
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  enquirySource: LeadSource;
  serviceVertical: ServiceVertical;
  preferredLocation: string;
  budgetRange: string;
  preferredContactMethod: ContactMethod;
  propertyId?: string;
  propertyTitle?: string;
  message?: string;
  leadStatus: LeadStatus;
  assignedTo?: string;
  notes?: string[];
  consentStatus: boolean;
  propertyRequirement?: string; // e.g. Consultancy for Redevelopment, Explore Redevelopment Opportunities
  roleInSociety?: string; // For redevelopment enquiries
  buildingAge?: string; // For redevelopment enquiries
  numberOfUnits?: string; // For redevelopment enquiries
}

export interface FilterState {
  intent: 'all' | 'buy' | 'rent' | 'land';
  category: 'all' | PropertyCategory;
  locality: string;
  propertyType: string;
  minBudget: number;
  maxBudget: number;
  bedrooms: string;
  searchQuery: string;
  sortBy: 'recent' | 'price-asc' | 'price-desc';
}
