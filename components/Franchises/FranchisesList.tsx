import React, { useEffect, useState } from 'react';
import { getFranchises } from '@/services/getFranchises';
import FranchiseCard from './FranchisesCard';
import { useInView } from 'react-intersection-observer';
import Skeleton from 'react-loading-skeleton';

const CHUNK_SIZE = 20; // Количество франшиз для подгрузки за раз

// Компонент для отображения скелетона карточек франшиз
const SkeletonCard: React.FC = () => {
  return (
    <div className="flex bg-neutral-800 shadow-md rounded-2xl overflow-hidden transition-shadow duration-300 relative w-full max-w-4xl h-[200px]">
      {/* Левая часть - Скелетон изображения */}
      <div className="relative w-1/2 min-h-full">
        <Skeleton className="w-full h-full object-cover" />
      </div>

      {/* Правая часть - Скелетон для информации */}
      <div className="p-4 w-3/5 flex flex-col justify-between">
        <div>
          <Skeleton width="80%" height={24} className="mb-2" />
          <Skeleton width="60%" height={16} className="mb-2" />
        </div>
        <div className="mt-4">
          <Skeleton width="50%" height={16} className="mb-1" />
          <Skeleton width="70%" height={16} className="mb-1" />
          <Skeleton width="40%" height={12} />
        </div>
      </div>
    </div>
  );
};

const FranchisesList: React.FC = () => {
  const [franchises, setFranchises] = useState<any[]>([]);
  const [allFranchises, setAllFranchises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const data = await getFranchises();
        setAllFranchises(data);
        setFranchises(data.slice(0, CHUNK_SIZE));
        setIsLoading(false);
      } catch (err: any) {
        console.error(`Ошибка при загрузке франшиз, ${err}`);
        setIsLoading(false);
      }
    };

    fetchFranchises();
  }, []);

  useEffect(() => {
    if (inView && !isLoadingMore && franchises.length < allFranchises.length) {
      setIsLoadingMore(true);

      setTimeout(() => {
        setFranchises((prev) => [
          ...prev,
          ...allFranchises.slice(prev.length, prev.length + CHUNK_SIZE),
        ]);
        setIsLoadingMore(false);
      }, 500);
    }
  }, [inView, allFranchises, franchises.length, isLoadingMore]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {franchises.map((franchise) => (
        <FranchiseCard key={franchise.id} {...franchise} />
      ))}

      {isLoadingMore && franchises.length < allFranchises.length && (
        <>
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCard key={`loading-more-${index}`} />
          ))}
        </>
      )}

      <div ref={ref} className="w-full text-center mt-4"></div>
    </div>
  );
};

export default FranchisesList;
