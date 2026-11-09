import React, { useState, useMemo } from 'react';
import { PropertyCard } from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';
import { Building2, Compass, RotateCcw } from 'lucide-react';

interface PrimaryMarketPageProps {
  onOpenConsultation: (vertical?: string, propertyTitle?: string, propertyId?: string) => void;
}

export const PrimaryMarketPage: React.FC<PrimaryMarketPageProps> = ({ onOpenConsultation }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>('all');
  const [selectedConfig, setSelectedConfig] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'price-asc' | 'price-desc'>('recent');

  const allPrimaryProperties = useMemo(() => {
    return propertyService.getPropertiesByCategory('primary');
  }, []);

  const filteredProperties = useMemo(() => {
    let list = [...allPrimaryProperties];

    // Location filter
    if (selectedLocation !== 'all') {
      const loc = selectedLocation.toLowerCase();
      list = list.filter(p => 
        p.locality.toLowerCase().includes(loc) ||
        p.location.toLowerCase().includes(loc) ||
        p.city.toLowerCase().includes(loc)
      );
    }

    // Developer filter
    if (selectedDeveloper !== 'all') {
      const dev = selectedDeveloper.toLowerCase();
      list = list.filter(p => p.developer && p.developer.toLowerCase().includes(dev));
    }

    // Configuration filter
    if (selectedConfig !== 'all') {
      list = list.filter(p => {
        if (selectedConfig === '2') {
          return p.bedrooms === 2 || (p.carpetArea && p.carpetArea.includes('2')) || (p.configurationsAvailable && p.configurationsAvailable.some(c => c.includes('2')));
        }
        if (selectedConfig === '3') {
          return p.bedrooms === 3 || (p.carpetArea && p.carpetArea.includes('3')) || (p.configurationsAvailable && p.configurationsAvailable.some(c => c.includes('3')));
        }
        if (selectedConfig === '4') {
          return p.bedrooms === 4 || (p.carpetArea && p.carpetArea.includes('4')) || (p.configurationsAvailable && p.configurationsAvailable.some(c => c.includes('4')));
        }
        if (selectedConfig === '5+') {
          return (p.bedrooms && p.bedrooms >= 5) || 
            (p.carpetArea && (p.carpetArea.includes('5') || p.carpetArea.includes('6') || p.carpetArea.toLowerCase().includes('mansion') || p.carpetArea.toLowerCase().includes('duplex'))) || 
            (p.configurationsAvailable && p.configurationsAvailable.some(c => c.includes('5') || c.includes('6') || c.toLowerCase().includes('mansion') || c.toLowerCase().includes('duplex')));
        }
        return true;
      });
    }

    // Status filter
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'ready') {
        list = list.filter(p => 
          p.constructionStatus.toLowerCase().includes('ready') || 
          (p.possession && p.possession.toLowerCase().includes('oc')) ||
          (p.towerBreakdown && p.towerBreakdown.some(t => t.storeys.toLowerCase().includes('oc')))
        );
      } else if (selectedStatus === 'under-construction') {
        list = list.filter(p => 
          p.constructionStatus.toLowerCase().includes('under construction') ||
          p.constructionStatus.toLowerCase().includes('newly launched') ||
          (p.possession && p.possession.toLowerCase().includes('under construction'))
        );
      }
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [allPrimaryProperties, selectedLocation, selectedDeveloper, selectedConfig, selectedStatus, sortBy]);

  const hasActiveFilters = selectedLocation !== 'all' || selectedDeveloper !== 'all' || selectedConfig !== 'all' || selectedStatus !== 'all';

  const resetFilters = () => {
    setSelectedLocation('all');
    setSelectedDeveloper('all');
    setSelectedConfig('all');
    setSelectedStatus('all');
    setSortBy('recent');
  };

  const locationChips = [
    { id: 'all', label: 'All South Mumbai' },
    { id: 'sewri', label: 'Sewri' },
    { id: 'lalbaug', label: 'Lalbaug' },
    { id: 'byculla', label: 'Byculla' },
    { id: 'worli', label: 'Worli' },
    { id: 'prabhadevi', label: 'Prabhadevi' },
    { id: 'wadala', label: 'Wadala' },
    { id: 'tardeo', label: 'Tardeo' },
    { id: 'mahalaxmi', label: 'Mahalaxmi' },
  ];

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans selection:bg-gold-500 selection:text-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>PRIMARY MARKET • PREMIUM RESIDENTIAL PROJECTS</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Curated South Mumbai Developments.
          </h1>
          <p className="text-sm sm:text-base text-warmGray max-w-3xl leading-relaxed font-sans">
            Explore verified new launches, landmark residential towers, and near-completion residences across South Mumbai’s most prestigious neighbourhoods. Every project is cross-referenced with official MahaRERA registrations and developer master plans.
          </p>

          {/* Value Props Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">Verified MahaRERA Data</span>
              <p className="text-xs text-warmGray">Phase-by-phase registration scrutiny and statutory completion schedules.</p>
            </div>
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">Direct Developer Coordination</span>
              <p className="text-xs text-warmGray">Accompanied private site visits, show residence tours, and builder terms.</p>
            </div>
            <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
              <span className="text-gold-400 font-semibold text-xs uppercase block">True Usable Carpet Evaluation</span>
              <p className="text-xs text-warmGray">Accurate RERA carpet analysis vs. super built-up claims and floor plans.</p>
            </div>
          </div>
        </div>

        {/* Location Quick-Select Chips */}
        <div className="mb-6">
          <div className="flex items-center justify-between gap-4 mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400 font-mono">
              Filter by Micro-Market:
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-warmGray hover:text-gold-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {locationChips.map((chip) => {
              const isActive = selectedLocation === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedLocation(chip.id)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gold-500 text-charcoal-950 font-semibold shadow-gold-glow'
                      : 'bg-charcoal-850 text-warmGray hover:text-white hover:bg-charcoal-800 border border-white/10'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Dimensional Filter Bar */}
        <div className="bg-charcoal-850 p-4 sm:p-5 rounded-sm border border-white/10 mb-10 shadow-subtle">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* Developer Filter */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-wider text-warmGray font-mono mb-1.5">
                Developer / Group
              </label>
              <select
                value={selectedDeveloper}
                onChange={(e) => setSelectedDeveloper(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none focus:border-gold-500/60 font-sans"
              >
                <option value="all">All Developers</option>
                <option value="Lodha">Lodha Group</option>
                <option value="Bhoomi">Bhoomi Group</option>
                <option value="Adani">Adani Realty / Marathon</option>
                <option value="Embassy">Embassy Developments</option>
                <option value="Hubtown">Hubtown Limited</option>
                <option value="Runwal">Runwal Realty</option>
                <option value="Shapoorji">Shapoorji Pallonji</option>
                <option value="Raymond">Raymond Realty</option>
              </select>
            </div>

            {/* Configuration Filter */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-wider text-warmGray font-mono mb-1.5">
                Bedrooms / Configuration
              </label>
              <select
                value={selectedConfig}
                onChange={(e) => setSelectedConfig(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none focus:border-gold-500/60 font-sans"
              >
                <option value="all">All Configurations</option>
                <option value="2">2 BHK / 2.5 BHK</option>
                <option value="3">3 BHK / 3.5 BHK</option>
                <option value="4">4 BHK Private Residences</option>
                <option value="5+">5+ BHK / Sky Mansions / Duplex</option>
              </select>
            </div>

            {/* Construction Status Filter */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-wider text-warmGray font-mono mb-1.5">
                Construction / OC Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none focus:border-gold-500/60 font-sans"
              >
                <option value="all">All Project Statuses</option>
                <option value="ready">Ready to Move / OC Received</option>
                <option value="under-construction">Under Construction / Ongoing</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-[10.5px] uppercase tracking-wider text-warmGray font-mono mb-1.5">
                Sort Projects
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full bg-charcoal-800 text-xs text-softWhite px-3 py-2 rounded border border-white/10 outline-none focus:border-gold-500/60 font-sans"
                >
                  <option value="recent">Recently Added / Updated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

          </div>

          <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-warmGray">
            <span>
              Showing <strong className="text-white font-medium">{filteredProperties.length}</strong> of {allPrimaryProperties.length} curated residential developments
            </span>
            {hasActiveFilters && (
              <span className="text-[11px] text-gold-400 font-mono">
                Filtered Results Active
              </span>
            )}
          </div>
        </div>

        {/* Listings Grid */}
        <div className="mb-14">
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  onEnquire={(prop) => onOpenConsultation('Primary Market', prop.title, prop.id)}
                  onScheduleVisit={(prop) => onOpenConsultation('Site Visit Scheduling', `Schedule Site Visit: ${prop.title}`, prop.id)}
                />
              ))}
            </div>
          ) : (
            <div className="p-14 text-center rounded bg-charcoal-850 border border-white/10 max-w-xl mx-auto my-8">
              <Compass className="w-10 h-10 text-gold-400 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-semibold text-white mb-2">
                No matching developments found.
              </h3>
              <p className="text-xs text-warmGray max-w-md mx-auto mb-5 leading-relaxed">
                We are actively tracking upcoming launches and off-market inventory matching these criteria.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold border border-white/20 text-white hover:border-gold-500 hover:text-gold-400 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => onOpenConsultation('Primary Market')}
                  className="px-5 py-2 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
                >
                  Request Sourcing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Consultation Callout */}
        <div className="p-8 sm:p-10 rounded bg-charcoal-850 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-semibold text-white">Looking for a specific upcoming development?</h3>
            <p className="text-xs text-warmGray max-w-xl">
              We track new residential launches across Sewri, Lalbaug, Byculla, Worli, Prabhadevi, Mazgaon, and emerging growth corridors.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation('Primary Market')}
            className="px-6 py-3 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow shrink-0 cursor-pointer"
          >
            Coordinate Site Visit
          </button>
        </div>

      </div>
    </div>
  );
};
