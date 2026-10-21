import React, { useState } from 'react';
import { Search, MapPin, Home, IndianRupee, ArrowRight } from 'lucide-react';

interface SearchBarProps {
  onSearch: (params: {
    intent: string;
    propertyType: string;
    locality: string;
    budget: string;
  }) => void;
  initialIntent?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialIntent = 'buy' }) => {
  const [intent, setIntent] = useState<'buy' | 'rent' | 'land'>(
    initialIntent === 'rent' ? 'rent' : initialIntent === 'land' ? 'land' : 'buy'
  );
  const [propertyType, setPropertyType] = useState('all');
  const [locality, setLocality] = useState('all');
  const [budget, setBudget] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      intent,
      propertyType,
      locality,
      budget
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-charcoal-900/90 backdrop-blur-xl border border-gold-500/30 rounded-sm shadow-luxury p-4 sm:p-6 text-softWhite overflow-hidden">
      
      {/* Intent Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'buy', label: 'Buy Properties' },
          { id: 'rent', label: 'Rent Residences' },
          { id: 'land', label: 'Explore Land & Retreats' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setIntent(tab.id as 'buy' | 'rent' | 'land')}
            className={`px-3.5 sm:px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all duration-200 whitespace-nowrap shrink-0 ${
              intent === tab.id
                ? 'bg-gold-500 text-charcoal-950 shadow-gold-glow'
                : 'text-warmGray hover:text-white hover:bg-charcoal-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Controls Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end">
        
        {/* Control 1: Property Type */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-warmGray font-medium flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-gold-400" />
            <span>Property Type</span>
          </label>
          <div className="relative">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-charcoal-800 border border-white/10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-xs text-softWhite outline-none appearance-none font-sans"
            >
              <option value="all">All Configurations</option>
              <option value="Apartment">Apartment</option>
              <option value="Penthouse">Sky Penthouse</option>
              <option value="Villa">Villa / Bungalow</option>
              <option value="Plot">Residential Plot</option>
              <option value="Commercial">Commercial Suite</option>
            </select>
          </div>
        </div>

        {/* Control 2: Preferred Location */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-warmGray font-medium flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400" />
            <span>Preferred Location</span>
          </label>
          <div className="relative">
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-charcoal-800 border border-white/10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-xs text-softWhite outline-none appearance-none font-sans"
            >
              <option value="all">All Locations (Mumbai & Beyond)</option>
              <option value="Mazgaon">Mazgaon (South Mumbai)</option>
              <option value="Byculla">Byculla East & West</option>
              <option value="Worli">Worli / Sea Face</option>
              <option value="Parel">Lower Parel & Parel</option>
              <option value="Alibaug">Alibaug (Coast & Retreats)</option>
              <option value="Lonavala">Lonavala (Sahyadri Foothills)</option>
            </select>
          </div>
        </div>

        {/* Control 3: Budget Range */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-warmGray font-medium flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-gold-400" />
            <span>Budget Range</span>
          </label>
          <div className="relative">
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full px-3 py-2.5 rounded bg-charcoal-800 border border-white/10 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 text-xs text-softWhite outline-none appearance-none font-sans"
            >
              <option value="all">Any Budget</option>
              {intent === 'rent' ? (
                <>
                  <option value="under-1l">Under ₹ 1 Lakh / mo</option>
                  <option value="1l-2.5l">₹ 1 – 2.5 Lakh / mo</option>
                  <option value="above-2.5l">Above ₹ 2.5 Lakh / mo</option>
                </>
              ) : (
                <>
                  <option value="under-1cr">Under ₹ 1 Crore</option>
                  <option value="1cr-2cr">₹ 1 – 2 Crore</option>
                  <option value="2cr-5cr">₹ 2 – 5 Crore</option>
                  <option value="above-5cr">Above ₹ 5 Crore</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Search Submit CTA */}
        <div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded bg-gold-500 text-charcoal-950 hover:bg-gold-400 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group"
          >
            <Search className="w-4 h-4 text-charcoal-950" />
            <span>Search Properties</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

      </form>
    </div>
  );
};
