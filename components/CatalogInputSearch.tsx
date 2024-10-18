'use client';
import React from 'react';
import { useSearchStore } from '@/store/useSearchStore';

const CatalogInputSearch = () => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <div className="relative flex w-full h-14">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full px-4 py-2 text-base lg:text-base rounded-xl border border-neutral-50 bg-transparent focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default CatalogInputSearch;
