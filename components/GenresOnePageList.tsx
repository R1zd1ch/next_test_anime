'use client';
import React, { useEffect, useState } from 'react';
import GenreCard from './GenresOnePageCard'; // Импортируем компонент карточки
import { getGenresReleases } from '@/services/getGenres';

const GenreList = ({ genreInfo }: { genreInfo: any }) => {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = genreInfo;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenresReleases(id);
        console.log(data.data);
        setGenres(data.data);
        setLoading(false);
      } catch (err: any) {
        setError(`Ошибка при загрузке жанров, ${err}`);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
      {genres.map((genre) => (
        <GenreCard
          key={genre.id}
          id={genre.id}
          name={genre.name}
          poster={genre.poster}
          episodes_total={genre.total_releases}
        />
      ))}
    </div>
  );
};

export default GenreList;
