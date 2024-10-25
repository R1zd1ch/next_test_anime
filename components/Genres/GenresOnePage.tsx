import { GenreProps } from '@/app/anime/genres/releasesGenre/[id]/page';
import Image from 'next/legacy/image';
import GenreList from './GenresOnePageList';
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;
const GenrePage = async ({ genreInfo }: { genreInfo: GenreProps }) => {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="flex items-center gap-6 p-5 rounded-2xl  text-neutral-200 bg-neutral-800 shadow-2xl shadow-black">
        <div className="relative h-[100px] w-[80px]">
          <Image
            src={`${IMAGE_URL}${genreInfo.image.optimized.preview}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`${genreInfo.name} preview`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${IMAGE_URL}${genreInfo.image.thumbnail}`}
            className="w-full h-full rounded-xl"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{genreInfo.name}</h1>
          <h2 className="text-neutral-500 font-semibold">
            {genreInfo.total_releases} релизов в жанре
          </h2>
        </div>
      </header>
      <div className="mt-6 mb-8">
        {/* Здесь можете добавить логику отображения карточек */}
        <GenreList genreInfo={genreInfo}></GenreList>
      </div>
    </div>
  );
};

export default GenrePage;
