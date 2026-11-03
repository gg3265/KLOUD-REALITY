import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: (vertical?: string) => void;
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, currentPath }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBuyDropdownOpen, setIsBuyDropdownOpen] = useState(false);
  const [isMobileBuyOpen, setIsMobileBuyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure mobile drawer is always closed if resized to desktop viewport (>= 1024px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isHome = currentPath === '/' || currentPath === '';

  const navLinks = [
    { label: 'Home', href: '#/' },
    { 
      label: 'Buy', 
      href: '#/buy',
      hasDropdown: true,
      subItems: [
        { label: 'All Residential Properties', href: '#/buy' },
        { label: 'Primary Market / New Launches', href: '#/primary-market' },
        { label: 'Resale Properties', href: '#/resale' },
      ]
    },
    { label: 'Rent', href: '#/rent' },
    { label: 'Second Homes', href: '#/second-homes' },
    { label: 'Land', href: '#/land' },
    { label: 'Redevelopment', href: '#/redevelopment' },
    { label: 'Finance & Home Loan', href: '#/finance-home-loan' },
    { label: 'About Us', href: '#/about' },
    { label: 'Contact', href: '#/contact' },
  ];

  return (
    <>
      <header 
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 h-[76px] sm:h-[80px] lg:h-[82px] xl:h-[86px] transition-all duration-300 flex items-center w-full max-w-full ${
          isScrolled || !isHome 
            ? 'bg-charcoal-950/98 backdrop-blur-md border-b border-gold-500/20 shadow-[0_4px_24px_rgba(0,0,0,0.65)]' 
            : 'bg-charcoal-950/92 backdrop-blur-md border-b border-gold-500/15'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-5 xl:px-8 2xl:px-12 h-full flex items-center justify-between min-w-0">
          
          {/* 1. LEFT SECTION: Logo and Brand Name (Refined, perfectly aligned) */}
          <a href="#/" className="flex items-center gap-2 xl:gap-2.5 group focus:outline-none shrink-0 min-w-0">
            <img 
              src="/images/logo_badge.png" 
              alt="KLOUD REALTY Logo" 
              className="h-8 sm:h-8.5 lg:h-8.5 xl:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-102 drop-shadow shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center leading-none">
                <span className="font-serif tracking-wider font-semibold text-base sm:text-[17px] lg:text-[17px] xl:text-[19px] text-gold-400 group-hover:text-gold-300 transition-colors">
                  KLOUD <span className="text-cyanBrand">REALTY</span>
                </span>
              </div>
              <span className="text-[7.5px] sm:text-[8px] lg:text-[8px] xl:text-[8.5px] tracking-[0.14em] uppercase text-warmGray/75 font-sans font-medium mt-0.5 whitespace-nowrap">
                The Place to Find Your Place
              </span>
            </div>
          </a>

          {/* 2. CENTER SECTION: Desktop Horizontal Navigation Menu (>= 1024px) */}
          <nav 
            aria-label="Main Navigation" 
            className="hidden lg:flex items-center justify-center gap-1.5 lg:gap-2 xl:gap-3.5 2xl:gap-5 flex-1 px-2 min-w-0 h-full"
          >
            {navLinks.map((link) => {
              const isLinkActive = link.href === '#/'
                ? isHome
                : currentPath === link.href.replace('#', '') || (link.hasDropdown && (currentPath === '/primary-market' || currentPath === '/resale' || currentPath === '/buy'));

              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative group py-2 h-full flex items-center"
                    onMouseEnter={() => setIsBuyDropdownOpen(true)}
                    onMouseLeave={() => setIsBuyDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className={`relative py-1 flex items-center gap-1 text-[10px] lg:text-[10.5px] xl:text-[11.5px] 2xl:text-[12px] uppercase tracking-[0.05em] xl:tracking-[0.07em] 2xl:tracking-[0.09em] font-medium font-sans transition-colors duration-200 whitespace-nowrap ${
                        isLinkActive 
                          ? 'text-gold-400' 
                          : 'text-softWhite/80 hover:text-gold-300'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-2.5 h-2.5 text-warmGray/70 group-hover:text-gold-400 transition-transform duration-200 group-hover:rotate-180 shrink-0" />
                      
                      {/* Active / Hover Subtle Gold Underline */}
                      <span 
                        className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold-400 rounded-full transition-all duration-300 ${
                          isLinkActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-80 group-hover:scale-x-100'
                        }`} 
                      />
                    </a>

                    {/* Buy Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 w-60 py-2 bg-charcoal-950/98 backdrop-blur-md border border-gold-500/30 shadow-2xl rounded-sm transition-all duration-200 z-50 ${
                        isBuyDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1 pointer-events-none'
                      }`}
                    >
                      {link.subItems?.map((sub) => {
                        const isSubActive = currentPath === sub.href.replace('#', '');
                        return (
                          <a
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsBuyDropdownOpen(false)}
                            className={`block px-4 py-2 text-[11px] xl:text-xs transition-all font-sans whitespace-nowrap ${
                              isSubActive
                                ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500 font-medium'
                                : 'text-softWhite/80 hover:text-white hover:bg-gold-500/10 hover:border-l-2 hover:border-gold-500/60'
                            }`}
                          >
                            {sub.label}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group relative py-1 text-[10px] lg:text-[10.5px] xl:text-[11.5px] 2xl:text-[12px] uppercase tracking-[0.05em] xl:tracking-[0.07em] 2xl:tracking-[0.09em] font-medium font-sans transition-colors duration-200 whitespace-nowrap flex items-center ${
                    isLinkActive 
                      ? 'text-gold-400' 
                      : 'text-softWhite/80 hover:text-gold-300'
                  }`}
                >
                  <span>{link.label}</span>
                  
                  {/* Active / Hover Subtle Gold Underline */}
                  <span 
                    className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold-400 rounded-full transition-all duration-300 ${
                      isLinkActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-80 group-hover:scale-x-100'
                    }`} 
                  />
                </a>
              );
            })}
          </nav>

          {/* 3. RIGHT SECTION: Refined Luxury CTA & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0 min-w-0 ml-2 xl:ml-4">
            <button
              onClick={() => onOpenConsultation('General Consultation')}
              className="hidden sm:inline-flex items-center gap-1.5 xl:gap-2 px-3 xl:px-3.5 py-1.5 lg:py-2 rounded-sm text-[10px] xl:text-[10.5px] 2xl:text-[11px] uppercase tracking-[0.12em] font-medium border border-gold-500/50 hover:border-gold-400 text-gold-400 hover:text-gold-300 bg-charcoal-900/40 hover:bg-gold-500/10 transition-all duration-300 shadow-sm group whitespace-nowrap shrink-0"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3 h-3 text-gold-400 transition-transform duration-300 ease-out group-hover:translate-x-1 shrink-0" />
            </button>

            {/* Hamburger Button: Strictly hidden on desktop (lg and above: >= 1024px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded text-softWhite hover:text-gold-400 hover:bg-charcoal-850 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile & Tablet Slide-Out Drawer: Strictly hidden on desktop (>= 1024px) */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible hidden'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-5/6 max-w-sm bg-charcoal-950 border-l border-gold-500/20 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-7 w-auto object-contain" />
                <span className="font-serif font-semibold text-white tracking-wide text-sm">
                  KLOUD <span className="text-cyanBrand">REALTY</span>
                </span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-warmGray hover:text-white hover:bg-charcoal-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="py-4 space-y-1">
              {navLinks.map((link) => {
                const isLinkActive = link.href === '#/'
                  ? isHome
                  : currentPath === link.href.replace('#', '') || (link.hasDropdown && (currentPath === '/primary-market' || currentPath === '/resale' || currentPath === '/buy'));

                if (link.hasDropdown) {
                  return (
                    <div key={link.label}>
                      <div className="flex items-center justify-between px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium">
                        <a
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={isLinkActive ? 'text-gold-400 font-semibold' : 'text-softWhite/90 hover:text-gold-400'}
                        >
                          {link.label}
                        </a>
                        <button
                          type="button"
                          onClick={() => setIsMobileBuyOpen(!isMobileBuyOpen)}
                          className="p-1 text-warmGray hover:text-gold-400 focus:outline-none"
                          aria-label="Toggle Buy subcategories"
                        >
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMobileBuyOpen ? 'rotate-180 text-gold-400' : ''}`} />
                        </button>
                      </div>

                      {isMobileBuyOpen && (
                        <div className="pl-4 space-y-1 border-l border-gold-500/20 ml-3 my-1">
                          {link.subItems?.map((sub) => {
                            const isSubActive = currentPath === sub.href.replace('#', '');
                            return (
                              <a
                                key={sub.label}
                                href={sub.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-1.5 text-xs ${isSubActive ? 'text-gold-400 font-medium' : 'text-warmGray hover:text-white'}`}
                              >
                                {sub.label}
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium transition-colors ${
                        isLinkActive 
                          ? 'text-gold-400 bg-gold-500/10 border-l-2 border-gold-500' 
                          : 'text-softWhite/90 hover:text-gold-400 hover:bg-charcoal-850'
                      }`}
                    >
                      <span>{link.label}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-5 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation('General Consultation');
              }}
              className="w-full py-2.5 rounded-sm text-center text-[11px] uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              Book a Consultation
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-warmGray">
              <ShieldCheck className="w-3.5 h-3.5 text-cyanBrand" />
              <span>RERA ID: A0311 72501659</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

