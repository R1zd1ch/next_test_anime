'use client';
import React from 'react';
import { ReleaseElement } from '@/app/anime/franchises/[id]/page';
import FranchisesPageCard from '@/components/Franchises/FranchisesPageCard';
import Skeleton from 'react-loading-skeleton';
import { useState, useEffect } from 'react';

interface FranchiseElementReleasesProps {
  releases: ReleaseElement[];
}

const FranchiseCardSkeleton: React.FC = () => {
  return (
    <div className="relative p-3 flex bg-neutral-800 rounded-lg overflow-hidden shadow-md gap-4">
      <div className="relative" style={{ width: '100px', height: '100px' }}>
        <Skeleton width={100} height={100} />
      </div>
      <div className="flex flex-col justify-center flex-1">
        <Skeleton height={20} width={`70%`} className="mb-1" />
        <Skeleton height={15} width={`60%`} />
        <Skeleton height={15} width={`50%`} className="mt-1" />
      </div>
    </div>
  );
};

const FranchisesPageList: React.FC<FranchiseElementReleasesProps> = ({ releases }) => {
  const [loading, setLoading] = useState(true);

  // Эмуляция задержки загрузки данных
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 2 секунды загрузки
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      {loading
        ? Array(releases.length)
            .fill(0)
            .map((_, index) => <FranchiseCardSkeleton key={index} />) // Показываем 5 скелетонов
        : releases.map((release, index) => (
            <FranchisesPageCard key={release.id} release={release} index={index} />
          ))}
    </div>
  );
};

export default FranchisesPageList;
