import { useEffect } from 'react';
import useAnimeStore from '@/store/useAnimeStore';
import AnimeCard from './CatalogCard';

const AnimeList: React.FC = () => {
  const { fetchReleases, releases } = useAnimeStore();

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  console.log(releases);

  if (!Array.isArray(releases)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-left">
      {releases.map((release) => (
        <AnimeCard
          key={release.id}
          name={release.name}
          description={release.description}
          poster={release.poster.optimized}
          year={release.year}
          type={release.type.description}
          ageRating={release.age_rating.description}
          genres={release.genres}
          episodesTotal={release.episodes_total}
          isAdult={release.is_adult}
          season={release.season.description}
        />
      ))}
    </div>
  );
};

export default AnimeList;
