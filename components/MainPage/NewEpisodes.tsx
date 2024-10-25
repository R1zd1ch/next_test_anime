'use client';

import Image from 'next/legacy/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import { getUpdatesReleases } from '@/services/newEpisodes';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Episode = {
  id: string;
  name: {
    main: string;
  };
  poster: {
    optimized: {
      thumbnail: string;
      src: string;
    };
  };
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const SkeletonCard = () => (
  <div className="w-full">
    <div className="relative">
      <Skeleton
        height="100%"
        width="100%"
        style={{
          height: '100%',
          width: '100%',
        }}
        className="aspect-[2/3] rounded-lg bg-neutral-700 mx-auto"
      />
    </div>
  </div>
);

const NewEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoading(true);
      const data = await getUpdatesReleases(6);
      setEpisodes(data);
      setLoading(false);
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="container w-full mx-auto p-4">
      <div>
        <h1 className="text-3xl text-left mb-6">Недавно обновлённые</h1>
        {/* Grid с адаптивными колонками и карточками */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:px-10">
          {/* Отображаем Skeleton, пока идет загрузка */}
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            : episodes.map((episode) => (
                <div className="w-full" key={episode.id}>
                  <div className="relative group w-full aspect-[2/3]">
                    {/* Ссылка на динамическую страницу тайтла */}
                    <Link href={`/anime/title/${episode.id}`}>
                      <Image
                        src={`${IMAGE_URL}${episode.poster.optimized.src}`}
                        layout="fill" // Адаптивное изображение
                        objectFit="cover"
                        alt={episode.name.main}
                        className="transition duration-500 ease-in-out transform group-hover:grayscale group-hover:scale-105 rounded-lg"
                        placeholder="blur"
                        blurDataURL={`${IMAGE_URL}${episode.poster.optimized.thumbnail}`}
                      />
                    </Link>

                    {/* Появляющийся текст при наведении */}
                    <Link href={`/anime/title/${episode.id}`}>
                      <div className="absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg group-hover:rounded-lg">
                        <h3 className="text-white text-center text-sm font-semibold mb-2">
                          {episode.name.main}
                        </h3>
                        <div className="flex items-center gap-2 p-2 bg-black bg-opacity-50 border border-slate-500 rounded-lg shadow-md transition-colors duration-300 hover:bg-slate-900">
                          <button className="text-white text-sm">Смотреть</button>
                          <FaPlay className="text-white" />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default NewEpisodes;
