import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-4">Terms and Conditions</h1>
        <p className="text-xs text-gold-400 font-mono mb-8">Last Updated: October 2026 | KLOUD REALTY</p>

        <div className="space-y-8 text-xs sm:text-sm text-warmGray leading-relaxed border-t border-white/10 pt-8">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">1. Nature of Advisory Services</h2>
            <p>KLOUD REALTY operates as an independent real estate advisory firm (MahaRERA Registration ID: A0311 72501659). We do not act as the developer, constructor, or owner of properties showcased unless expressly stated otherwise in writing.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">2. Accuracy of Listings & Specifications</h2>
            <p>Property descriptions, images, layouts, prices, and possession dates are provided for general guidance. While we exercise due care in compiling information from developers and owners, clients must independently verify titles, municipal approvals, and RERA disclosures prior to entering into binding contracts.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">3. Intellectual Property</h2>
            <p>The KLOUD REALTY trademark, logo, website layouts, and curated editorial content are protected. No unauthorized reproduction or redistribution is permitted without written consent.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
