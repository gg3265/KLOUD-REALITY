import os

# Helper to write files
def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {path}")

# ==========================================
# 1. BuyPage.tsx
# ==========================================
buy_code = """import React, { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Property } from '../types';
import { Filter, SlidersHorizontal, Compass, ArrowUpDown } from 'lucide-react';

interface BuyPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const BuyPage: React.FC<BuyPageProps> = ({ onOpenConsultation }) => {
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'primary' | 'resale'>('all');
  const [propertyType, setPropertyType] = useState('all');
  const [locality, setLocality] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');

  const filtered = propertyService.filterProperties({
    intent: 'buy',
    category: categoryFilter,
    propertyType,
    locality,
    bedrooms,
    sortBy
  });

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-white/10 pb-10 mb-10">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
            RESIDENTIAL SALES ADVISORY
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Find Your Next Address.
          </h1>
          <p className="text-sm text-warmGray max-w-2xl leading-relaxed">
            Explore properties that fit your needs, preferences, and plans across newly launched developments and verified resale residences in Mumbai and beyond.
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-charcoal-850 p-5 rounded-sm border border-white/10 mb-10 shadow-subtle space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Segment */}
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All For Sale' },
                { id: 'primary', label: 'Primary / New Launches' },
                { id: 'resale', label: 'Resale Properties' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCategoryFilter(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all ${
                    categoryFilter === tab.id
                      ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow'
                      : 'bg-charcoal-800 text-warmGray hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-charcoal-800 text-xs text-softWhite px-3 py-1.5 rounded border border-white/10 outline-none font-sans"
              >
                <option value="recent">Sort: Recently Added</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Secondary Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-warmGray mb-1">Locality</label>
              <select
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none font-sans"
              >
                <option value="all">All Localities</option>
                <option value="Mazgaon">Mazgaon (South Mumbai)</option>
                <option value="Byculla">Byculla</option>
                <option value="Worli">Worli</option>
                <option value="Parel">Parel & Lower Parel</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-warmGray mb-1">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none font-sans"
              >
                <option value="all">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-warmGray mb-1">Bedrooms</label>
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none font-sans"
              >
                <option value="all">Any Bedrooms</option>
                <option value="2">2+ BHK</option>
                <option value="3">3+ BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Primary Market', prop.title, prop.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded bg-charcoal-850 border border-white/10 max-w-2xl mx-auto my-12">
            <Compass className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-white mb-2">
              We're curating the right opportunities for you.
            </h3>
            <p className="text-xs text-warmGray max-w-md mx-auto mb-6">
              Tell us what you're looking for and our team will help you explore suitable properties matching your preferences.
            </p>
            <button
              onClick={() => onOpenConsultation('Primary Market')}
              className="px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              Request Property Assistance
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
"""
write_file("src/pages/BuyPage.tsx", buy_code)
# ==========================================
# 2. RentPage.tsx
# ==========================================
rent_code = """import React, { useState } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Compass, KeyRound } from 'lucide-react';

interface RentPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const RentPage: React.FC<RentPageProps> = ({ onOpenConsultation }) => {
  const rentalProperties = propertyService.getPropertiesByCategory('rental');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <KeyRound className="w-3.5 h-3.5" />
            <span>CURATED LEASING DESK</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Curated Rental Residences.
          </h1>
          <p className="text-sm text-warmGray max-w-2xl leading-relaxed">
            Discover premium rental residences suited for corporate leaders, expatriates, and families seeking refined appointments, prime connectivity, and transparent lease terms.
          </p>
        </div>

        {/* Results */}
        {rentalProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rentalProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Rental', prop.title, prop.id)}
              />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded bg-charcoal-850 border border-white/10 max-w-2xl mx-auto my-12">
            <Compass className="w-12 h-12 text-gold-400 mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-semibold text-white mb-2">
              We're curating the right opportunities for you.
            </h3>
            <p className="text-xs text-warmGray max-w-md mx-auto mb-6">
              Looking for a lease residence in South or Central Mumbai? Tell us your parameters and we will present off-market leasing opportunities.
            </p>
            <button
              onClick={() => onOpenConsultation('Rental')}
              className="px-6 py-2.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              Request Rental Assistance
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
"""
write_file("src/pages/RentPage.tsx", rent_code)

