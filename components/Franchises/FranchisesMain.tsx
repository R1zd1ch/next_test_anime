'use client';
import FranchisesList from './FranchisesList';

export interface Franchise {
  id: string;
  name: string;
  name_english: string;
  rating: number;
  last_year: number;
  first_year: number;
  total_releases: number;
  total_episodes: number;
  total_duration: string;
  total_duration_in_seconds: number;
  image: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
}

const Franchises = () => {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left py-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Франшизы</h1>
        <h2 className="text-neutral-500 font-semibold">Список всех франшиз в лучшей озвучке</h2>
      </header>
      <FranchisesList></FranchisesList>
    </div>
  );
};

export default Franchises;
