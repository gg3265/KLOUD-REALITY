import React, { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface WhatsAppButtonProps {
  propertyTitle?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ propertyTitle }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Phone numbers from business card: 86-555-88880 or 96-199-77171
  // Formatted for WhatsApp API with India country code +91
  const defaultNumber = '918655588880';
  const alternateNumber = '919619977171';

  const baseMessage = propertyTitle 
    ? `Hello KLOUD REALTY, I would like assistance regarding the property: "${propertyTitle}".`
    : `Hello KLOUD REALTY, I would like assistance with a property enquiry.`;

  const encodedMessage = encodeURIComponent(baseMessage);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-sans flex flex-col items-end gap-2.5 sm:gap-3">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="w-72 bg-charcoal-900 border border-gold-500/30 rounded-sm shadow-2xl p-4 text-softWhite animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-white">KLOUD REALTY WhatsApp</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-warmGray hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs text-warmGray-200 mb-3 leading-relaxed">
            Connect directly with Abhishek Gupta & our senior advisory desk on WhatsApp for instant assistance:
          </p>

          <div className="space-y-2">
            <a
              href={`https://wa.me/${defaultNumber}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Connect on 86-555-88880</span>
            </a>

            <a
              href={`https://wa.me/${alternateNumber}?text=${encodedMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded text-xs bg-charcoal-800 hover:bg-charcoal-700 text-emerald-400 border border-emerald-500/30 font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Alternate: 96-199-77171</span>
            </a>
          </div>

          <p className="text-[10px] text-warmGray/70 text-center mt-2.5">
            Preserving verified contact numbers from official credentials.
          </p>
        </div>
      )}

      {/* Call Now Button */}
      <a
        href="tel:+918655588880"
        className="group flex items-center gap-2 bg-charcoal-950/95 hover:bg-charcoal-900 text-gold-400 hover:text-gold-300 border border-gold-500/60 hover:border-gold-400 px-4 py-3 rounded-full shadow-luxury hover:shadow-gold-glow transition-all duration-300 min-h-[48px] backdrop-blur-md shrink-0 cursor-pointer"
        aria-label="Call KLOUD REALTY at 8655588880"
      >
        <div className="w-6 h-6 rounded-full bg-gold-500/10 flex items-center justify-center shrink-0 border border-gold-500/20 group-hover:border-gold-400/40 group-hover:scale-105 transition-all">
          <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
        </div>
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap text-gold-300 group-hover:text-gold-200 transition-colors">
          <span className="sr-only">📞 </span>CALL NOW · 8655588880
        </span>
      </a>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-luxury hover:shadow-gold-glow transition-all duration-300 min-h-[48px] min-w-[48px] shrink-0"
        aria-label="Contact KLOUD REALTY on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 text-white transition-transform group-hover:scale-110 shrink-0" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide whitespace-nowrap">
          WhatsApp Advisory
        </span>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
      </button>

    </div>
  );
};