# ==========================================
# 3. PrimaryMarketPage.tsx
# ==========================================
primary_code = """import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Building2, CheckCircle2, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';

interface PrimaryMarketPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const PrimaryMarketPage: React.FC<PrimaryMarketPageProps> = ({ onOpenConsultation }) => {
  const primaryProperties = propertyService.getPropertiesByCategory('primary');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>VERTICAL 01</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            New Homes. New Possibilities.
          </h1>
          <p className="text-sm text-warmGray max-w-3xl leading-relaxed">
            Explore newly launched and under-construction residential developments across Mumbai. KLOUD REALTY offers transparent comparative analyses of layouts, developer reputations, construction milestones, and payment plans.
          </p>

          {/* Value Props Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">Direct Site Visits</span>
              <p className="text-xs text-warmGray">Accompanied private site and show-residence viewings.</p>
            </div>
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">MahaRERA Cross-Checking</span>
              <p className="text-xs text-warmGray">Review of registered project timelines and approvals.</p>
            </div>
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">Floor Plan Analysis</span>
              <p className="text-xs text-warmGray">True usable carpet area evaluation vs. super built-up claims.</p>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-light text-white mb-6">Available Primary Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {primaryProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Primary Market', prop.title, prop.id)}
              />
            ))}
          </div>
        </div>

        {/* Consultation Callout */}
        <div className="p-8 sm:p-10 rounded bg-charcoal-850 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-semibold text-white">Looking for a specific upcoming development?</h3>
            <p className="text-xs text-warmGray max-w-xl">
              We track new residential launches across Mazgaon, Byculla, Parel, Worli, and emerging growth corridors.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Primary Market')}
            className="px-6 py-3 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow shrink-0"
          >
            Coordinate Site Visit
          </button>
        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/PrimaryMarketPage.tsx", primary_code)
# ==========================================
# 4. ResalePage.tsx
# ==========================================
resale_code = """import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Home, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface ResalePageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const ResalePage: React.FC<ResalePageProps> = ({ onOpenConsultation }) => {
  const resaleProperties = propertyService.getPropertiesByCategory('resale');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Home className="w-3.5 h-3.5" />
            <span>VERTICAL 02</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            The Right Property, Already Waiting.
          </h1>
          <p className="text-sm text-warmGray max-w-3xl leading-relaxed">
            Secondary market acquisitions provide established housing societies, immediate possession, clear title chains, and realistic maintenance profiles. KLOUD REALTY represents discerning buyers and owners with rigorous documentation verification.
          </p>
        </div>

        {/* Listings */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-light text-white mb-6">Verified Resale Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resaleProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Secondary Market', prop.title, prop.id)}
              />
            ))}
          </div>
        </div>

        {/* Seller CTA Banner */}
        <div className="p-8 sm:p-10 rounded bg-charcoal-850 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold block">Are You A Property Owner?</span>
            <h3 className="font-serif text-2xl font-semibold text-white">Sell or Lease Your Mumbai Property Discreetly</h3>
            <p className="text-xs text-warmGray max-w-xl">
              We connect verified properties with pre-qualified buyers without noisy public broadcasts.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Secondary Market')}
            className="px-6 py-3 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow shrink-0"
          >
            Consult Our Sales Desk
          </button>
        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/ResalePage.tsx", resale_code)

# ==========================================
# 5. SecondHomesPage.tsx
# ==========================================
second_homes_code = """import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Trees, Sun, Compass, ShieldCheck } from 'lucide-react';

interface SecondHomesPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const SecondHomesPage: React.FC<SecondHomesPageProps> = ({ onOpenConsultation }) => {
  const secondHomes = propertyService.getPropertiesByCategory('second-home');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Trees className="w-3.5 h-3.5" />
            <span>VERTICAL 03</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Space to Escape. Room to Grow.
          </h1>
          <p className="text-sm text-warmGray max-w-3xl leading-relaxed">
            Discover tranquil second residences and coastal retreats around Mumbai. Whether seeking an architectural villa in Alibaug within minutes of Mandwa jetty or a family getaway in the hills, we guide you through title verification, road access, and private estate management.
          </p>
        </div>

        {/* Listings */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-light text-white mb-6">Curated Second-Home Estates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondHomes.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Second Homes & Land', prop.title, prop.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/SecondHomesPage.tsx", second_homes_code)

# ==========================================
# 6. LandPage.tsx
# ==========================================
land_code = """import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Compass, ShieldCheck, Map } from 'lucide-react';

interface LandPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const LandPage: React.FC<LandPageProps> = ({ onOpenConsultation }) => {
  const landList = propertyService.getPropertiesByCategory('land');

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Map className="w-3.5 h-3.5" />
            <span>LAND & PLOT ADVISORY</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Land and Plot Opportunities.
          </h1>
          <p className="text-sm text-warmGray max-w-3xl leading-relaxed">
            Acquiring clear-title residential land requires rigorous scrutiny of NA sanction orders, zone categorization, survey demarcations, and access rights. KLOUD REALTY coordinates due-diligence support to ensure you acquire land with absolute legal confidence.
          </p>

          <div className="mt-6 p-4 rounded bg-charcoal-850 border border-gold-500/30 text-xs text-warmGray leading-relaxed max-w-2xl">
            <strong className="text-gold-400 block mb-1">Our Land Policy:</strong>
            We do not speculate or make unsupported claims regarding future land price appreciation. All land opportunities presented have documented access, clear titles, and verified boundary surveys.
          </div>
        </div>

        {/* Listings */}
        <div className="mb-14">
          <h2 className="font-serif text-2xl font-light text-white mb-6">Demarcated Residential Plots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landList.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Second Homes & Land', prop.title, prop.id)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
"""
write_file("src/pages/LandPage.tsx", land_code)
