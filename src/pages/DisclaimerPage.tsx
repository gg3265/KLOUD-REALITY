import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>STATUTORY DISCLOSURE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-4">Regulatory Disclaimer</h1>
        <p className="text-xs text-gold-400 font-mono mb-8">RERA ID: A0311 72501659 | Mazgaon, Mumbai</p>

        <div className="space-y-8 text-xs sm:text-sm text-warmGray leading-relaxed border-t border-white/10 pt-8">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">1. RERA Registration Transparency</h2>
            <p>KLOUD REALTY is registered as a Real Estate Agent with the Maharashtra Real Estate Regulatory Authority under Registration No. <strong>A0311 72501659</strong>. Registration as a real estate agent does not constitute a financial guarantee or warranty of any specific project's completion or rate of return.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">2. No Guarantee of Redevelopment Outcomes</h2>
            <p>Any discussions, preliminary feasibility analyses, or advisory interactions concerning building or society redevelopment do not guarantee statutory approvals from the Municipal Corporation of Greater Mumbai (MCGM), MHADA, SRA, or other regulatory bodies. Redevelopment agreements require formal execution under applicable society bylaws and relevant statutory mandates.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">3. Non-Speculative Policy</h2>
            <p>KLOUD REALTY explicitly refrains from making speculative representations regarding future land price appreciation or guaranteed rental yields. All potential acquisitions must be assessed by the buyer on their merits.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
