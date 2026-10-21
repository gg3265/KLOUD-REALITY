# KLOUD REALTY — "The Place to Find Your Place"

Official web platform for **KLOUD REALTY**, a premier RERA-registered real estate consultancy based in Mazgaon, Mumbai.

**MahaRERA Registration ID:** `A0311 72501659`  
**Founder / Representative:** Abhishek Gupta  
**Registered Office:** Shop No. 2, 321 R.B. Marg, Abdul Rauf Manzil, Opposite Piramal Aranya, Mazgaon, Mumbai – 400010, Maharashtra, India.  
**Contact:** `+91 86555 88880` / `+91 96199 77171` | `kloudrealty@gmail.com`

---

## 🏛️ Brand Overview & Core Verticals

1. **Primary Market / New Launches**: Curated access to luxury developer projects across Mumbai (South Mumbai, Central Mumbai, Bandra, Worli, Mazgaon, etc.).
2. **Resale Residences**: Verified pre-owned apartments, penthouses, and heritage properties with comprehensive legal title checks.
3. **Leasing Desk (Rent)**: Corporate and high-net-worth residential leasing advisory.
4. **Second Homes & Coastal Living**: Private villas and land in Alibaug, Lonavala, and weekend destinations.
5. **Land & Plotted Developments**: Non-speculative, title-verified residential plots with clear regulatory status.
6. **Society Redevelopment Advisory**: Dedicated guidance for cooperative housing societies seeking structured developer tenders.

---

## 💻 Tech Stack & Architecture

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom luxury palette (Rich Charcoal `#14171A`, Champagne Gold `#C8A45D`, Deep Cyan `#01B6E5`, Soft Ivory)
- **Icons**: Lucide React
- **Build System**: Vite 6
- **Routing**: Lightweight hash router (`#/`, `#/buy`, `#/rent`, `#/second-homes`, `#/land`, `#/redevelopment`, `#/about`, `#/contact`, `#/admin`)
- **Backend / CRM**: Supabase Postgres integration with local fallback service (auto-generates tracking IDs `KR-2026-XXXXX`)
- **Admin Dashboard**: Secure PIN-protected management portal (`#/admin`) with CSV lead export and property publishing controls

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gg3265/KLOUD-REALITY.git

# Navigate into the project folder
cd KLOUD-REALITY

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build & Preview

```bash
# Compile and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` to configure optional live Supabase connectivity:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

*Note: The platform is fully self-contained and will operate in local persistence mode if Supabase credentials are not provided.*

---

## 📜 Regulatory Notice

KLOUD REALTY operates strictly as a RERA-registered real estate consultant (`A0311 72501659`). All project details, unit specifications, and pricing are subject to developer terms and official MahaRERA disclosures.
