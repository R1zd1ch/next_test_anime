import { getTitleById } from '@/services/getTitleById';
import AnimeInfoCard from '@/components/TitlePage/AnimeIdPage';
import VideoWrapper from '@/components/TitlePage/AnimeIdPageWrapper';

export async function generateMetadata({ params }: { params: any }) {
  const { id } = params;
  const anime = await getTitleById(id);

  return {
    title: anime ? anime.name.main : 'Аниме не найдено',
    description: anime ? anime.description : 'Описание отсутствует',
  };
}

const seasons: any = {
  autumn: 'Осень',
  spring: 'Весна',
  summer: 'Лето',
  winter: 'Зима',
};

const AnimePage = async ({ params }: { params: any }) => {
  const { id } = params;
  const anime = await getTitleById(id);

  if (!anime) {
    return <p>Аниме не найдено</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl text-center my-6">{anime.name.main}</h1>

      <AnimeInfoCard anime={anime} seasons={seasons} />

      <VideoWrapper anime={anime}></VideoWrapper>
    </div>
  );
};
export const runtime = 'edge';
export default AnimePage;
