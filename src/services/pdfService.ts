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

    // ==========================================
    // PAGE 1: CLIENT DETAILS & PROPERTY REQUIREMENTS
    // ==========================================

    // Top Brand Accent Bar
    doc.setFillColor(...goldPrimary);
    doc.rect(margin, margin, contentWidth, 2, 'F');

    // Header Content
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(...charcoalDark);
    doc.text('KLOUD', margin, margin + 8);
    
    // Cyan REALTY
    const kloudWidth = doc.getTextWidth('KLOUD ');
    doc.setTextColor(...cyanAccent);
    doc.text('REALTY', margin + kloudWidth, margin + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grayText);
    doc.text('THE PLACE TO FIND YOUR PLACE', margin, margin + 12.5);

    // Office & Credentials on the right
    doc.setFontSize(7.5);
    doc.setTextColor(...charcoalDark);
    doc.setFont('helvetica', 'bold');
    doc.text('MAHARERA REGISTRATION ID: A0311 72501659', pageWidth - margin, margin + 6, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...grayText);
    doc.text('Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010', pageWidth - margin, margin + 9.5, { align: 'right' });
    doc.text('Tel: +91 86-555-88880 / +91 96-199-77171 | Email: kloudrealty@gmail.com', pageWidth - margin, margin + 13, { align: 'right' });

    // Document Title Banner
    let curY = margin + 18;
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, curY, contentWidth, 12, 'F');
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.4);
    doc.rect(margin, curY, contentWidth, 12, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...charcoalDark);
    doc.text('CLIENT REGISTRATION & PROFESSIONAL ENGAGEMENT FORM', pageWidth / 2, curY + 5.5, { align: 'center' });
    
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text('Official Real Estate Advisory Engagement & Requirement Intake Dossier', pageWidth / 2, curY + 9.5, { align: 'center' });

    curY += 16;

    // Helper to draw section header
    const drawSectionHeader = (title: string, sub: string) => {
      doc.setFillColor(...charcoalDark);
      doc.rect(margin, curY, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text(title, margin + 3, curY + 4.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(230, 230, 230);
      doc.text(sub, pageWidth - margin - 3, curY + 4.2, { align: 'right' });
      curY += 8;
    };

    // Helper to draw clean form fields
    const drawFormField = (label: string, value: string | undefined, x: number, y: number, w: number, h: number = 8.5) => {
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

    // ----------------------------------------------------
    // SECTION A: CLIENT PERSONAL DETAILS
    // ----------------------------------------------------
    drawSectionHeader('SECTION A — CLIENT PERSONAL DETAILS', 'Confidential Client Identification');

    const halfW = (contentWidth - 3) / 2;
    const thirdW = (contentWidth - 6) / 3;

    // Row 1: Full Name of Client (2/3 width) & Date of Birth (1/3 width)
    const row1W1 = (contentWidth - 3) * (2 / 3);
    const row1W2 = (contentWidth - 3) * (1 / 3);
    drawFormField('Full Name of Client', prefill?.fullName, margin, curY, row1W1, 8.5);
    drawFormField('Date of Birth (DD/MM/YYYY)', prefill?.dob, margin + row1W1 + 3, curY, row1W2, 8.5);
    curY += 10.5;

    // Row 2: Mobile Number, WhatsApp Number, Email Address (1/3 width each)
    drawFormField('Mobile Number', prefill?.phone, margin, curY, thirdW, 8.5);
    drawFormField('WhatsApp Number', prefill?.whatsapp || prefill?.phone, margin + thirdW + 3, curY, thirdW, 8.5);
    drawFormField('Email Address', prefill?.email, margin + (thirdW * 2) + 6, curY, thirdW, 8.5);
    curY += 10.5;

    // Row 3: Residential Address (full width)
    drawFormField('Residential Address (Street, Building / Apartment No.)', prefill?.address, margin, curY, contentWidth, 8.5);
    curY += 10.5;

    // Row 4: City & PIN Code (1/2 width), PAN Number (1/2 width)
    drawFormField('City and PIN Code', prefill?.cityPin, margin, curY, halfW, 8.5);
    drawFormField('PAN Number (Optional at Initial Registration)', prefill?.pan, margin + halfW + 3, curY, halfW, 8.5);
    curY += 13.5;

    // ----------------------------------------------------
    // SECTION B: PROPERTY REQUIREMENTS & ENGAGEMENT OBJECTIVE
    // ----------------------------------------------------
    drawSectionHeader('SECTION B — PROPERTY REQUIREMENTS & ENGAGEMENT OBJECTIVE', 'Please indicate the scope of advisory');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...charcoalDark);
    doc.text('PURPOSE OF ENGAGEMENT (Select all that apply):', margin, curY + 2);
    curY += 5;

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
      const py = curY + row * 6;

      const isChecked = prefill?.purposes?.some(p => p.toLowerCase().includes(purpose.toLowerCase().slice(0, 8)));

      // Checkbox Box
      doc.setDrawColor(...charcoalDark);
      doc.setLineWidth(0.3);
      doc.rect(px, py - 3, 3.2, 3.2);

      if (isChecked) {
        doc.setFillColor(...goldPrimary);
        doc.rect(px + 0.5, py - 2.5, 2.2, 2.2, 'F');
      }

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(...charcoalDark);
      doc.text(purpose, px + 5, py - 0.5);
    });

    curY += 21;

    // Separate Requirement Spec fields:
    // Row 1: Preferred Location (1/2 width) & Property Type (1/2 width)
    drawFormField('Preferred Property Location(s)', prefill?.preferredLocation, margin, curY, halfW, 8.5);
    drawFormField('Property Type (Apartment, Penthouse, Villa, Land, Commercial)', prefill?.propertyType, margin + halfW + 3, curY, halfW, 8.5);
    curY += 10.5;

    // Row 2: Preferred Configuration (1/2 width) & Approximate Budget (1/2 width)
    drawFormField('Preferred Configuration (e.g. 2, 3, 4, 5 BHK / Plot Area)', prefill?.configuration, margin, curY, halfW, 8.5);
    drawFormField('Approximate Budget (INR in Crores / Lakhs)', sanitizePdfText(prefill?.budget), margin + halfW + 3, curY, halfW, 8.5);
    curY += 10.5;

    // Row 3: Preferred Timeline (full width)
    drawFormField('Preferred Timeline', prefill?.timeline, margin, curY, contentWidth, 8.5);
    curY += 10.5;

    // Row 4: Specific Requirements / Notes / Society Details (full width, larger box)
    drawFormField('Specific Requirements / Notes / Society Details (if Redevelopment Enquiry)', prefill?.additionalRequirements, margin, curY, contentWidth, 15);
    curY += 19;

    // Page 1 Footer Note
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - margin - 5, pageWidth - margin, pageHeight - margin - 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...grayText);
    doc.text('KLOUD REALTY • Confidential Client Record • Page 1 of 2 • Turn over for Professional Consultancy & Fee Agreement', margin, pageHeight - margin - 2);
    doc.text('MahaRERA ID: A0311 72501659', pageWidth - margin, pageHeight - margin - 2, { align: 'right' });

    // ==========================================
    // PAGE 2: PROFESSIONAL CONSULTANCY & FEE AGREEMENT + DECLARATION
    // ==========================================
    doc.addPage();

    // Top Accent Bar
    doc.setFillColor(...goldPrimary);
    doc.rect(margin, margin, contentWidth, 2, 'F');

    curY = margin + 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...charcoalDark);
    doc.text('KLOUD REALTY', margin, curY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text('Client Engagement & Professional Fee Terms (MahaRERA Reg: A0311 72501659)', margin + 35, curY);
    doc.text('Office: Mazgaon, Mumbai – 400010', pageWidth - margin, curY, { align: 'right' });

    curY += 6;

    // ----------------------------------------------------
    // SECTION C: PROFESSIONAL CONSULTANCY & FEE AGREEMENT
    // ----------------------------------------------------
    drawSectionHeader('SECTION C — PROFESSIONAL CONSULTANCY & FEE AGREEMENT', 'Terms of Advisory & Remuneration');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(...grayText);
    doc.text(
      'This agreement governs the advisory and consultation relationship between KLOUD REALTY ("Consultancy") and the Client registered herein. Both parties agree to the following operational and remuneration principles:',
      margin,
      curY,
      { maxWidth: contentWidth }
    );
    curY += 7.5;

    const agreementPoints = [
      '1. Scope of Professional Advisory: Kloud Realty provides professional property advisory, consultation, market research, property identification, comparative valuation insights, negotiations and transaction coordination.',
      '2. Advance Communication of Fees: Consultation fees, wherever applicable, will be communicated to the client in advance and agreed upon before the consultation takes place.',
      '3. Purchase / Sale Transactions: If a successful property purchase or sale is facilitated through Kloud Realty, professional fees will be payable as mutually agreed in writing.',
      '4. Rental / Lease Transactions: Applicable professional fees will be communicated and agreed upon before proceeding with the transaction.',
      '5. Written Recording of Terms: The applicable fee amount or percentage, payment terms, milestones and conditions will be recorded separately in writing before the transaction or engagement is executed.',
      '6. Statutory Taxes: Applicable taxes, including GST where applicable, will be communicated separately and charged according to prevailing laws.',
      '7. Registration Nature: Submitting the registration form does not automatically create an immediate financial obligation. Professional fees become payable strictly according to the specific engagement and mutually accepted written terms.'
    ];

    agreementPoints.forEach((point) => {
      // Background row for subtle luxury legibility
      doc.setFillColor(252, 252, 253);
      const textLines = doc.splitTextToSize(point, contentWidth - 8);
      const blockHeight = textLines.length * 3.6 + 2.5;

      doc.rect(margin, curY - 1.5, contentWidth, blockHeight, 'F');
      doc.setDrawColor(235, 238, 240);
      doc.setLineWidth(0.15);
      doc.rect(margin, curY - 1.5, contentWidth, blockHeight, 'D');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.2);
      doc.setTextColor(...charcoalDark);
      doc.text(textLines, margin + 4, curY + 1.8);
      curY += blockHeight + 1.8;
    });

    curY += 2;

    // Consultancy Remuneration Details Section
    doc.setFillColor(...goldLight);
    doc.rect(margin, curY, contentWidth, 16, 'F');
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.3);
    doc.rect(margin, curY, contentWidth, 16, 'D');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...goldPrimary);
    doc.text('CONSULTANCY REMUNERATION DETAILS (To be recorded and initialed upon specific engagement):', margin + 3, curY + 3.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    const feeStr = prefill?.feeStructure ? `: ${prefill.feeStructure}` : ': ___________________________________________________________';
    const gstStr = prefill?.gstStatus ? `: ${prefill.gstStatus}` : ': _______________';
    const milesStr = prefill?.paymentMilestones ? `: ${prefill.paymentMilestones}` : ': _______________________________________________________________';
    const termsStr = prefill?.specialTerms ? `: ${prefill.specialTerms}` : ': ____________';

    doc.text(`Applicable Fee Structure${feeStr}  GST Status${gstStr}`, margin + 3, curY + 8.5);
    doc.text(`Payment Milestones${milesStr}  Special Terms${termsStr}`, margin + 3, curY + 13);

    curY += 20;

    // ----------------------------------------------------
    // SECTION D: CLIENT DECLARATION & SIGNATURE
    // ----------------------------------------------------
    drawSectionHeader('SECTION D — CLIENT DECLARATION & SIGNATURE', 'Formal Acceptance & Authorization');

    // Declaration quote box
    doc.setFillColor(248, 249, 250);
    doc.rect(margin, curY, contentWidth, 14, 'F');
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.rect(margin, curY, contentWidth, 14, 'D');

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.3);
    doc.setTextColor(...charcoalDark);
    const declText = '"I hereby confirm that the information provided above is accurate and that I have read and understood the professional engagement and fee terms. I agree to the applicable terms specifically communicated and accepted by me in writing."';
    doc.text(doc.splitTextToSize(declText, contentWidth - 6), margin + 3, curY + 4.5);

    // Fee acceptance checkbox
    doc.setDrawColor(...goldPrimary);
    doc.setLineWidth(0.4);
    doc.rect(margin + 3, curY + 9, 3.5, 3.5);
    doc.setFillColor(...goldPrimary);
    doc.rect(margin + 3.7, curY + 9.7, 2.1, 2.1, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text('I confirm acceptance of the applicable professional engagement and fee principles stated herein.', margin + 9, curY + 11.5);

    curY += 18;

    // Signature Blocks side-by-side
    const sigBlockW = (contentWidth - 6) / 2;

    // Client Signature Box
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.rect(margin, curY, sigBlockW, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('CLIENT SIGNATURE & EXECUTION', margin + 3, curY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    
    // If digital signature provided, render stylized representation
    if (prefill?.clientSignature) {
      doc.setFont('times', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(...goldPrimary);
      doc.text(prefill.clientSignature, margin + 4, curY + 11);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(...grayText);
      doc.text('[Digital Acknowledgment Verified]', margin + 4, curY + 15);
    } else {
      doc.text('Signature: _______________________________________', margin + 3, curY + 14);
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text(`Client Name: ${prefill?.fullName || '____________________________________'}`, margin + 3, curY + 20);
    doc.text(`Date: ${prefill?.date || '_______________'}   Place: ${prefill?.place || '____________________'}`, margin + 3, curY + 25);

    // Representative Signature Box (Abhishek Gupta)
    const repX = margin + sigBlockW + 6;
    doc.rect(repX, curY, sigBlockW, 28);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...grayText);
    doc.text('FOR KLOUD REALTY (AUTHORIZED REPRESENTATIVE)', repX + 3, curY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text('Representative: Abhishek Gupta (Founder / Representative)', repX + 3, curY + 10);
    
    // Stylized representative signature stamp
    doc.setFont('times', 'italic');
    doc.setFontSize(9.5);
    doc.setTextColor(...goldPrimary);
    doc.text('Abhishek Gupta', repX + 4, curY + 16);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...charcoalDark);
    doc.text(`Date: ${prefill?.date || new Date().toLocaleDateString('en-GB')}   Office: Mazgaon, Mumbai`, repX + 3, curY + 23);

    // Page 2 Footer
    doc.setDrawColor(...grayBorder);
    doc.setLineWidth(0.2);
    doc.line(margin, pageHeight - margin - 5, pageWidth - margin, pageHeight - margin - 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(...grayText);
    doc.text('KLOUD REALTY • Registered Office: Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Mazgaon, Mumbai – 400010 • Page 2 of 2', margin, pageHeight - margin - 2);
    doc.text('MahaRERA ID: A0311 72501659', pageWidth - margin, pageHeight - margin - 2, { align: 'right' });

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
