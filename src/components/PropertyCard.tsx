import React, { useState } from 'react';
import { MapPin, ArrowRight, Heart, ShieldCheck, Calendar, Sparkles, Building2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onEnquire: (property: Property) => void;
  onScheduleVisit?: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onEnquire, onScheduleVisit }) => {
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
      case 'primary': return 'Landmark Development';
      case 'resale': return 'Resale Exclusive';
      case 'rental': return 'Curated Rental';
      case 'second-home': return 'Second Home';
      case 'land': return 'Land / Plot';
      default: return 'Residential';
    }
  };

  const primaryImage = property.creativeImage || property.images[0] || '/images/hero_architecture_1785684802035.jpg';

  const handleScheduleClick = () => {
    if (onScheduleVisit) {
      onScheduleVisit(property);
    } else {
      onEnquire(property);
    }
  };

  return (
    <div className="group bg-charcoal-850 rounded-sm border border-white/10 hover:border-gold-500/50 shadow-subtle hover:shadow-luxury transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-[16/11] overflow-hidden bg-charcoal-950">
        <img
          src={primaryImage}
          alt={property.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-950/20 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-sm text-[10px] uppercase tracking-wider font-semibold bg-charcoal-950/90 text-gold-400 border border-gold-500/40 backdrop-blur-md">
              {getCategoryLabel(property.category)}
            </span>

            {property.developer && (
              <span className="px-2 py-0.5 rounded-sm text-[9.5px] uppercase tracking-wider font-medium bg-charcoal-900/90 text-white/90 border border-white/20 backdrop-blur-md flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5 text-cyanBrand" />
                <span>{property.developer}</span>
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={toggleSave}
            className="pointer-events-auto p-2 rounded-full bg-charcoal-950/80 hover:bg-charcoal-900 text-softWhite/80 hover:text-gold-400 backdrop-blur-md transition-colors border border-white/10"
            aria-label="Save property"
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-gold-500 text-gold-500' : ''}`} />
          </button>
        </div>

        {/* Construction Status Pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-[10px] font-semibold tracking-wide bg-charcoal-950/90 text-gold-300 border border-gold-500/30 backdrop-blur-md">
            {property.constructionStatus}
          </span>
          {property.carpetArea && (
            <span className="px-2.5 py-1 rounded text-[10px] font-medium tracking-wide bg-charcoal-900/90 text-white/90 border border-white/10 backdrop-blur-md">
              {property.carpetArea}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price & Location Header */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-gold-300 transition-colors">
              {property.priceDisplay}
            </h3>
            <span className="text-[10.5px] text-warmGray uppercase tracking-widest font-mono">
              {property.locality || property.city}
            </span>
          </div>

          {/* Project Title & Subtitle */}
          <h4 className="font-serif text-lg sm:text-xl font-light text-softWhite mb-1">
            {property.title}
          </h4>

          <div className="flex items-center gap-1.5 text-xs text-gold-400/90 mb-3">
            <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          <p className="text-xs text-warmGray leading-relaxed line-clamp-2 font-sans mb-3.5">
            {property.tagline || property.description}
          </p>

          {/* Key Property Highlights Badges */}
          {property.features && property.features.length > 0 && (
            <div className="space-y-1.5 mb-3.5">
              {property.features.slice(0, 2).map((feat, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] text-warmGray-100 font-sans">
                  <Sparkles className="w-3 h-3 text-cyanBrand shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}

          {/* RERA Registration Row */}
          {property.reraNumber && (
            <div className="flex items-center gap-1.5 text-[10px] text-warmGray/90 font-mono bg-charcoal-900/80 px-2.5 py-1.5 rounded border border-white/5 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate">MahaRERA: {property.reraNumber}</span>
            </div>
          )}
        </div>

        {/* 3 Action Buttons Layout */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          {/* Primary CTA: Explore Property */}
          <a
            href={`#/property/${property.slug || property.id}`}
            className="w-full py-2.5 px-3 rounded text-center text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-all flex items-center justify-center gap-2 shadow-gold-glow"
          >
            <span>Explore Property</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Secondary CTAs: Enquire Now & Schedule a Site Visit */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onEnquire(property)}
              className="py-2 px-2.5 rounded text-center text-[10.5px] uppercase tracking-wider font-semibold border border-gold-500/40 text-gold-400 hover:border-gold-400 hover:bg-gold-500/10 transition-colors whitespace-nowrap"
            >
              Enquire Now
            </button>
            <button
              type="button"
              onClick={handleScheduleClick}
              className="py-2 px-2.5 rounded text-center text-[10.5px] uppercase tracking-wider font-semibold border border-white/20 text-softWhite hover:border-cyanBrand hover:text-cyanBrand hover:bg-cyanBrand/5 transition-colors flex items-center justify-center gap-1 whitespace-nowrap"
            >
              <Calendar className="w-3 h-3 shrink-0" />
              <span>Schedule Visit</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
