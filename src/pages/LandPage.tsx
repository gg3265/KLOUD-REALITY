import React from 'react';
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
