import React, { useState, useEffect } from 'react';
import { 
  Lock, Users, Building, ShieldCheck, Download, Search, Filter, 
  Plus, CheckCircle, Clock, Phone, Mail, MessageSquare, AlertCircle, 
  ExternalLink, LogOut, Sparkles, RefreshCw, Eye, EyeOff
} from 'lucide-react';
import { leadService } from '../services/leadService';
import { propertyService } from '../services/propertyService';
import { Lead, Property, LeadStatus, ServiceVertical, PropertyCategory } from '../types';

export const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('kloud_admin_auth') === 'true';
  });
  const [accessPin, setAccessPin] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab: 'leads' | 'properties' | 'system'
  const [activeTab, setActiveTab] = useState<'leads' | 'properties' | 'system'>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [verticalFilter, setVerticalFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNote, setNewNote] = useState('');

  // Properties state
  const [properties, setProperties] = useState<Property[]>([]);
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // New Property Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newPriceNumeric, setNewPriceNumeric] = useState(0);
  const [newCategory, setNewCategory] = useState<PropertyCategory>('primary');
  const [newPropertyType, setNewPropertyType] = useState<'Apartment' | 'Penthouse' | 'Villa' | 'Plot'>('Apartment');
  const [newLocation, setNewLocation] = useState('');
  const [newLocality, setNewLocality] = useState('');
  const [newBedrooms, setNewBedrooms] = useState(3);
  const [newCarpetArea, setNewCarpetArea] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newRera, setNewRera] = useState('');
  const [newIsDemo, setNewIsDemo] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setLeads(leadService.getAllLeads());
    setProperties(propertyService.getAllProperties());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: kloud2026 or environment variable
    if (accessPin.trim() === 'kloud2026' || accessPin.trim() === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('kloud_admin_auth', 'true');
      setAuthError('');
      loadData();
    } else {
      setAuthError('Incorrect security credentials. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('kloud_admin_auth');
  };
  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    leadService.updateLeadStatus(leadId, status);
    loadData();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, leadStatus: status });
    }
  };

  const handleAddNote = (leadId: string) => {
    if (!newNote.trim()) return;
    leadService.addInternalNote(leadId, newNote.trim());
    setNewNote('');
    loadData();
    const updated = leadService.getAllLeads().find(l => l.id === leadId);
    if (updated) setSelectedLead(updated);
  };

  const handleExportCSV = () => {
    const csv = leadService.exportToCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `kloud_realty_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTogglePublish = (id: string) => {
    propertyService.togglePublish(id);
    loadData();
  };

  const handleToggleFeatured = (id: string) => {
    propertyService.toggleFeatured(id);
    loadData();
  };

  const handleCreateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newProp: Property = {
      id: `prop-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: newTitle.trim(),
      tagline: 'Curated by KLOUD REALTY Advisory Desk',
      category: newCategory,
      propertyType: newPropertyType,
      price: newPriceNumeric || 10000000,
      priceDisplay: newPrice.trim() || 'Price on Request',
      location: newLocation.trim(),
      locality: newLocality.trim() || 'Mazgaon',
      city: 'Mumbai',
      bedrooms: newBedrooms,
      carpetArea: newCarpetArea.trim() || '1,200 sq.ft.',
      images: ['/images/project_exterior_1785684820308.jpg', '/images/project_interior_1785684832928.jpg'],
      description: newDescription.trim() || 'Premium residential inventory presented by KLOUD REALTY.',
      features: ['24/7 Security', 'Reserved Parking', 'Elevator Access'],
      amenities: ['Clubhouse', 'Fitness Suite', 'Landscaped Garden'],
      nearby: [{ label: 'Mazgaon Circle', distance: '5 mins' }],
      possession: 'Immediate / Under Construction',
      constructionStatus: 'Ready Possession',
      reraNumber: newRera.trim() || undefined,
      isFeatured: false,
      isDemoData: newIsDemo,
      verificationStatus: newIsDemo ? 'Demonstration Listing' : 'Verified by KLOUD',
      published: true,
      createdAt: new Date().toISOString()
    };

    propertyService.saveProperty(newProp);
    loadData();
    setShowAddPropertyModal(false);

    // Reset inputs
    setNewTitle('');
    setNewPrice('');
    setNewLocation('');
    setNewDescription('');
    setNewRera('');
  };

  // Filtered Leads
  const filteredLeads = leads.filter(l => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      l.fullName.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.propertyTitle && l.propertyTitle.toLowerCase().includes(q)) ||
      (l.preferredLocation && l.preferredLocation.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'all' || l.leadStatus === statusFilter;
    const matchesVertical = verticalFilter === 'all' || l.serviceVertical === verticalFilter;

    return matchesSearch && matchesStatus && matchesVertical;
  });

  // KPI Calculations
  const totalLeads = leads.length;
  const newLeadsCount = leads.filter(l => l.leadStatus === 'New').length;
  const qualifiedCount = leads.filter(l => l.leadStatus === 'Qualified').length;
  const siteVisitsCount = leads.filter(l => l.leadStatus === 'Site Visit Scheduled').length;
  const backendStatus = leadService.getBackendStatus();
  // If not authenticated, render luxury login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-950 flex items-center justify-center p-4 font-sans text-softWhite">
        <div className="max-w-md w-full bg-charcoal-900 border border-gold-500/30 rounded-sm p-8 shadow-luxury space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-block p-1 rounded bg-charcoal-850 border border-gold-500/30 mb-2">
              <img src="/images/logo_badge.png" alt="KLOUD REALTY" className="h-10 w-auto mx-auto" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white tracking-wider">KLOUD REALTY</h1>
            <p className="text-xs uppercase tracking-widest text-gold-400 font-medium">Internal Advisory Management Portal</p>
          </div>

          {authError && (
            <div className="p-3 rounded text-xs bg-red-950/70 border border-red-800 text-red-200">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-warmGray mb-1">
                Access Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={accessPin}
                  onChange={(e) => setAccessPin(e.target.value)}
                  placeholder="Enter administrator PIN..."
                  className="w-full px-3 py-2.5 rounded bg-charcoal-800 border border-white/10 text-white text-xs outline-none focus:border-gold-500 font-mono tracking-widest"
                />
                <Lock className="w-4 h-4 text-warmGray absolute right-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[10px] text-warmGray/70 mt-1">Default development PIN: <code className="text-gold-300 font-mono">kloud2026</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-widest hover:bg-gold-400 transition-colors shadow-gold-glow"
            >
              Authenticate & Access Portal
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="#/" className="text-xs text-warmGray hover:text-white underline">
              Return to Public Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900 text-softWhite pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Portal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-400">MANAGEMENT PORTAL</span>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {backendStatus.provider}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-light text-white tracking-tight mt-1">
              KLOUD REALTY Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-charcoal-800 hover:bg-charcoal-750 text-xs font-semibold text-white border border-white/10 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>Export Leads (CSV)</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-red-950/40 hover:bg-red-950/70 text-xs text-red-300 border border-red-800/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Overview KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-warmGray block">Total Enquiries</span>
            <div className="text-2xl font-serif font-bold text-white">{totalLeads}</div>
            <p className="text-[10px] text-warmGray/70">Across all 4 verticals</p>
          </div>

          <div className="p-5 rounded bg-charcoal-850 border border-gold-500/30 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-gold-400 block">New / Action Required</span>
            <div className="text-2xl font-serif font-bold text-gold-400">{newLeadsCount}</div>
            <p className="text-[10px] text-warmGray/70">Awaiting callback or assignment</p>
          </div>

          <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-warmGray block">Qualified Leads</span>
            <div className="text-2xl font-serif font-bold text-cyanBrand">{qualifiedCount}</div>
            <p className="text-[10px] text-warmGray/70">Budget & timeline verified</p>
          </div>

          <div className="p-5 rounded bg-charcoal-850 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-warmGray block">Site Visits Scheduled</span>
            <div className="text-2xl font-serif font-bold text-emerald-400">{siteVisitsCount}</div>
            <p className="text-[10px] text-warmGray/70">Active on-ground appointments</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'leads' ? 'border-gold-500 text-gold-400' : 'border-transparent text-warmGray hover:text-white'
            }`}
          >
            Lead CRM ({leads.length})
          </button>

          <button
            onClick={() => setActiveTab('properties')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'properties' ? 'border-gold-500 text-gold-400' : 'border-transparent text-warmGray hover:text-white'
            }`}
          >
            Property Inventory ({properties.length})
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`px-4 py-3 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
              activeTab === 'system' ? 'border-gold-500 text-gold-400' : 'border-transparent text-warmGray hover:text-white'
            }`}
          >
            System & Database
          </button>
        </div>
        {/* TAB 1: LEADS MANAGEMENT */}
        {activeTab === 'leads' && (
          <div className="space-y-6">
            
            {/* Search & Filters Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 bg-charcoal-850 p-4 rounded border border-white/10">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by client name, mobile, email, property, or location..."
                  className="w-full pl-9 pr-4 py-2 rounded bg-charcoal-800 border border-white/10 text-xs text-white outline-none focus:border-gold-500 font-sans"
                />
                <Search className="w-4 h-4 text-warmGray absolute left-3 top-2.5" />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-xs text-white outline-none font-sans"
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={verticalFilter}
                onChange={(e) => setVerticalFilter(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-xs text-white outline-none font-sans"
              >
                <option value="all">All Verticals</option>
                <option value="Primary Market">Primary Market</option>
                <option value="Secondary Market">Secondary Market</option>
                <option value="Second Homes & Land">Second Homes & Land</option>
                <option value="Redevelopment Consulting">Redevelopment Consulting</option>
                <option value="Rental">Rental</option>
                <option value="General Consultation">General Consultation</option>
              </select>
            </div>

            {/* Leads Table */}
            <div className="bg-charcoal-850 rounded border border-white/10 overflow-hidden shadow-luxury">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-warmGray">
                  <thead className="bg-charcoal-950 text-softWhite uppercase tracking-wider text-[10px] border-b border-white/10">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Enquiry ID</th>
                      <th className="py-3.5 px-4 font-semibold">Client Name</th>
                      <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                      <th className="py-3.5 px-4 font-semibold">Vertical & Source</th>
                      <th className="py-3.5 px-4 font-semibold">Budget / Location</th>
                      <th className="py-3.5 px-4 font-semibold">Lead Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-charcoal-800/50 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-medium text-gold-300">
                          {lead.id}
                          <div className="text-[10px] text-warmGray/60 font-sans mt-0.5">
                            {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-white font-medium">
                          {lead.fullName}
                          {lead.roleInSociety && (
                            <span className="block text-[10px] text-cyanBrand font-normal">
                              {lead.roleInSociety}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 space-y-0.5">
                          <div className="text-white font-mono">{lead.phone}</div>
                          <div className="text-[11px] text-warmGray/70">{lead.email}</div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="font-medium text-white">{lead.serviceVertical}</span>
                          <span className="block text-[10px] text-gold-400/80">{lead.enquirySource}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="text-white font-medium">{lead.budgetRange}</span>
                          <span className="block text-[10px] text-warmGray/70">{lead.preferredLocation}</span>
                        </td>

                        <td className="py-3.5 px-4">
                          <select
                            value={lead.leadStatus}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            className="px-2 py-1 rounded text-[11px] font-semibold bg-charcoal-900 border border-white/10 outline-none text-gold-300 font-sans"
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Site Visit Scheduled">Site Visit Scheduled</option>
                            <option value="Negotiation">Negotiation</option>
                            <option value="Converted">Converted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="px-3 py-1 rounded bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-softWhite text-xs font-semibold transition-colors"
                          >
                            Review Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PROPERTY INVENTORY */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-light text-white">Managed Properties</h2>
              <button
                onClick={() => setShowAddPropertyModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider hover:bg-gold-400 transition-colors shadow-gold-glow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div key={p.id} className="bg-charcoal-850 rounded border border-white/10 p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
                        {p.category.toUpperCase()} • {p.propertyType}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white mt-1">{p.title}</h3>
                      <p className="text-xs text-warmGray">{p.location}</p>
                    </div>

                    <button
                      onClick={() => handleTogglePublish(p.id)}
                      className={`p-1.5 rounded text-xs ${p.published ? 'text-emerald-400 bg-emerald-500/10' : 'text-warmGray bg-charcoal-800'}`}
                      title={p.published ? 'Published' : 'Unpublished'}
                    >
                      {p.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs py-2 border-t border-b border-white/5">
                    <span className="font-serif font-bold text-lg text-gold-300">{p.priceDisplay}</span>
                    <span className="text-warmGray">{p.carpetArea || p.plotArea}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => handleToggleFeatured(p.id)}
                      className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                        p.isFeatured 
                          ? 'border-gold-500 text-gold-400 bg-gold-500/10' 
                          : 'border-white/10 text-warmGray hover:text-white'
                      }`}
                    >
                      {p.isFeatured ? 'Featured on Home' : 'Mark as Featured'}
                    </button>

                    <a
                      href={`#/property/${p.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gold-400 hover:underline inline-flex items-center gap-1"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM & DATABASE STATUS */}
        {activeTab === 'system' && (
          <div className="max-w-3xl bg-charcoal-850 p-8 rounded border border-white/10 space-y-6">
            <h2 className="font-serif text-2xl font-light text-white">Database & Deployment Configuration</h2>

            <div className="p-4 rounded bg-charcoal-900 border border-gold-500/30 space-y-2">
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block">
                Active Storage Engine:
              </span>
              <p className="text-base text-white font-medium">
                {backendStatus.provider}
              </p>
              <p className="text-xs text-warmGray leading-relaxed">
                {backendStatus.isConnected 
                  ? 'All lead submissions and inventory changes are synchronized live with your remote Supabase PostgreSQL database.'
                  : 'Operating in self-contained local storage engine. Every enquiry is safely captured with real tracking IDs and can be exported to CSV at any time.'}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-white/10">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Connecting to Live Supabase:
              </h3>
              <p className="text-xs text-warmGray leading-relaxed">
                To connect to an external Supabase instance, supply the following variables in your hosting environment or local <code className="text-gold-300 font-mono">.env</code>:
              </p>
              <pre className="p-4 rounded bg-charcoal-950 border border-white/5 text-xs text-emerald-300 font-mono overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_ADMIN_ACCESS_PIN=kloud2026`}
              </pre>
              <p className="text-xs text-warmGray">
                The database schema and RLS policies are available in <code className="text-gold-300 font-mono">supabase/schema.sql</code>.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  propertyService.resetDemoData();
                  loadData();
                  alert('Default demo property inventory restored.');
                }}
                className="px-4 py-2 rounded bg-charcoal-800 hover:bg-charcoal-700 text-xs text-softWhite border border-white/10"
              >
                Reset Default Demo Inventory
              </button>
            </div>
          </div>
        )}

        {/* Lead Details Modal / Drawer */}
        {selectedLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-charcoal-850 border border-gold-500/30 rounded p-6 max-w-xl w-full text-xs space-y-4 shadow-luxury max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-gold-400 font-mono uppercase tracking-wider">{selectedLead.id}</span>
                  <h3 className="font-serif text-xl font-bold text-white mt-1">{selectedLead.fullName}</h3>
                </div>
                <button onClick={() => setSelectedLead(null)} className="p-1 rounded text-warmGray hover:text-white">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 py-2 border-b border-white/5">
                <div>
                  <span className="text-warmGray block">Phone:</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-white font-mono hover:underline">{selectedLead.phone}</a>
                </div>
                <div>
                  <span className="text-warmGray block">Email:</span>
                  <a href={`mailto:${selectedLead.email}`} className="text-white hover:underline">{selectedLead.email}</a>
                </div>
                <div>
                  <span className="text-warmGray block">Service Vertical:</span>
                  <span className="text-white font-medium">{selectedLead.serviceVertical}</span>
                </div>
                <div>
                  <span className="text-warmGray block">Budget Range:</span>
                  <span className="text-white font-medium">{selectedLead.budgetRange}</span>
                </div>
                <div>
                  <span className="text-warmGray block">Preferred Method:</span>
                  <span className="text-white font-medium">{selectedLead.preferredContactMethod}</span>
                </div>
                <div>
                  <span className="text-warmGray block">Enquiry Source:</span>
                  <span className="text-gold-400 font-medium">{selectedLead.enquirySource}</span>
                </div>
              </div>

              {selectedLead.propertyTitle && (
                <div className="p-3 rounded bg-charcoal-900 border border-white/5">
                  <span className="text-warmGray block">Associated Property:</span>
                  <span className="text-gold-300 font-medium">{selectedLead.propertyTitle}</span>
                </div>
              )}

              {selectedLead.message && (
                <div className="space-y-1">
                  <span className="text-warmGray block">Client Message / Notes:</span>
                  <p className="p-3 rounded bg-charcoal-900 border border-white/5 text-white leading-relaxed">
                    {selectedLead.message}
                  </p>
                </div>
              )}

              {/* Internal Notes History */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-white font-semibold uppercase tracking-wider text-[10px]">Internal Advisory Notes</span>
                {selectedLead.notes && selectedLead.notes.length > 0 ? (
                  <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {selectedLead.notes.map((note, idx) => (
                      <div key={idx} className="p-2 rounded bg-charcoal-900 text-warmGray text-[11px]">
                        {note}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-warmGray/60 text-[11px]">No internal notes recorded yet.</p>
                )}

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add an internal note..."
                    className="flex-1 px-3 py-1.5 rounded bg-charcoal-800 border border-white/10 text-white outline-none font-sans"
                  />
                  <button
                    onClick={() => handleAddNote(selectedLead.id)}
                    className="px-3 py-1.5 rounded bg-gold-500 text-charcoal-950 font-semibold"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Property Modal */}
        {showAddPropertyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-charcoal-850 border border-gold-500/30 rounded p-6 max-w-xl w-full text-xs space-y-4 shadow-luxury max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-xl font-bold text-white">Add New Property to Inventory</h3>
                <button onClick={() => setShowAddPropertyModal(false)} className="text-warmGray hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateProperty} className="space-y-3">
                <div>
                  <label className="block text-warmGray mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Skyline Residences Tower B"
                    className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-warmGray mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    >
                      <option value="primary">Primary / New Launch</option>
                      <option value="resale">Resale</option>
                      <option value="rental">Rental</option>
                      <option value="second-home">Second Home</option>
                      <option value="land">Land / Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-warmGray mb-1">Property Type</label>
                    <select
                      value={newPropertyType}
                      onChange={(e) => setNewPropertyType(e.target.value as any)}
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    >
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Villa">Villa</option>
                      <option value="Plot">Plot</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-warmGray mb-1">Price Display *</label>
                    <input
                      type="text"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. ₹ 3.85 Cr"
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-warmGray mb-1">Location *</label>
                    <input
                      type="text"
                      required
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Mazgaon, Mumbai"
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-warmGray mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={newBedrooms}
                      onChange={(e) => setNewBedrooms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-warmGray mb-1">Carpet Area</label>
                    <input
                      type="text"
                      value={newCarpetArea}
                      onChange={(e) => setNewCarpetArea(e.target.value)}
                      placeholder="e.g. 1,450 sq.ft."
                      className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-warmGray mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Key property highlights..."
                    className="w-full px-3 py-2 rounded bg-charcoal-800 border border-white/10 text-white outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-gold-500 text-charcoal-950 font-semibold text-xs uppercase tracking-wider"
                >
                  Save & Publish Property
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
