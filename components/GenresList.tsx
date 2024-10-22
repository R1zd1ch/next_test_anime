import React, { useEffect, useState } from 'react';
import GenreCard from './GenresCard'; // Импортируем компонент карточки
import { getGenres } from '@/services/getGenres';

const GenreList: React.FC = () => {
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 ">
      {genres.map((genre) => (
        <GenreCard
          key={genre.id}
          id={genre.id}
          name={genre.name}
          image={genre.image}
          total_releases={genre.total_releases}
        />
      ))}
    </div>
  );
};

export default GenreList;
