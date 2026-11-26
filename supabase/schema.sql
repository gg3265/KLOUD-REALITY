-- ========================================================
-- KLOUD REALTY — Production Supabase Schema & Security Setup
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  enquiry_source TEXT NOT NULL,
  service_vertical TEXT NOT NULL,
  preferred_location TEXT,
  budget_range TEXT,
  preferred_contact_method TEXT DEFAULT 'Phone Call',
  property_id TEXT,
  property_title TEXT,
  message TEXT,
  lead_status TEXT DEFAULT 'New',
  assigned_to TEXT DEFAULT 'Abhishek Gupta',
  notes TEXT[] DEFAULT '{}',
  consent_status BOOLEAN DEFAULT true,
  role_in_society TEXT,
  building_age TEXT,
  number_of_units TEXT,
  -- Finance & Home Loan
  employment_type TEXT,
  approx_property_value TEXT,
  required_loan_amount TEXT,
  existing_loan_obligations TEXT,
  preferred_callback_time TEXT,
  -- Client Registration
  date_of_birth TEXT,
  whatsapp_number TEXT,
  residential_address TEXT,
  city_pin TEXT,
  pan_number TEXT,
  purpose_of_engagement TEXT[],
  property_type TEXT,
  configuration TEXT,
  preferred_timeline TEXT,
  property_requirement TEXT,
  accepted_fee_terms BOOLEAN DEFAULT false,
  client_signature TEXT,
  declaration_place TEXT,
  declaration_date TEXT,
  fee_structure TEXT,
  gst_status TEXT,
  payment_milestones TEXT,
  special_terms TEXT,
  -- Extended Project & Submission Metadata
  developer TEXT,
  project_slug TEXT,
  page_url TEXT,
  selected_config TEXT,
  selected_floor_plan TEXT,
  selected_floor_range TEXT,
  enquiry_button_source TEXT,
  is_site_visit BOOLEAN DEFAULT false,
  custom_fields JSONB,
  email_delivery_status TEXT DEFAULT 'PENDING',
  email_error TEXT
);

-- Index for searching and filtering leads
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_vertical ON leads(service_vertical);

-- RLS for LEADS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public submissions (inserts only)
CREATE POLICY "Allow public to submit enquiries" ON leads
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admins to read and update leads
CREATE POLICY "Allow authenticated users to read leads" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update leads" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 2. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL,
  property_type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  price_display TEXT NOT NULL,
  location TEXT NOT NULL,
  locality TEXT NOT NULL,
  city TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  carpet_area TEXT,
  plot_area TEXT,
  images TEXT[] DEFAULT '{}',
  description TEXT,
  features TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  possession TEXT,
  construction_status TEXT,
  furnishing_status TEXT,
  rera_number TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_demo_data BOOLEAN DEFAULT true,
  verification_status TEXT DEFAULT 'Demonstration Listing',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for PROPERTIES
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Allow public to view published properties
CREATE POLICY "Allow public read of published properties" ON properties
  FOR SELECT USING (published = true);

-- Allow admins full control
CREATE POLICY "Allow authenticated admin full access to properties" ON properties
  FOR ALL USING (auth.role() = 'authenticated');
