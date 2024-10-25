import React from 'react';
import { ReleaseElement } from '@/app/anime/franchises/[id]/page';
import Image from 'next/legacy/image';
import Link from 'next/link';

interface FranchiseElementReleaseProps {
  release: ReleaseElement;
  index: number;
}

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const FranchisesPageCard: React.FC<FranchiseElementReleaseProps> = ({ release, index }) => {
  return (
    <Link href={`/anime/title/${release.release_id}`}>
      <div className="relative p-3 flex bg-neutral-800 rounded-lg overflow-hidden shadow-md gap-4">
        <div className="relative" style={{ width: '100px', height: '100px' }}>
          <Image
            src={`${IMAGE_URL}${release.release.poster.optimized.src}`}
            alt={`${release.release.name} preview`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${IMAGE_URL}${release.release.poster.thumbnail}`}
            className="object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-sm font-bold text-neutral-200 mb-1">{release.release.name.main}</h3>
          <h3 className="text-xs font-semibold text-neutral-500">{release.release.name.english}</h3>
          <p className="text-xs font-semibold text-neutral-500">
            {release.release.year} • {release.release.season.description} •{' '}
            {release.release.type.description} • {release.release.episodes_total} эпизодов
          </p>
        </div>
        <div className="hidden sm:block absolute right-10 bottom-3 text-neutral-600 text-3xl font-bold -translate-y-[100%]">
          #{index + 1}
        </div>
      </div>
    </Link>
  );
};

export default FranchisesPageCard;
