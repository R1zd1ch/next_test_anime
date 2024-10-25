'use client';
import React from 'react';
import useAnimeStore from '@/store/useAnimeStore';

const CatalogInputSearch = () => {
  const { searchParams, setSearch, fetchReleases } = useAnimeStore();

  const handleOnChange = (e: any) => {
    setSearch(e.target.value);
    fetchReleases();
  };
  return (
    <div className="relative flex w-full h-14">
      <input
        type="text"
        placeholder="Поиск..."
        className="w-full px-4 py-2 text-base lg:text-base rounded-xl border border-neutral-400 bg-transparent focus:outline-none"
        value={searchParams.search}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default CatalogInputSearch;
