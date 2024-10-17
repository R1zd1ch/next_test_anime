import { create } from 'zustand';

interface SearchState {
  searchTerm: string;
  results: any[];
  loading: boolean;
  setSearchTerm: (term: string) => void;
  setResults: (results: any[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchTerm: '',
  results: [],
  loading: false,
  setSearchTerm: (term: string) => set({ searchTerm: term }),
  setResults: (results: any[]) => set({ results }),
  setLoading: (loading: boolean) => set({ loading }),
}));
