import { getTitleById } from '@/services/getTitleById';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const VideoTitlePage = dynamic(() => import('@/components/VideoTitlePage'), { ssr: false });

export async function generateMetadata({ params }) {
  const { id } = params;
  const anime = await getTitleById(id);

  return {
    title: anime ? anime.name.main : 'Аниме не найдено',
    description: anime ? anime.description : 'Описание отсутствует',
  };
}

const seasons = {
  autumn: 'Осень',
  spring: 'Весна',
  summer: 'Лето',
  winter: 'Зима',
};

const AnimePage = async ({ params }) => {
  const { id } = params;
  const anime = await getTitleById(id);

  if (!anime) {
    return <p>Аниме не найдено</p>;
  }
  console.log(anime.episodes[0]);

  // Extract the year from the created_at string
  const createdYear = new Date(anime.created_at).getFullYear();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-center my-6">{anime.name.main}</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL_NEW}${anime.poster.src}`}
          width={300}
          height={450}
          alt={anime.name.main}
        />
        <div className="md:ml-8">
          <p className="text-lg mb-2">
            Жанры: {anime.genres.map((genre) => genre.name).join(', ')}
          </p>
          <p className="text-lg mb-2">
            Год выпуска: {createdYear} ({seasons[anime.season.value]})
          </p>
          <p className="text-lg mb-2">Всего эпизодов: {anime.episodes_total || 'Неизвестно'}</p>
          <p className="text-lg mt-4">{anime.description}</p>
        </div>
      </div>
      <div className="border-1 min-h-96 max-w-5xl mx-auto">
        <VideoTitlePage episodes={anime.episodes}></VideoTitlePage>
      </div>
    </div>
  );
};

export default AnimePage;
