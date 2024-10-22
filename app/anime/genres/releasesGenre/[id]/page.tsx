import GenrePage from '@/components/GenresOnePage';
import { getGenresById } from '@/services/getGenres';

export interface GenreProps {
  id: number;
  name: string;
  image: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
  total_releases: number;
}

const Home = async ({ params }: { params: { id: number } }) => {
  const { id } = params;
  const genreInfo: GenreProps = await getGenresById(id);
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left pt-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Релизы жанра</h1>
        <h2 className="text-neutral-500 font-semibold">Список релизов жанра</h2>
      </header>
      <GenrePage genreInfo={genreInfo}></GenrePage>
    </div>
  );
};

export default Home;
