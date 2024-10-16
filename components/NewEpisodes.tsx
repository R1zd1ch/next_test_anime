'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import { getUpdatesReleases } from '@/services/newEpisodes';

type Episode = {
  id: string;
  name: {
    main: string;
  };
  poster: {
    optimized: {
      src: string;
    };
  };
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;
import { useEffect, useState } from 'react';

const NewEpisodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      const data = await getUpdatesReleases(6);
      setEpisodes(data);
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="container w-full mx-auto p-4">
      <div>
        <h1 className="text-3xl text-left mb-6">Недавно обновлённые</h1>
        <div className="border-2 rounded-lg flex flex-wrap justify-center gap-4 p-4">
          {episodes.map((episode) => (
            <div className="w-40 p-2" key={episode.id}>
              <div className="relative group">
                {/* Ссылка на динамическую страницу тайтла */}
                <Link href={`/anime/title/${episode.id}`}>
                  <Image
                    src={`${IMAGE_URL}${episode.poster.optimized.src}`}
                    width={150}
                    height={200}
                    alt={episode.name.main}
                    className="transition duration-300 ease-in-out transform group-hover:grayscale group-hover:scale-105 rounded-lg"
                  />
                </Link>

                {/* Появляющийся текст при наведении */}
                <Link href={`/anime/title/${episode.id}`}>
                  <div className="px-2 absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
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
