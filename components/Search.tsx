'use client';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import { useSearchStore } from '@/store/useSearchStore';
import useAnimeStore from '@/store/useAnimeStore';

const Search = ({ onFocus }: { onFocus: () => void }) => {
  const { searchTerm, setSearchTerm } = useSearchStore();
  const { setSearch, fetchReleases } = useAnimeStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleButtonClick = () => {
    if (searchTerm) {
      setSearch(searchTerm);
      fetchReleases();

      if (pathname !== '/anime/catalog') {
        router.push('/anime/catalog');
      }
    }
  };

  return (
    <div className="relative flex w-full lg:w-96">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full px-4 py-2 text-base lg:text-base rounded-lg border border-neutral-50 bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={onFocus}
      />
      <button onClick={handleButtonClick} className="text-neutral-50 ml-2">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
