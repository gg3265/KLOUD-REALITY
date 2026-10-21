import React, { useState } from 'react';
import { RefreshCw, Building2, CheckCircle2, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { leadService } from '../services/leadService';

export const RedevelopmentPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Society Committee Representative');
  const [locality, setLocality] = useState('Mazgaon / South Mumbai');
  const [buildingAge, setBuildingAge] = useState('35+ Years');
  const [units, setUnits] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await leadService.createLead({
        fullName,
        phone,
        email,
        enquirySource: 'Redevelopment',
        serviceVertical: 'Redevelopment Consulting',
        preferredLocation: locality,
        budgetRange: 'Redevelopment Advisory',
        preferredContactMethod: 'Phone Call',
        roleInSociety: role,
        buildingAge,
        numberOfUnits: units,
        message: message || `Redevelopment enquiry from ${role} for ${buildingAge} old building in ${locality}`
      });

      if (result.success && result.leadId) {
        setSubmittedLeadId(result.leadId);
      } else {
        setErrorMessage(result.error || 'Submission failed. Please try again.');
      }
    } catch {
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal-900 text-softWhite min-h-screen pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyanBrand/10 border border-cyanBrand/30 text-cyanBrand text-xs font-semibold uppercase tracking-widest mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>VERTICAL 04 — URBAN REDEVELOPMENT CONSULTING</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light text-white tracking-tight mb-6 max-w-4xl">
            The Next Chapter of Your Building Starts with a Conversation.
          </h1>
          <p className="text-sm sm:text-base text-warmGray max-w-3xl leading-relaxed">
            Explore redevelopment possibilities for residential buildings and housing societies with structured initial guidance, objective process navigation, and coordination with qualified architects, engineers, and legal professionals.
          </p>
        </div>

        {/* 2-Column Split: Advisory Framework & Consultation Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Scope & Principles */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold block mb-2">
                STRUCTURED STAGES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                Guiding Societies with Objectivity
              </h2>
              <p className="text-xs sm:text-sm text-warmGray leading-relaxed mb-6">
                Redevelopment is one of the most significant collective decisions a housing society will ever undertake. KLOUD REALTY acts as an independent advisory bridge, helping society members understand regulations, compare proposals, and avoid common pitfalls.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Initial Society Consultation</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Clarifying the DCPR 2034 provisions, redevelopment routes (self-redevelopment vs. developer appointment), and member alignment.
                  </p>
                </div>

                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Feasibility & Assessment Coordination</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Facilitating structural audit reports, title chain checks, and plot demarcation with credentialed specialists.
                  </p>
                </div>

                <div className="p-4 rounded bg-charcoal-850 border border-white/5 space-y-1">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyanBrand" />
                    <span>Developer Evaluation Support</span>
                  </h4>
                  <p className="text-xs text-warmGray leading-relaxed pl-6">
                    Objective evaluation of prospective developer track records, balance sheets, past project completions, and bank guarantee offers.
                  </p>
                </div>
              </div>
            </div>

            {/* Mandatory Regulatory Transparency Note */}
            <div className="p-5 rounded bg-charcoal-950 border border-gold-500/30 space-y-2">
              <div className="flex items-center gap-2 text-gold-400 font-semibold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-cyanBrand" />
                <span>Advisory Disclaimer</span>
              </div>
              <p className="text-xs text-warmGray leading-relaxed">
                KLOUD REALTY does not promise redevelopment approvals, guaranteed additional carpet area ratios, guaranteed project completion dates, or speculative financial returns. All redevelopment feasibility depends strictly on municipal sanctions, building age, plot FSI/TDR potential, and society member consent.
              </p>
            </div>
          </div>

          {/* Right Column: Society Consultation Form */}
          <div className="lg:col-span-6">
            <div className="bg-charcoal-850 p-6 sm:p-8 rounded-sm border border-gold-500/30 shadow-luxury">
              
              {submittedLeadId ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mx-auto border border-gold-500/30">
                    <CheckCircle2 className="w-8 h-8 text-gold-400" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest px-3 py-1 rounded bg-gold-500/10 text-gold-300 border border-gold-500/30 inline-block">
                    Enquiry ID: {submittedLeadId}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Redevelopment Consultation Requested
                  </h3>
                  <p className="text-xs text-warmGray leading-relaxed">
                    Thank you, {fullName}. Abhishek Gupta will review your society's parameters and reach out within 24 hours to schedule an initial advisory discussion.
                  </p>
                  <button
                    onClick={() => setSubmittedLeadId(null)}
                    className="mt-4 px-6 py-2.5 rounded bg-charcoal-800 text-xs text-softWhite hover:bg-charcoal-700 font-medium"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-cyanBrand block mb-1">
                      CONFIDENTIAL INQUIRY
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Request a Society Consultation
                    </h3>
                    <p className="text-xs text-warmGray mt-1">
                      Connect with Abhishek Gupta for an initial building or society assessment.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded text-xs bg-red-950/60 text-red-300 border border-red-800">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Ramesh Kulkarni"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98201 12345"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. society.secretary@gmail.com"
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Role / Relationship to Property
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      >
                        <option value="Society Committee Representative">Society Committee Representative</option>
                        <option value="Individual Flat Owner">Individual Flat Owner</option>
                        <option value="Society Chairman / Secretary">Society Chairman / Secretary</option>
                        <option value="Building Landlord / Heir">Building Landlord / Heir</option>
                        <option value="Potential Redevelopment Partner">Potential Redevelopment Partner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Property Locality
                      </label>
                      <input
                        type="text"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="e.g. Mazgaon, Byculla, Dadar"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Approximate Building Age
                      </label>
                      <select
                        value={buildingAge}
                        onChange={(e) => setBuildingAge(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      >
                        <option value="25–30 Years">25–30 Years</option>
                        <option value="30–40 Years">30–40 Years</option>
                        <option value="40+ Years (Cess / Pagdi / Freehold)">40+ Years</option>
                        <option value="Not Sure">Not Sure</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                        Number of Floors / Units
                      </label>
                      <input
                        type="text"
                        value={units}
                        onChange={(e) => setUnits(e.target.value)}
                        placeholder="e.g. G+4 floors, 16 flats"
                        className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                      Brief Society Context / Message
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share any details, e.g. general body resolution status or specific questions..."
                      className="w-full px-3 py-2 text-xs rounded bg-charcoal-800 border border-white/10 text-white focus:border-cyanBrand outline-none font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded text-xs uppercase tracking-widest font-semibold bg-cyanBrand hover:bg-cyanBrand-hover text-charcoal-950 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>REQUEST A REDEVELOPMENT CONSULTATION</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-warmGray/60 text-center pt-2">
                    Submission does not guarantee project feasibility, appointment, or agreement.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
