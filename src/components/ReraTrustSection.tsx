import React from 'react';
import { ShieldCheck, ExternalLink, CheckCircle2, FileText, Building2 } from 'lucide-react';

export const ReraTrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-charcoal-950 border-t border-b border-white/10 relative overflow-hidden font-sans">
      
      {/* Decorative gradient accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-cyanBrand/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-4 h-4 text-cyanBrand" />
            <span>Official Regulatory Compliance</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Transparency Matters.
          </h2>
          <p className="mt-4 text-sm text-warmGray leading-relaxed">
            Real estate decisions require absolute integrity. KLOUD REALTY operates as an officially registered real estate consultancy under the Real Estate (Regulation and Development) Act.
          </p>
        </div>

        {/* Credential Spotlight Card */}
        <div className="max-w-4xl mx-auto bg-charcoal-900 rounded-sm border border-gold-500/30 shadow-luxury overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Col: RERA Registration Box */}
            <div className="md:col-span-5 p-8 bg-charcoal-850 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-warmGray-200 font-semibold block mb-1">
                  MAHARERA REGISTRATION
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  KLOUD REALTY
                </h3>
                <p className="text-xs text-warmGray leading-relaxed mb-6">
                  Registered as a certified real estate agent under the Maharashtra Real Estate Regulatory Authority.
                </p>

                <div className="p-4 rounded bg-charcoal-950 border border-gold-500/40 space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-gold-400 font-medium">
                    Firm Registration ID
                  </span>
                  <p className="text-lg font-mono font-bold text-white tracking-widest">
                    A0311 72501659
                  </p>
                  <p className="text-[10px] text-warmGray/70">
                    Jurisdiction: Mumbai City / Maharashtra
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <a
                  href="https://maharera.mahaonline.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-cyanBrand hover:text-cyanBrand-light font-medium transition-colors group"
                >
                  <span>Verify on MahaRERA Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Right Col: Pillars of Trust */}
            <div className="md:col-span-7 p-8 space-y-6 flex flex-col justify-center">
              
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
                    Clear Separation of Project vs. Advisory Registration
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed">
                    We distinguish our consultancy credentials from individual developer project RERAs. Project-specific RERA numbers are explicitly displayed alongside developer disclosures.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                  <Building2 className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
                    Established Physical Presence in Mazgaon
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed">
                    Our registered consultation office is centrally situated at Shop No. 2, Abdul Rauf Manzil, opposite Piramal Aranya, Mazgaon, Mumbai – welcoming buyers, owners, and society representatives.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded bg-gold-500/10 border border-gold-500/20 text-gold-400 shrink-0">
                  <FileText className="w-4 h-4 text-gold-400" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-1">
                    Independent Due Diligence
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed">
                    KLOUD REALTY assists in gathering project facts, approvals, and titles, enabling clients to carry out legal verification before entering commitments.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="mt-8 text-center text-xs text-warmGray/60 max-w-2xl mx-auto">
          Notice: Registration with MahaRERA does not signify an endorsement of any developer or investment yield. All property details and pricing are subject to contract.
        </p>

      </div>
    </section>
  );
};
