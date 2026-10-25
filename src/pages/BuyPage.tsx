import React, { useState } from 'react';
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
                onScheduleVisit={(prop) => onOpenConsultation('Site Visit Scheduling', `Schedule Site Visit: ${prop.title}`, prop.id)}
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
