import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-white mb-4">Privacy Policy</h1>
        <p className="text-xs text-gold-400 font-mono mb-8">Effective Date: October 2026 | KLOUD REALTY</p>

        <div className="space-y-8 text-xs sm:text-sm text-warmGray leading-relaxed border-t border-white/10 pt-8">
          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">1. Commitment to Client Confidentiality</h2>
            <p>KLOUD REALTY ("we", "firm", "our"), having its registered office at Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010, respects and protects the confidentiality of visitors and clients who contact us for real estate advisory services.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">2. Information We Collect</h2>
            <p>We collect information voluntarily provided by you when submitting an enquiry or booking a consultation, including: full name, telephone number, email address, preferred property location, approximate budget, and society or property details.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">3. How Information Is Utilized</h2>
            <p>Your details are used solely to communicate property opportunities, schedule viewings, respond to redevelopment advisory requests, and coordinate real estate transactions. We do not sell, rent, or lease your personal information to third-party telemarketing networks.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">4. Regulatory Disclosure</h2>
            <p>We may disclose information where required by applicable law, court order, or official inquiry by regulatory authorities such as the Maharashtra Real Estate Regulatory Authority (MahaRERA).</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl font-semibold text-white">5. Contact Our Privacy Representative</h2>
            <p>For any questions regarding your data, please write to: <a href="mailto:kloudrealty@gmail.com" className="text-gold-400 underline">kloudrealty@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
