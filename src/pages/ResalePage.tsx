import React from 'react';
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
