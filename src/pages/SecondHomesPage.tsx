import React from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { karjatDestinationData } from '../data/landOpportunities';
import { 
  Trees, 
  Map, 
  ShieldCheck, 
  Compass, 
  Home, 
  Mountain, 
  ArrowRight, 
  CheckCircle, 
  Info, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SecondHomesPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string, location?: string) => void;
}

export const SecondHomesPage: React.FC<SecondHomesPageProps> = ({ onOpenConsultation }) => {
  const secondHomes = propertyService.getPropertiesByCategory('second-home');

  const karjatCategories = [
    {
      title: 'Weekend Homes',
      desc: 'Lock-and-leave cottages and managed countryside homes designed for effortless weekend respites.',
      icon: Home
    },
    {
      title: 'Villa or Bungalow Opportunities',
      desc: 'Independent architectural villas and spacious private estates nestled in serene natural valleys.',
      icon: Mountain
    },
    {
      title: 'Land for a Future Second Home',
      desc: 'Clear-title land parcels with surveyed boundaries and verified road access to construct your custom retreat.',
      icon: Trees
    }
  ];

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Trees className="w-3.5 h-3.5" />
            <span>VERTICAL 03 · SECOND HOMES & RETREATS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Space to Escape. <span className="italic font-normal text-gold-400">Room to Grow.</span>
          </h1>
          <p className="text-sm text-warmGray max-w-3xl leading-relaxed">
            Discover tranquil second residences and coastal retreats around Mumbai. Whether seeking an architectural villa in Alibaug within minutes of Mandwa jetty or a family getaway in the hills, we guide you through title verification, road access, and private estate management.
          </p>
        </div>

        {/* =====================================================================
            FEATURED DESTINATION: KARJAT — YOUR SPACE TO UNWIND
            ===================================================================== */}
        <div className="mb-20">
          <div className="bg-charcoal-950 border border-gold-500/40 rounded-sm overflow-hidden shadow-luxury">
            
            {/* Split Banner: Image on Left / Top, Editorial on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Authentic Landscape Photograph */}
              <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] bg-charcoal-850 overflow-hidden">
                <img
                  src={karjatDestinationData.image}
                  alt="Karjat nature retreat landscape with Sahyadri mountains"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-black/30" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-widest bg-charcoal-950/90 text-gold-400 border border-gold-500/40 backdrop-blur-md">
                    FEATURED DESTINATION
                  </span>
                </div>

                {/* Location Marker */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-softWhite/90 bg-charcoal-950/80 px-3 py-1 rounded backdrop-blur-sm border border-white/10">
                  <Map className="w-3.5 h-3.5 text-gold-400" />
                  <span>Karjat, Raigad District, Maharashtra</span>
                </div>
              </div>

              {/* Destination Editorial */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-gold-400 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>NATURE SANCTUARY & ESCAPE</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight mb-2">
                    {karjatDestinationData.displayName}
                  </h2>

                  <h3 className="text-sm sm:text-base font-serif italic text-gold-300 mb-4">
                    "{karjatDestinationData.headline}"
                  </h3>

                  <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6 font-sans">
                    {karjatDestinationData.description}
                  </p>

                  {/* Contextual Highlights */}
                  <div className="space-y-2 mb-6">
                    {karjatDestinationData.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-softWhite/85 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 mt-1.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Due Diligence Caution Box */}
                <div className="p-3.5 rounded bg-charcoal-900 border border-gold-500/20 text-xs text-warmGray leading-relaxed mb-6">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-gold-300 block mb-0.5">Due Diligence Protocol:</strong>
                      Do not assume every plot in Karjat is suitable for residential construction. Verify land classification (NA status), road access, applicable restrictions, permissions, and the legal status of individual properties before purchasing.
                    </span>
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onOpenConsultation('Second Homes & Land', 'Karjat Second Home Inquiry', undefined, 'Karjat, Maharashtra')}
                    className="flex-1 py-3 px-5 rounded text-xs font-semibold uppercase tracking-wider bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>{karjatDestinationData.ctaPrimaryText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenConsultation('Second Homes & Land', 'Discuss Karjat Second Home Requirements', undefined, 'Karjat, Maharashtra')}
                    className="flex-1 py-3 px-5 rounded text-xs font-medium uppercase tracking-wider border border-white/20 text-softWhite hover:border-gold-500/60 hover:text-gold-300 transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{karjatDestinationData.ctaSecondaryText}</span>
                  </button>
                </div>

              </div>

            </div>

            {/* 3 Karjat Enquiry Categories Grid */}
            <div className="border-t border-white/10 bg-charcoal-900 p-6 sm:p-8">
              <h4 className="text-xs font-mono uppercase tracking-widest text-warmGray-400 mb-4">
                Explore Karjat Second Home Categories:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {karjatCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded bg-charcoal-850 border border-white/5 hover:border-gold-500/30 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-gold-400">
                          <Icon className="w-4 h-4" />
                          <h5 className="font-serif text-base text-white font-normal">{cat.title}</h5>
                        </div>
                        <p className="text-xs text-warmGray leading-relaxed">{cat.desc}</p>
                      </div>
                      <button
                        onClick={() => onOpenConsultation('Second Homes & Land', `Karjat: ${cat.title}`, undefined, 'Karjat, Maharashtra')}
                        className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono uppercase tracking-wider text-gold-400 hover:text-gold-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Enquire for {cat.title}</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bespoke Verified Options Card */}
            <div className="p-6 bg-charcoal-950 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-medium text-white">Seeking Verified Karjat Parcels & Estates?</h5>
                  <p className="text-[11px] text-warmGray leading-relaxed">
                    Rather than presenting speculative listings, we source vetted parcels matching your budget and title criteria.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenConsultation('Second Homes & Land', 'Request Suitable Karjat Options', undefined, 'Karjat, Maharashtra')}
                className="whitespace-nowrap px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider border border-gold-500/60 text-gold-400 hover:bg-gold-500/10 transition-colors cursor-pointer"
              >
                REQUEST SUITABLE OPTIONS
              </button>
            </div>

          </div>
        </div>

        {/* Existing Curated Second-Home Listings (e.g. Alibaug) */}
        <div className="mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-1">
                COASTAL & COUNTRYSIDE ESTATES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
                Curated Second-Home Estates
              </h2>
            </div>
            <p className="text-xs text-warmGray max-w-md">
              Individual luxury villa estates and sanctuaries across Alibaug and coastal Maharashtra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {secondHomes.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                onEnquire={(prop) => onOpenConsultation('Second Homes & Land', prop.title, prop.id, prop.location)}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
