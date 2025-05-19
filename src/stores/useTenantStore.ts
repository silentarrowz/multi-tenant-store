import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Tenant } from '../types/mockData';

interface TenantState {
  tenants: Tenant[];
  selectedTenant: Tenant | null;
  isLoading: boolean;
  error: string | null;
  fetchTenants: () => void;
  selectTenant: (tenant: Tenant) => void;
}

export const useTenantStore = create<TenantState>()(
  persist(
    (set) => ({
      tenants: [],
      selectedTenant: null,
      isLoading: false,
      error: null,
      fetchTenants: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/tenants.json');
          if (!response.ok) {
            const text = await response.text();
            throw new Error(`Failed to fetch tenants: ${response.status} ${response.statusText}\nResponse: ${text.slice(0, 100)}`);
          }
          const data = await response.json();
          set({ tenants: data.tenants || [], isLoading: false });
        } catch (err: any) {
          console.error('Fetch error:', err);
          set({ error: err.message || 'Error fetching tenants', isLoading: false });
        }
      },
      selectTenant: (tenant) => {
        set({ selectedTenant: tenant });
      },
    }),
    {
      name: 'tenant-storage', // Key for localStorage
    }
  )
);