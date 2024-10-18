'use client';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSearchStore } from '@/store/useSearchStore';

const Search = ({ onFocus }: { onFocus: () => void }) => {
  const { searchTerm, setSearchTerm } = useSearchStore();

  return (
    <div className="relative flex w-full lg:w-96">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full px-4 py-2 text-base lg:text-base rounded-lg border border-neutral-50 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Обновляем Zustand состояние
        onFocus={onFocus} // Вызов, когда поле получает фокус
      />
      <button className="text-neutral-50 ml-2">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
