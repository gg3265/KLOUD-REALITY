import React, { useState } from 'react';
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
