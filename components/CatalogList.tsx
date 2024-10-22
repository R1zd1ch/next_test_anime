import { useEffect, useState } from 'react';
import useAnimeStore from '@/store/useAnimeStore';
import AnimeCard from './CatalogCard';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => (
  <div className="flex flex-col sm:flex-row bg-neutral-900 border-2 border-neutral-600 text-white shadow-inner rounded-xl overflow-hidden w-full p-4 sm:p-8">
    {/* Левая часть с изображением (Skeleton) */}
    <div className="relative w-full sm:w-48 h-64 sm:h-64 flex-shrink-0 mx-auto sm:mx-0">
      <Skeleton className="rounded-lg object-cover w-full h-full" />
    </div>

    {/* Правая часть с текстовой информацией (Skeleton) */}
    <div className="flex flex-col p-4 justify-center w-full">
      <Skeleton width={120} height={24} className="mb-3" />
      <Skeleton width={100} height={16} className="mb-2" />
      <Skeleton width={160} height={16} className="mb-2" />
      <Skeleton width={140} height={16} className="mb-2" />
      <Skeleton width="100%" height={60} className="mt-3" />
    </div>
  </div>
);

const AnimeList: React.FC = () => {
  const { fetchReleases, releases } = useAnimeStore();
  const [displayedReleases, setDisplayedReleases] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    fetchReleases();
  }, [fetchReleases]);

  useEffect(() => {
    const delayLoad = setTimeout(() => {
      setDisplayedReleases(releases.slice(0, 5));
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(delayLoad);
  }, [releases]);

  useEffect(() => {
    if (inView && !isLoadingMore && displayedReleases.length < releases.length) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setDisplayedReleases((prev: any) => [
          ...prev,
          ...releases.slice(prev.length, prev.length + 5),
        ]);
        setIsLoadingMore(false);
      }, 500);
    }
  }, [inView, releases, displayedReleases.length, isLoadingMore]);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-wrap gap-4 justify-center">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 justify-left">
      {displayedReleases.map((release: any) => (
        <AnimeCard
          key={release.id}
          id={release.id}
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

      {isLoadingMore && displayedReleases.length < releases.length && (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={`loading-more-${index}`} />
          ))}
        </>
      )}

      <div ref={ref} className="w-full text-center mt-4"></div>
    </div>
  );
};

export default AnimeList;
