import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

type FilterValue = string | number | boolean | null;

interface AppState {
  currentUser: User | null;
  isLoading: boolean;
  filters: Record<string, FilterValue>;
  setCurrentUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  setFilters: (filters: Record<string, FilterValue>) => void;
  resetFilters: () => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        isLoading: false,
        filters: {},
        setCurrentUser: (user) => set({ currentUser: user }),
        setIsLoading: (loading) => set({ isLoading: loading }),
        setFilters: (filters) => set({ filters }),
        resetFilters: () => set({ filters: {} }),
      }),
      {
        name: 'app-storage',
        skipHydration: true,
      }
    )
  )
);