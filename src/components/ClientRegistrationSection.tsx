import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { pdfService } from '../services/pdfService';
import { ClientRegistrationModal } from './ClientRegistrationModal';

export const ClientRegistrationSection: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadPdf = () => {
    setIsDownloading(true);
    try {
      const link = document.createElement('a');
      link.href = '/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf';
      link.download = 'KLOUD_REALTY_Client_Registration_Form_Professional.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF download error:', err);
      window.open('/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf', '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section id="client-registration" className="py-24 px-4 sm:px-6 lg:px-8 bg-charcoal-950 border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyanBrand/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Advisory Formalization</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight">
            Client Registration &amp; Professional Engagement
          </h2>
          <p className="mt-4 text-sm sm:text-base text-warmGray leading-relaxed max-w-2xl mx-auto">
            Begin your property journey with a transparent and professional advisory experience.
          </p>
        </div>

        {/* Action Showcase Card */}
        <div className="max-w-4xl mx-auto rounded-sm bg-charcoal-900 border border-gold-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-cyanBrand font-mono">
                <FileText className="w-4 h-4 text-cyanBrand" />
                <span>Printable &amp; Digital Dossier • A4 Format</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-white leading-tight">
                Download Official Registration &amp; Fee Agreement Dossier
              </h3>
              <p className="text-xs sm:text-sm text-warmGray leading-relaxed">
                Download the complete, printable A4 registration form containing our personal details intake, comprehensive property requirements matrix, transparent 7-point professional consultancy &amp; fee agreement, and formal declaration.
              </p>

              {/* Verified Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                <div className="flex items-center gap-2 text-xs text-softWhite/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Transparent Fee Agreement</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-softWhite/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>No Initial Financial Obligation</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-softWhite/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>Client Discretion Assured</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-softWhite/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span>MahaRERA: A0311 72501659</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons Column */}
            <div className="md:col-span-5 flex flex-col gap-3.5 justify-center md:border-l md:border-white/10 md:pl-8">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-full py-4 px-6 rounded bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2.5 group"
              >
                <Download className={`w-4 h-4 text-charcoal-950 transition-transform ${isDownloading ? 'animate-bounce' : 'group-hover:-translate-y-0.5'}`} />
                <span>{isDownloading ? 'Preparing PDF...' : 'DOWNLOAD CLIENT REGISTRATION FORM (PDF)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 px-6 rounded border border-white/20 hover:border-gold-500/70 text-softWhite hover:text-gold-300 font-semibold text-xs uppercase tracking-wider bg-charcoal-850 hover:bg-charcoal-800 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Register Online (Digital Dossier)</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="/documents/KLOUD_REALTY_Client_Registration_Form_Professional.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-gold-400 hover:text-gold-300 hover:underline flex items-center justify-center gap-1.5 py-0.5"
              >
                <span>Preview Form in New Tab</span>
                <ExternalLink className="w-3 h-3 text-gold-400" />
              </a>

              {downloadSuccess && (
                <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] text-center animate-fade-in flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Downloaded official PDF registration form.</span>
                </div>
              )}

              <p className="text-[10px] text-warmGray/70 text-center leading-relaxed">
                Ready to print or fill digitally. Completed forms can also be submitted at our Mazgaon office.
              </p>
            </div>

          </div>
        </div>

        {/* 3 Pillar Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <div className="p-6 rounded bg-charcoal-900/60 border border-white/5 space-y-2">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>1. Structured Intake</span>
            </h4>
            <p className="text-xs text-warmGray leading-relaxed">
              Records client identity, communication preferences, and exact investment parameters across primary, resale, leasing, plots, or redevelopment.
            </p>
          </div>

          <div className="p-6 rounded bg-charcoal-900/60 border border-white/5 space-y-2">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyanBrand" />
              <span>2. Transparent Fee Terms</span>
            </h4>
            <p className="text-xs text-warmGray leading-relaxed">
              7-point professional agreement ensuring consultation terms, transaction brokerage, and milestones are recorded in writing before engagement.
            </p>
          </div>

          <div className="p-6 rounded bg-charcoal-900/60 border border-white/5 space-y-2">
            <h4 className="font-serif text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
              <span>3. Regulatory Standing</span>
            </h4>
            <p className="text-xs text-warmGray leading-relaxed">
              Official engagement under MahaRERA Registered Consultant ID A0311 72501659, upholding professional advisory accountability.
            </p>
          </div>
        </div>

      </div>

      {/* Digital Registration Modal */}
      <ClientRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
