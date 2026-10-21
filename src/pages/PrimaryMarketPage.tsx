import React from 'react';
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
