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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
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
    { label: 'About Us', href: '#/about' },
    { label: 'Contact', href: '#/contact' },
  ];

  return (
    <>
      <header 
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 h-[88px] sm:h-[92px] lg:h-[96px] transition-all duration-300 flex items-center w-full max-w-full ${
          isScrolled || !isHome 
            ? 'bg-charcoal-900/98 backdrop-blur-md border-b border-white/10 shadow-luxury' 
            : 'bg-gradient-to-b from-charcoal-950/90 via-charcoal-900/60 to-transparent backdrop-blur-[2px]'
        }`}
      >
        <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-5 xl:px-8 2xl:px-12 h-full flex items-center justify-between gap-2 lg:gap-3 xl:gap-5 min-w-0">
          
          {/* 1. LEFT SECTION: Logo and Brand Name (Natural, unboxed, balanced) */}
          <a href="#/" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0 min-w-0">
            <img 
              src="/images/logo_badge.png" 
              alt="KLOUD REALTY Logo" 
              className="h-9 sm:h-10 lg:h-10 xl:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md shrink-0" 
            />
            <div className="flex flex-col justify-center">
              <div className="flex items-center leading-none">
                <span className="font-serif tracking-wider font-semibold text-base sm:text-lg lg:text-[17px] xl:text-xl text-gold-400 group-hover:text-gold-300 transition-colors">
                  KLOUD <span className="text-cyanBrand">REALTY</span>
                </span>
              </div>
              <span className="text-[8px] sm:text-[8.5px] lg:text-[8.5px] xl:text-[9.5px] tracking-[0.14em] xl:tracking-[0.18em] uppercase text-warmGray/80 font-sans font-medium mt-0.5 whitespace-nowrap">
                The Place to Find Your Place
              </span>
            </div>
          </a>

          {/* 2. CENTER SECTION: Desktop Horizontal Navigation (Visible on all desktop/laptop viewports >= 1024px) */}
          <nav 
            aria-label="Main Navigation" 
            className="hidden lg:flex items-center justify-center gap-1.5 lg:gap-2.5 xl:gap-4 2xl:gap-6 flex-1 px-1 min-w-0"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.href.replace('#', '');
              
              if (link.hasDropdown) {
                return (
                  <div 
                    key={link.label}
                    className="relative py-2 group"
                    onMouseEnter={() => setIsBuyDropdownOpen(true)}
                    onMouseLeave={() => setIsBuyDropdownOpen(false)}
                  >
                    <a
                      href={link.href}
                      className={`text-[11.5px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.04em] lg:tracking-[0.05em] xl:tracking-[0.07em] 2xl:tracking-[0.08em] font-medium transition-colors flex items-center gap-1 whitespace-nowrap py-1 ${
                        isActive 
                          ? 'text-gold-400 font-semibold' 
                          : 'text-softWhite/90 hover:text-gold-400'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-warmGray group-hover:text-gold-400 transition-transform duration-200 group-hover:rotate-180" />
                    </a>

                    {/* Buy Dropdown Menu */}
                    <div 
                      className={`absolute top-full left-0 w-64 py-2 bg-charcoal-900/98 backdrop-blur-md border border-gold-500/25 shadow-2xl rounded-sm transition-all duration-200 z-50 ${
                        isBuyDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {link.subItems?.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setIsBuyDropdownOpen(false)}
                          className="block px-4 py-2.5 text-xs text-softWhite/80 hover:text-white hover:bg-gold-500/10 hover:border-l-2 hover:border-gold-500 transition-all font-sans whitespace-nowrap"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-[11.5px] lg:text-[12px] xl:text-[12.5px] 2xl:text-[13.5px] uppercase tracking-[0.04em] lg:tracking-[0.05em] xl:tracking-[0.07em] 2xl:tracking-[0.08em] font-medium transition-all relative py-1 whitespace-nowrap ${
                    isActive 
                      ? 'text-gold-400 font-semibold' 
                      : 'text-softWhite/90 hover:text-gold-400'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-cyanBrand rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* 3. RIGHT SECTION: Compact Luxury CTA & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0 min-w-0">
            <button
              onClick={() => onOpenConsultation('General Consultation')}
              className="hidden sm:inline-flex items-center gap-1.5 lg:gap-2 px-3 lg:px-3.5 xl:px-4 py-2 lg:py-2.5 rounded text-[10.5px] lg:text-[11px] xl:text-xs uppercase tracking-[0.08em] lg:tracking-[0.1em] xl:tracking-[0.12em] font-semibold border border-gold-500/70 text-gold-400 bg-charcoal-900/90 hover:bg-gold-500 hover:text-charcoal-950 transition-all duration-300 shadow-sm hover:shadow-gold-glow group whitespace-nowrap shrink-0"
            >
              <span>Book a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            {/* Hamburger Button: STRICTLY hidden on desktop (lg and above: >= 1024px) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded text-softWhite hover:text-gold-400 hover:bg-charcoal-800 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Slide-Out Drawer: STRICTLY hidden on desktop (lg and above: >= 1024px) */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible hidden'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer Panel */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-5/6 max-w-sm bg-charcoal-900 border-l border-white/10 shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div>
            {/* Header in Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-8 w-auto object-contain" />
                <span className="font-serif font-semibold text-white tracking-wide">
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
              {navLinks.map((link) => (
                <div key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded text-sm text-softWhite/90 hover:text-gold-400 hover:bg-charcoal-800/60 font-medium tracking-wide transition-colors"
                  >
                    <span>{link.label}</span>
                  </a>
                  {link.hasDropdown && (
                    <div className="pl-4 space-y-1 border-l border-gold-500/20 ml-3 my-1">
                      {link.subItems?.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-3 py-1.5 text-xs text-warmGray hover:text-gold-400"
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenConsultation('General Consultation');
              }}
              className="w-full py-3 rounded text-center text-xs uppercase tracking-widest font-semibold bg-gold-500 text-charcoal-950 hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              Book a Consultation
            </button>
            
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-warmGray">
              <ShieldCheck className="w-3.5 h-3.5 text-cyanBrand" />
              <span>RERA ID: A0311 72501659</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
