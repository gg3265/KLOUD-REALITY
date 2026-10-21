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
  number_of_units TEXT
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
