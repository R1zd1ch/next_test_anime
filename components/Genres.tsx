'use client';
import GenreList from './GenresList';
export default function Genres() {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left py-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Жанры</h1>
        <h2 className="text-neutral-500 font-semibold">Список жанров на любой вкус</h2>
      </header>
      <GenreList></GenreList>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-6"></div>
    </div>
  );
}
