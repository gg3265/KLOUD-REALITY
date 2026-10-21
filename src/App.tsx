import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LeadModal } from './components/LeadModal';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { BuyPage } from './pages/BuyPage';
import { RentPage } from './pages/RentPage';
import { PrimaryMarketPage } from './pages/PrimaryMarketPage';
import { ResalePage } from './pages/ResalePage';
import { SecondHomesPage } from './pages/SecondHomesPage';
import { LandPage } from './pages/LandPage';
import { RedevelopmentPage } from './pages/RedevelopmentPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { DisclaimerPage } from './pages/DisclaimerPage';
import { AdminDashboard } from './pages/AdminDashboard';

export const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');
  
  // Lead Modal Controls
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [modalVertical, setModalVertical] = useState<string | undefined>(undefined);
  const [modalPropertyTitle, setModalPropertyTitle] = useState<string | undefined>(undefined);
  const [modalPropertyId, setModalPropertyId] = useState<string | undefined>(undefined);

  // 1. Initial 800ms Lead Modal on first visit
  useEffect(() => {
    const hasSeenModal = localStorage.getItem('kloud_lead_modal_dismissed_v1');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsLeadModalOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2. Hash router change listener & scroll to top
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openConsultation = (vertical?: string, propertyTitle?: string, propertyId?: string) => {
    setModalVertical(vertical);
    setModalPropertyTitle(propertyTitle);
    setModalPropertyId(propertyId);
    setIsLeadModalOpen(true);
  };

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  // Route matching
  const route = currentHash.replace(/^#/, '') || '/';

  const renderContent = () => {
    if (route === '/' || route === '') {
      return <HomePage onOpenConsultation={openConsultation} onNavigate={navigateTo} />;
    }
    if (route === '/buy') {
      return <BuyPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/rent') {
      return <RentPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/primary-market') {
      return <PrimaryMarketPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/resale') {
      return <ResalePage onOpenConsultation={openConsultation} />;
    }
    if (route === '/second-homes') {
      return <SecondHomesPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/land') {
      return <LandPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/redevelopment') {
      return <RedevelopmentPage />;
    }
    if (route.startsWith('/property/')) {
      const propId = route.replace('/property/', '');
      return <PropertyDetailPage propertyId={propId} onOpenConsultation={openConsultation} />;
    }
    if (route === '/about') {
      return <AboutPage onOpenConsultation={openConsultation} />;
    }
    if (route === '/contact') {
      return <ContactPage />;
    }
    if (route === '/privacy') {
      return <PrivacyPolicyPage />;
    }
    if (route === '/terms') {
      return <TermsPage />;
    }
    if (route === '/disclaimer') {
      return <DisclaimerPage />;
    }
    if (route === '/admin') {
      return <AdminDashboard />;
    }

    // Default fallback
    return <HomePage onOpenConsultation={openConsultation} onNavigate={navigateTo} />;
  };

  // Check if current route is property page to pass title to WhatsApp
  const isPropertyPage = route.startsWith('/property/');

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-charcoal-900 text-softWhite flex flex-col justify-between selection:bg-gold-500 selection:text-charcoal-950">
      
      {/* Sticky Navigation */}
      <Navbar onOpenConsultation={openConsultation} currentPath={route} />

      {/* Main Routed Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Entry / Triggered Lead Generation Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialVertical={modalVertical}
        initialPropertyTitle={modalPropertyTitle}
        initialPropertyId={modalPropertyId}
      />

      {/* Floating Tasteful WhatsApp Button */}
      <WhatsAppButton propertyTitle={isPropertyPage ? modalPropertyTitle : undefined} />

    </div>
  );
};
