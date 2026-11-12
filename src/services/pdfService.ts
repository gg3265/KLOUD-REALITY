import { jsPDF } from 'jspdf';

export interface RegistrationFormData {
  fullName?: string;
  dob?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  cityPin?: string;
  pan?: string;
  purposes?: string[];
  preferredLocation?: string;
  propertyType?: string;
  configuration?: string;
  budget?: string;
  timeline?: string;
  additionalRequirements?: string;
  clientSignature?: string;
  place?: string;
  date?: string;
  feeStructure?: string;
  gstStatus?: string;
  paymentMilestones?: string;
  specialTerms?: string;
}

export const pdfService = {
  /**
   * Builds the jsPDF document instance for the official Client Registration & Professional Engagement Form.
   */
  buildClientRegistrationDocument(prefill?: RegistrationFormData): jsPDF {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 12;
    const contentWidth = pageWidth - margin * 2; // 186mm

    // Color definitions
    const charcoalDark: [number, number, number] = [17, 24, 39]; // #111827
    const goldPrimary: [number, number, number] = [180, 142, 60]; // #B48E3C
    const goldLight: [number, number, number] = [248, 244, 232]; // warm champagne tint
    const grayBorder: [number, number, number] = [209, 213, 219]; // #D1D5DB
    const grayText: [number, number, number] = [75, 85, 99]; // #4B5563
    const cyanAccent: [number, number, number] = [1, 182, 229]; // #01B6E5

    // Helper to sanitize text for PDF standard fonts (avoids broken glyphs like ₹ -> ?)
    const sanitizePdfText = (str?: string): string => {
      if (!str) return '';
      return str.replace(/₹/g, 'INR ');
    };

    // Helper to draw clean form fields
    const drawFormField = (label: string, value: string | undefined, x: number, y: number, w: number, h: number = 8) => {
      doc.setDrawColor(...grayBorder);
      doc.setLineWidth(0.2);
      doc.rect(x, y, w, h);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(...grayText);
      const labelText = doc.splitTextToSize(label.toUpperCase(), w - 4)[0];
      doc.text(labelText, x + 2, y + 2.8);

      if (value) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...charcoalDark);
        if (h > 10) {
          const valLines = doc.splitTextToSize(sanitizePdfText(value), w - 4);
          doc.text(valLines.slice(0, 3), x + 2, y + 6.8);
        } else {
          doc.text(sanitizePdfText(value), x + 2, y + 6.8);
        }
      }
    };

    // Helper to draw section header
    const drawSectionHeader = (title: string, sub?: string): void => {
      doc.setFillColor(...charcoalDark);
      doc.rect(margin, curY, contentWidth, 5.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 3, curY + 3.8);

      if (sub) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.8);
        doc.setTextColor(220, 225, 230);
        doc.text(sub, pageWidth - margin - 3, curY + 3.8, { align: 'right' });
      }
      curY += 7.5;
    };

    // ==========================================
    // PAGE 1: CLIENT DETAILS, REQUIREMENTS & SIGNATURES
    // ==========================================

    // Top Brand Accent Bar
    doc.setFillColor(...goldPrimary);
    doc.rect(margin, margin, contentWidth, 2, 'F');

    // Header Content
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(...charcoalDark);
    doc.text('KLOUD', margin, margin + 7.5);
    
    // Cyan REALTY
    const kloudWidth = doc.getTextWidth('KLOUD ');
    doc.setTextColor(...cyanAccent);
    doc.text('REALTY', margin + kloudWidth, margin + 7.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text('THE PLACE TO FIND YOUR PLACE', margin, margin + 11.5);

    // Office & Credentials on the right
    doc.setFontSize(7.2);
    doc.setTextColor(...charcoalDark);
    doc.setFont('helvetica', 'bold');
    doc.text('MAHARERA REGISTRATION ID: A0311 72501659', pageWidth - margin, margin + 5.5, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text('Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010', pageWidth - margin, margin + 9, { align: 'right' });
    doc.text('Tel: +91 86-555-88880 / +91 96-199-77171 | Email: kloudrealty@gmail.com', pageWidth - margin, margin + 12.5, { align: 'right' });

    // Document Title Banner
    let curY = margin + 16;
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, curY, contentWidth, 10.5, 'F');
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.35);
    doc.rect(margin, curY, contentWidth, 10.5, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...charcoalDark);
    doc.text('CLIENT REGISTRATION & PROFESSIONAL ENGAGEMENT FORM', pageWidth / 2, curY + 4.8, { align: 'center' });
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('Official Real Estate Advisory Engagement & Client Intake Dossier', pageWidth / 2, curY + 8.5, { align: 'center' });

    curY += 13.5;

    // ----------------------------------------------------
    // SECTION A: CLIENT PERSONAL DETAILS
    // ----------------------------------------------------
    drawSectionHeader('SECTION A — CLIENT PERSONAL DETAILS', 'Confidential Client Identification');

    const halfW = (contentWidth - 3) / 2;
    const thirdW = (contentWidth - 6) / 3;

    // Row 1: Full Name of Client (2/3 width) & Date of Birth (1/3 width)
    const row1W1 = (contentWidth - 3) * (2 / 3);
    const row1W2 = (contentWidth - 3) * (1 / 3);
    drawFormField('Full Name of Client', prefill?.fullName, margin, curY, row1W1, 8);
    drawFormField('Date of Birth (DD/MM/YYYY)', prefill?.dob, margin + row1W1 + 3, curY, row1W2, 8);
    curY += 10;

    // Row 2: Mobile Number, WhatsApp Number, Email Address (1/3 width each)
    drawFormField('Mobile Number', prefill?.phone, margin, curY, thirdW, 8);
    drawFormField('WhatsApp Number', prefill?.whatsapp || prefill?.phone, margin + thirdW + 3, curY, thirdW, 8);
    drawFormField('Email Address', prefill?.email, margin + (thirdW * 2) + 6, curY, thirdW, 8);
    curY += 10;

    // Row 3: Residential Address (full width)
    drawFormField('Residential Address (Street, Building / Apartment No.)', prefill?.address, margin, curY, contentWidth, 8);
    curY += 10;

    // Row 4: City & PIN Code (1/2 width), PAN Number (1/2 width)
    drawFormField('City and PIN Code', prefill?.cityPin, margin, curY, halfW, 8);
    drawFormField('PAN Number (Optional at Initial Registration)', prefill?.pan, margin + halfW + 3, curY, halfW, 8);
    curY += 11.5;

    // ----------------------------------------------------
    // SECTION B: PROPERTY REQUIREMENTS & ENGAGEMENT OBJECTIVE
    // ----------------------------------------------------
    drawSectionHeader('SECTION B — PROPERTY REQUIREMENTS & ENGAGEMENT OBJECTIVE', 'Please indicate the scope of advisory');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(...charcoalDark);
    doc.text('PURPOSE OF ENGAGEMENT (Select all that apply):', margin, curY + 1.5);
    curY += 4.5;

    const purposesList = [
      'Purchase – Primary Market',
      'Purchase – Resale Property',
      'Residential Rental',
      'Commercial Property',
      'Sale of Property',
      'Leasing of Property',
      'Second Home / Land / Plot',
      'Redevelopment Consultancy',
      'General Property Consultation'
    ];

    const colW = contentWidth / 3;
    purposesList.forEach((purpose, idx) => {
      const col = idx % 3;
      const row = Math.floor(idx / 3);
      const px = margin + col * colW;
      const py = curY + row * 5.2;

      const isChecked = prefill?.purposes?.some(p => p.toLowerCase().includes(purpose.toLowerCase().slice(0, 8)));

      // Checkbox Box
      doc.setDrawColor(...charcoalDark);
      doc.setLineWidth(0.25);
      doc.rect(px, py - 2.8, 3, 3);

      if (isChecked) {
        doc.setFillColor(...goldPrimary);
        doc.rect(px + 0.5, py - 2.3, 2, 2, 'F');
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(...charcoalDark);
      doc.text(purpose, px + 4.8, py - 0.5);
    });

    curY += 18;

    // Requirement Spec fields:
    // Row 1: Preferred Location (1/2 width) & Property Type (1/2 width)
    drawFormField('Preferred Property Location(s)', prefill?.preferredLocation, margin, curY, halfW, 8);
    drawFormField('Property Type (Apartment, Penthouse, Villa, Land, Commercial)', prefill?.propertyType, margin + halfW + 3, curY, halfW, 8);
    curY += 9.8;

    // Row 2: Preferred Configuration (1/2 width) & Approximate Budget (1/2 width)
    drawFormField('Preferred Configuration (e.g. 2, 3, 4, 5 BHK / Plot Area)', prefill?.configuration, margin, curY, halfW, 8);
    drawFormField('Approximate Budget (INR in Crores / Lakhs)', sanitizePdfText(prefill?.budget), margin + halfW + 3, curY, halfW, 8);
    curY += 9.8;

    // Row 3: Preferred Timeline (full width)
    drawFormField('Preferred Timeline', prefill?.timeline, margin, curY, contentWidth, 8);
    curY += 9.8;

    // Row 4: Specific Requirements / Notes / Society Details (full width, 13mm box)
    drawFormField('Specific Requirements / Notes / Society Details (if Redevelopment Enquiry)', prefill?.additionalRequirements, margin, curY, contentWidth, 13);
    curY += 16;

    // ----------------------------------------------------
    // SECTION D (MOVED TO PAGE 1): CLIENT DECLARATION & FORMAL EXECUTION
    // Utilising the vacant space on Page 1 for signatures
    // ----------------------------------------------------
    drawSectionHeader('SECTION D — CLIENT DECLARATION & FORMAL EXECUTION', 'Execution & Signatures on Page 1');

    // Declaration quote box
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, curY, contentWidth, 12, 'F');
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.rect(margin, curY, contentWidth, 12, 'D');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    const declText = '"I hereby confirm that the information provided above is accurate and that I have read and understood the professional engagement and fee terms stated overleaf on Page 2 (Term Sheet). I agree to the applicable terms specifically communicated and accepted by me in writing."';
    doc.text(doc.splitTextToSize(declText, contentWidth - 6), margin + 3, curY + 3.8);

    // Fee acceptance checkbox
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.35);
    doc.rect(margin + 3, curY + 7.6, 3.2, 3.2);
    if (prefill?.clientSignature) {
      doc.setFillColor(...goldPrimary);
      doc.rect(margin + 3.6, curY + 8.2, 2, 2, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(...charcoalDark);
    doc.text('I confirm acceptance of the applicable professional engagement and fee principles stated overleaf (Page 2).', margin + 8.5, curY + 10);

    curY += 14.5;

    // Signature Blocks side-by-side (Generous 34mm height for handwriting)
    const sigBlockW = (contentWidth - 6) / 2;
    const sigBoxH = 34;

    // Client Signature Box
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.rect(margin, curY, sigBlockW, sigBoxH);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('CLIENT SIGNATURE & EXECUTION', margin + 3, curY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    
    if (prefill?.clientSignature) {
      doc.setFont('times', 'italic');
      doc.setFontSize(10.5);
      doc.setTextColor(...goldPrimary);
      doc.text(prefill.clientSignature, margin + 4, curY + 13);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...grayText);
      doc.text('[Digital Acknowledgment Verified]', margin + 4, curY + 17.5);
    } else {
      doc.text('Signature: _____________________________________________', margin + 3, curY + 14);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text(`Client Name: ${prefill?.fullName || '__________________________________________'}`, margin + 3, curY + 23);
    doc.text(`Date: ${prefill?.date || '___________________'}   Place: ${prefill?.place || '____________________'}`, margin + 3, curY + 29.5);

    // Representative Signature Box (Abhishek Gupta)
    const repX = margin + sigBlockW + 6;
    doc.rect(repX, curY, sigBlockW, sigBoxH);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('FOR KLOUD REALTY (AUTHORIZED REPRESENTATIVE)', repX + 3, curY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text('Representative: Abhishek Gupta (Founder / Representative)', repX + 3, curY + 10.5);
    
    // Stylized representative signature stamp
    doc.setFont('times', 'italic');
    doc.setFontSize(10.5);
    doc.setTextColor(...goldPrimary);
    doc.text('Abhishek Gupta', repX + 4, curY + 17.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    const repDate = prefill?.date || new Date().toLocaleDateString('en-GB');
    doc.text(`Official Stamp & Seal: [KLOUD REALTY MAZGAON]`, repX + 3, curY + 23);
    doc.text(`Date: ${repDate}   Office: Mazgaon, Mumbai`, repX + 3, curY + 29.5);

    curY += sigBoxH + 3.5;

    // Guiding callout to Page 2
    doc.setFillColor(...goldLight);
    doc.rect(margin, curY, contentWidth, 7, 'F');
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.25);
    doc.rect(margin, curY, contentWidth, 7, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.7);
    doc.setTextColor(...charcoalDark);
    doc.text('IMPORTANT NOTE:', margin + 3, curY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text('This engagement dossier is subject to the complete Professional Term Sheet & Fee Conditions set out overleaf on Page 2.', margin + 28, curY + 4.5);

    // Page 1 Footer Note
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - margin - 4, pageWidth - margin, pageHeight - margin - 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...grayText);
    doc.text('KLOUD REALTY • Client Record & Execution • Page 1 of 2 • Turn over for Complete Term Sheet', margin, pageHeight - margin - 1.5);
    doc.text('MahaRERA ID: A0311 72501659', pageWidth - margin, pageHeight - margin - 1.5, { align: 'right' });

    // ==========================================
    // PAGE 2: TERM SHEET AND PROFESSIONAL ENGAGEMENT TERMS ONLY
    // ==========================================
    doc.addPage();

    // Top Accent Bar
    doc.setFillColor(...goldPrimary);
    doc.rect(margin, margin, contentWidth, 2, 'F');

    // Page 2 Brand Header
    curY = margin + 7.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(...charcoalDark);
    doc.text('KLOUD', margin, curY);
    const kloudW2 = doc.getTextWidth('KLOUD ');
    doc.setTextColor(...cyanAccent);
    doc.text('REALTY', margin + kloudW2, curY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(...grayText);
    doc.text('PROFESSIONAL TERM SHEET & ENGAGEMENT TERMS', margin, curY + 4.2);

    doc.setFontSize(7.2);
    doc.setTextColor(...charcoalDark);
    doc.setFont('helvetica', 'bold');
    doc.text('MAHARERA REGISTRATION ID: A0311 72501659', pageWidth - margin, curY - 2, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text('Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010', pageWidth - margin, curY + 1.5, { align: 'right' });
    doc.text('Tel: +91 86-555-88880 / +91 96-199-77171 | Email: kloudrealty@gmail.com', pageWidth - margin, curY + 5, { align: 'right' });

    curY += 10;

    // ----------------------------------------------------
    // SECTION C: PROFESSIONAL CONSULTANCY & FEE AGREEMENT
    // ----------------------------------------------------
    drawSectionHeader('SECTION C — PROFESSIONAL CONSULTANCY & FEE AGREEMENT', 'Standard Terms of Advisory, Service Scope & Remuneration Schedule');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(...grayText);
    doc.text(
      'This Term Sheet governs the advisory and consultation relationship between KLOUD REALTY ("Consultancy") and the Client registered on Page 1. Both parties agree to the following operational, commercial, and legal principles:',
      margin,
      curY,
      { maxWidth: contentWidth }
    );
    curY += 7.5;

    const agreementPoints = [
      {
        title: '1. Scope of Professional Advisory',
        desc: 'Kloud Realty provides professional property advisory, consultation, market research, property identification, comparative valuation insights, negotiations, and transaction coordination across primary market, resale, leasing, redevelopment, and land.'
      },
      {
        title: '2. Advance Communication of Fees',
        desc: 'Consultation fees, wherever applicable, will be communicated to the client in advance and agreed upon before the consultation or advisory engagement takes place.'
      },
      {
        title: '3. Purchase / Sale Transaction Fee Terms',
        desc: 'If a successful property purchase or sale is facilitated through Kloud Realty, professional brokerage / advisory fees will be payable as mutually agreed in writing before transaction execution or registration.'
      },
      {
        title: '4. Rental / Lease Transaction Fee Terms',
        desc: 'Applicable professional leasing / leave-and-license brokerage fees will be communicated and agreed upon in writing prior to proceeding with the formal lease transaction.'
      },
      {
        title: '5. Written Recording of Commercial Terms',
        desc: 'The applicable fee amount or percentage, payment terms, milestones, and specific transaction conditions will be recorded separately in writing before the transaction or engagement is executed.'
      },
      {
        title: '6. Payment Conditions & Milestones',
        desc: 'Invoices and fee disbursements shall be made strictly according to mutually agreed milestones upon transaction closing. Delayed settlements shall be governed by prevailing commercial standards.'
      },
      {
        title: '7. Statutory Taxes & GST Compliance',
        desc: 'Applicable statutory taxes, including Goods & Services Tax (GST) where applicable, will be communicated separately and charged according to prevailing statutory rates and regulations.'
      },
      {
        title: '8. Nature of Registration & Independent Due Diligence',
        desc: 'Submitting this registration form registers client requirements and does not create an immediate financial liability. Fees become payable strictly according to specific engagement terms agreed in writing. Clients are advised to carry out independent title and regulatory verification under MahaRERA provisions.'
      }
    ];

    agreementPoints.forEach((point) => {
      doc.setFillColor(252, 252, 253);
      const fullText = `${point.title}: ${point.desc}`;
      const textLines = doc.splitTextToSize(fullText, contentWidth - 8);
      const blockHeight = textLines.length * 3.4 + 2.5;

      doc.rect(margin, curY - 1.2, contentWidth, blockHeight, 'F');
      doc.setDrawColor(235, 238, 240);
      doc.setLineWidth(0.15);
      doc.rect(margin, curY - 1.2, contentWidth, blockHeight, 'D');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.1);
      doc.setTextColor(...charcoalDark);
      doc.text(textLines, margin + 4, curY + 1.8);
      curY += blockHeight + 1.5;
    });

    curY += 2;

    // Consultancy Remuneration Details Section
    doc.setFillColor(...goldLight);
    doc.rect(margin, curY, contentWidth, 24, 'F');
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.3);
    doc.rect(margin, curY, contentWidth, 24, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.2);
    doc.setTextColor(...goldPrimary);
    doc.text('CONSULTANCY REMUNERATION RECORD & SPECIFIC TRANSACTION TERMS', margin + 3, curY + 4);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.5);
    doc.setTextColor(...grayText);
    doc.text('(To be recorded and initialed upon specific transaction engagement)', pageWidth - margin - 3, curY + 4, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    const feeStr = prefill?.feeStructure ? `: ${prefill.feeStructure}` : ': _________________________________________________';
    const gstStr = prefill?.gstStatus ? `: ${prefill.gstStatus}` : ': ____________________';
    const milesStr = prefill?.paymentMilestones ? `: ${prefill.paymentMilestones}` : ': _________________________________________________';
    const termsStr = prefill?.specialTerms ? `: ${prefill.specialTerms}` : ': ____________________';

    doc.text(`Applicable Fee Structure${feeStr}`, margin + 3, curY + 9);
    doc.text(`GST Status${gstStr}`, margin + 115, curY + 9);
    doc.text(`Payment Milestones${milesStr}`, margin + 3, curY + 14);
    doc.text(`Special Covenants${termsStr}`, margin + 115, curY + 14);
    doc.text(`Transaction Reference / Property Unit: __________________________________________________________________________________`, margin + 3, curY + 19);

    curY += 28;

    // ----------------------------------------------------
    // GOVERNING COVENANTS & LEGAL DISCLOSURES (ON PAGE 2)
    // ----------------------------------------------------
    drawSectionHeader('TERMS & CONDITIONS — GOVERNING ADVISORY COVENANTS', 'Client Confidentiality & Statutory Standards');

    const covenants = [
      'A. Confidentiality & Data Protection: All personal and property information provided by the Client on Page 1 is held in strict professional confidence and will only be utilized for legitimate advisory, property search, and transaction purposes.',
      'B. Non-Speculative Advisory Policy: Kloud Realty operates strictly as a RERA-registered real estate consultancy. All comparative market values, projections, and investment overviews are shared in good faith without speculative guarantees.',
      'C. Legal Due Diligence: While Kloud Realty coordinates due diligence, clients are encouraged to conduct independent title and statutory reviews prior to executing binding conveyance deeds.',
      'D. Cross-Reference to Page 1 Execution: The formal execution, client signature, representative signature, dates, and declarations completed on Page 1 of this dossier formally incorporate and bind the parties to the complete terms of this Term Sheet.'
    ];

    covenants.forEach((cov) => {
      const covLines = doc.splitTextToSize(cov, contentWidth - 6);
      const covH = covLines.length * 3.3 + 1.8;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(...grayText);
      doc.text(covLines, margin + 3, curY + 2);
      curY += covH + 1;
    });

    curY += 2;

    // Page 2 Execution Reference Banner
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, curY, contentWidth, 10, 'F');
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.rect(margin, curY, contentWidth, 10, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.8);
    doc.setTextColor(...charcoalDark);
    doc.text('FORMAL EXECUTION RECORDED ON PAGE 1:', margin + 3, curY + 4.2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.7);
    doc.setTextColor(...grayText);
    doc.text('This Term Sheet constitutes Page 2 of 2. Client and Authorized Representative signatures are executed on Page 1.', margin + 3, curY + 7.8);

    // Page 2 Footer
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - margin - 4, pageWidth - margin, pageHeight - margin - 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...grayText);
    doc.text('KLOUD REALTY • Registered Office: Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010 • Page 2 of 2 (Term Sheet)', margin, pageHeight - margin - 1.5);
    doc.text('MahaRERA ID: A0311 72501659', pageWidth - margin, pageHeight - margin - 1.5, { align: 'right' });

    return doc;
  },

  /**
   * Generates and triggers browser download of the Client Registration PDF.
   */
  generateClientRegistrationPdf(prefill?: RegistrationFormData): void {
    const doc = this.buildClientRegistrationDocument(prefill);
    const fileName = prefill?.fullName 
      ? `KLOUD_REALTY_Client_Registration_${prefill.fullName.replace(/\s+/g, '_')}.pdf`
      : 'KLOUD_REALTY_Client_Registration_Form_Professional.pdf';
    doc.save(fileName);
  }
};
