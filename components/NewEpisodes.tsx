import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa';
import { getUpdatesReleases } from '@/services/newEpisodes';
// const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

export const NewEpisodes = async () => {
  const episodes = await getUpdatesReleases(6);

  return (
    <div className="container w-auto mx-auto p-auto">
      <div>
        <h1 className="text-3xl text-left mb-6">Недавно обновлённые</h1>
        <div className="border-2 rounded flex items-center flex-wrap justify-center p-auto">
          {episodes.map((episode: any) => (
            <div className="p-2 m-1/3" key={episode.id}>
              <div className="relative group">
                {/* Ссылка на динамическую страницу тайтла */}
                <Link href={`/anime/title/${episode.id}`}>
                  <Image
                    src={`${IMAGE_URL}${episode.poster.src}`}
                    width={150}
                    height={200}
                    alt={episode.name.main}
                    className="transition duration-300 ease-in-out transform group-hover:grayscale group-hover:scale-105"
                  />
                </Link>

                {/* Появляющийся текст при наведении */}
                <Link href={`/anime/title/${episode.id}`}>
                  <div className="px-2 absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white text-center text-base font-semibold">
                      {episode.name.main}
                    </h3>
                    <div className="absolute bottom-2 p-2 flex items-center gap-2 border border-slate-500 rounded-lg shadow bg-black bg-opacity-25 transition-colors duration-300 hover:bg-slate-900">
                      <button>Смотреть</button>
                      <FaPlay />
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
