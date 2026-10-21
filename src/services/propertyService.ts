import { Property, PropertyCategory, FilterState } from '../types';
import { initialDemoProperties } from '../data/demoProperties';

const LOCAL_STORAGE_PROPERTIES_KEY = 'kloud_realty_properties_v1';

export const propertyService = {
  getAllProperties(): Property[] {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
      if (!stored) {
        localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(initialDemoProperties));
        return initialDemoProperties;
      }
      return JSON.parse(stored);
    } catch {
      return initialDemoProperties;
    }
  },

  getPublishedProperties(): Property[] {
    return this.getAllProperties().filter(p => p.published);
  },

  getPropertyById(id: string): Property | undefined {
    return this.getAllProperties().find(p => p.id === id || p.slug === id);
  },

  getFeaturedProperties(): Property[] {
    return this.getPublishedProperties().filter(p => p.isFeatured);
  },

  getPropertiesByCategory(category: PropertyCategory | 'all'): Property[] {
    const list = this.getPublishedProperties();
    if (category === 'all') return list;
    return list.filter(p => p.category === category);
  },

  filterProperties(filters: Partial<FilterState>): Property[] {
    let list = this.getPublishedProperties();

    if (filters.intent && filters.intent !== 'all') {
      if (filters.intent === 'buy') {
        list = list.filter(p => p.category === 'primary' || p.category === 'resale');
      } else if (filters.intent === 'rent') {
        list = list.filter(p => p.category === 'rental');
      } else if (filters.intent === 'land') {
        list = list.filter(p => p.category === 'land' || p.category === 'second-home');
      }
    }

    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category === filters.category);
    }

    const pType = filters.propertyType;
    if (pType && pType !== 'all') {
      list = list.filter(p => p.propertyType.toLowerCase() === pType.toLowerCase());
    }

    const loc = filters.locality;
    if (loc && loc !== 'all') {
      const lowerLoc = loc.toLowerCase();
      list = list.filter(p => 
        p.locality.toLowerCase().includes(lowerLoc) ||
        p.location.toLowerCase().includes(lowerLoc) ||
        p.city.toLowerCase().includes(lowerLoc)
      );
    }

    if (filters.minBudget) {
      list = list.filter(p => p.price >= (filters.minBudget || 0));
    }

    if (filters.maxBudget) {
      list = list.filter(p => p.price <= (filters.maxBudget || Infinity));
    }

    if (filters.bedrooms && filters.bedrooms !== 'all') {
      const b = parseInt(filters.bedrooms);
      if (!isNaN(b)) {
        list = list.filter(p => p.bedrooms && p.bedrooms >= b);
      }
    }

    if (filters.searchQuery && filters.searchQuery.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.locality.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.propertyType.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters.sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else {
      list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  },

  saveProperty(prop: Property): void {
    const all = this.getAllProperties();
    const existingIndex = all.findIndex(p => p.id === prop.id);
    let updated: Property[];
    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = prop;
    } else {
      updated = [prop, ...all];
    }
    localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(updated));
  },

  togglePublish(id: string): boolean {
    const all = this.getAllProperties();
    const target = all.find(p => p.id === id);
    if (!target) return false;
    target.published = !target.published;
    localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(all));
    return true;
  },

  toggleFeatured(id: string): boolean {
    const all = this.getAllProperties();
    const target = all.find(p => p.id === id);
    if (!target) return false;
    target.isFeatured = !target.isFeatured;
    localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(all));
    return true;
  },

  resetDemoData(): void {
    localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(initialDemoProperties));
  }
};
