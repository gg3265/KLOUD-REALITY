import React from 'react';
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
