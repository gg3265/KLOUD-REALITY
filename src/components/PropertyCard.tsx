import React, { useState } from 'react';
import { MapPin, Bed, Bath, Maximize2, ArrowRight, Heart, ShieldCheck, Info } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onEnquire: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEnquire }) => {
  const [isSaved, setIsSaved] = useState(() => {
    try {
      const saved = localStorage.getItem('kloud_saved_properties');
      return saved ? JSON.parse(saved).includes(property.id) : false;
    } catch {
      return false;
    }
  });

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem('kloud_saved_properties');
      let arr: string[] = saved ? JSON.parse(saved) : [];
      if (arr.includes(property.id)) {
        arr = arr.filter(id => id !== property.id);
        setIsSaved(false);
      } else {
        arr.push(property.id);
        setIsSaved(true);
      }
      localStorage.setItem('kloud_saved_properties', JSON.stringify(arr));
    } catch {
      setIsSaved(!isSaved);
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'primary': return 'New Development';
      case 'resale': return 'Resale Exclusive';
      case 'rental': return 'Luxury Rental';
      case 'second-home': return 'Second Home';
      case 'land': return 'Land / Plot';
      default: return 'Residential';
    }
  };

  const primaryImage = property.images[0] || '/images/hero_architecture_1785684802035.jpg';

  return (
    <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/40 shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-950">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider font-semibold bg-charcoal-900/90 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
              {getCategoryLabel(property.category)}
            </span>

            {property.isDemoData && (
              <span className="px-2 py-0.5 rounded-sm text-[9px] uppercase tracking-wider font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-sm flex items-center gap-1">
                <Info className="w-2.5 h-2.5" />
                <span>Demo Data</span>
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={toggleSave}
            className="pointer-events-auto p-2 rounded-full bg-charcoal-950/70 hover:bg-charcoal-900 text-softWhite/80 hover:text-gold-400 backdrop-blur-md transition-colors border border-white/10"
            aria-label="Save property"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-gold-500 text-gold-500' : ''}`} />
          </button>
        </div>

        {/* Construction Status Pill */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-medium tracking-wide bg-charcoal-950/80 text-warmGray-100 border border-white/10 backdrop-blur-sm">
            {property.constructionStatus}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price & Location */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-gold-300 transition-colors">
              {property.priceDisplay}
            </h3>
            <span className="text-[11px] text-warmGray uppercase tracking-wider font-medium">
              {property.propertyType}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-warmGray-200 mb-2.5">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <h4 className="font-medium text-sm text-softWhite leading-snug line-clamp-1 mb-2">
            {property.title}
          </h4>

          <p className="text-xs text-warmGray leading-relaxed line-clamp-2 font-sans">
            {property.tagline || property.description}
          </p>
        </div>

        {/* Specs Row */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-warmGray">
          {property.bedrooms && (
            <div className="flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-gold-400" />
              <span>{property.bedrooms} Beds</span>
            </div>
          )}

          {property.bathrooms && (
            <div className="flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-gold-400" />
              <span>{property.bathrooms} Baths</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
            <span>{property.carpetArea || property.plotArea || 'Spacious'}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <a
            href={`#/property/${property.id}`}
            className="py-2.5 px-3 rounded text-center text-xs uppercase tracking-widest font-semibold border border-white/20 text-softWhite hover:border-gold-500 hover:text-gold-400 hover:bg-gold-500/5 transition-all"
          >
            View Details
          </a>

          <button
            type="button"
            onClick={() => onEnquire(property)}
            className="py-2.5 px-3 rounded text-center text-xs uppercase tracking-widest font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/50 hover:bg-gold-500 hover:text-charcoal-950 transition-all duration-300 shadow-sm"
          >
            Enquire Now
          </button>
        </div>

      </div>

    </div>
  );
};
