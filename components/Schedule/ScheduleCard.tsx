import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Release } from './ScheduleMain';
import { FaPlay } from 'react-icons/fa';

interface ReleaseCardProps {
  release: Release;
}

const DEFAULT_IMAGE = 'https://picsum.photos/400/600';
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const getEpisodesText = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'эпизод';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return 'эпизода';
  } else {
    return 'эпизодов';
  }
};

const ScheduleCard: React.FC<ReleaseCardProps> = ({ release }) => {
  const imageUrl =
    release.poster && release.poster.optimized && release.poster.optimized.src
      ? `${IMAGE_URL}${release.poster.optimized.src}`
      : DEFAULT_IMAGE;

  return (
    <div className="w-full">
      <div className="relative group w-full aspect-[2/3]">
        {/* Ссылка на динамическую страницу тайтла */}
        <Link href={`/anime/title/${release.id}`}>
          <Image
            src={imageUrl}
            layout="fill"
            objectFit="cover"
            alt={release.name.main}
            className="transition duration-500 ease-in-out transform group-hover:grayscale group-hover:scale-105 rounded-lg"
            placeholder="blur"
            blurDataURL={`${IMAGE_URL}${release.poster.optimized.thumbnail}`}
          />
        </Link>

        {/* Контент, отображаемый при наведении */}
        <Link href={`/anime/title/${release.id}`}>
          <div className="absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
            <h3 className="text-white text-center text-sm font-semibold mb-2">
              {release.name.main}
            </h3>
            <p className="text-white text-center text-xs mb-2">
              {release.season.description} • {release.year} • {release.age_rating.label}
            </p>
            <div className="flex items-center gap-2 p-2 bg-black bg-opacity-50 border border-slate-500 rounded-lg shadow-md transition-colors duration-300 hover:bg-slate-900">
              <button className="text-white text-sm">Смотреть</button>
              <FaPlay className="text-white" />
            </div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap">
              {release.episodes_total
                ? `${release.episodes_total} ${getEpisodesText(release.episodes_total)}`
                : null}
            </div>
          </div>
        </Link>

        {/* Эпизод */}
      </div>
    </div>
  );
};

export default ScheduleCard;
