'use client';
import { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import Skeleton from 'react-loading-skeleton';

interface AnimeInfoCardProps {
  anime: {
    name: {
      main: string;
    };
    poster: {
      optimized: {
        src: string;
      };
    };
    genres: { id: number; name: string }[];
    season: {
      value: string;
    };
    created_at: string;
    episodes_total: number | null;
    description: string;
  };
  seasons: any;
}

const SkeletonCard = () => (
  <div className="flex flex-col md:flex-row bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-6 w-full my-6">
    {/* Левая часть: изображение (Skeleton) */}
    <div className="flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
      <Skeleton width={300} height={450} className="rounded-lg" />
    </div>

    {/* Правая часть: текстовая информация (Skeleton) */}
    <div className="flex flex-col justify-between ml-0 md:ml-8 text-center md:text-left w-full">
      <div>
        <Skeleton width={240} height={36} className="mb-4" /> {/* Заголовок */}
        <Skeleton width={200} height={24} className="mb-2" /> {/* Жанры */}
        <Skeleton width={180} height={24} className="mb-2" /> {/* Год выпуска */}
        <Skeleton width={150} height={24} className="mb-4" /> {/* Всего эпизодов */}
        <Skeleton width="100%" height={80} className="mb-2" /> {/* Описание */}
        <Skeleton width={100} height={40} className="mt-2" /> {/* Кнопка "Ещё" */}
      </div>
    </div>
  </div>
);

const AnimeInfoCard: React.FC<AnimeInfoCardProps> = ({ anime, seasons }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Состояние для отображения полного описания
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const createdYear = new Date(anime.created_at).getFullYear();
  const toggleDescription = () => setIsExpanded(!isExpanded); // Переключение состояния

  const truncatedDescription = anime.description.slice(0, 150) + '...'; // Ограниченное описание

  useEffect(() => {
    // Искусственная задержка на 1 секунду
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Очистка таймера при демонтировании
  }, []);

  if (isLoading) {
    return <SkeletonCard />; // Показ скелетона во время загрузки
  }

  return (
    <div className="flex flex-col md:flex-row bg-neutral-900 border border-neutral-700 rounded-xl shadow-lg p-6 w-full  my-6">
      {/* Левая часть: изображение */}
      <div className="flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL_NEW}${anime.poster.optimized.src}`}
          width={300}
          height={450}
          alt={anime.name.main}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Правая часть: информация */}
      <div className="flex flex-col justify-between ml-0 md:ml-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">{anime.name.main}</h2>
          <p className="text-neutral-400 text-lg mb-2">
            <span className="font-semibold text-neutral-100">Жанры:</span>{' '}
            {anime.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p className="text-neutral-400 text-lg mb-2">
            <span className="font-semibold text-neutral-100">Год выпуска:</span> {createdYear} (
            {seasons[anime.season.value]})
          </p>
          <p className="text-neutral-400 text-lg mb-4">
            <span className="font-semibold text-neutral-100">Всего эпизодов:</span>{' '}
            {anime.episodes_total || 'Неизвестно'}
          </p>

          {/* Описание с кнопкой показать ещё/скрыть */}
          <div className="text-neutral-300 text-md leading-relaxed">
            <p>{isExpanded ? anime.description : truncatedDescription}</p>
            {/* Кнопка для отображения полного текста/скрытия */}
            <button
              className="text-neutral-200 border border-neutral-500 rounded-xl font-bold mt-2 bg-neutral-700 p-2 px-5 shadow-md shadow-black/70 hover:bg-neutral-600 transition duration-200 ease-linear"
              onClick={toggleDescription}
            >
              {isExpanded ? 'Скрыть' : 'Ещё'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfoCard;
