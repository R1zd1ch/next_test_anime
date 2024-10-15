import { getTitleById } from '@/services/getTitleById';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const { id } = params;
  const anime = await getTitleById(id);

  return {
    title: anime ? anime.names.ru : 'Аниме не найдено',
    description: anime ? anime.description : 'Описание отсутствует',
  };
}

const AnimePage = async ({ params }) => {
  console.log(params);
  const { id } = params;
  const anime = await getTitleById(id);

  if (!anime) {
    return <p>Аниме не найдено</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-center my-6">{anime.names.ru}</h1>
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${anime.posters.small.url}`}
          width={300}
          height={450}
          alt={`${anime.names.ru}`}
        />
        <div className="md:ml-8">
          <p className="text-lg mb-2">Жанры: {anime.genres.join(', ')}</p>
          <p className="text-lg mb-2">
            Год выпуска: {anime.season.string} {anime.season.year}
          </p>
          <p className="text-lg mb-2">Последний эпизод: {anime.player.episodes.last}</p>
          <p className="text-lg mt-4">{anime.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
