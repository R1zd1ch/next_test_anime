import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Franchise } from './FranchisesMain';

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;
const DEFAULT_IMAGE = 'https://picsum.photos/400/600'; // Используем Lorem Picsum как пример

const getEpisodesText = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'эпизод';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return 'эпизода';
  } else {
    return 'эпизодов';
  }
};

const FranchiseCard: React.FC<Franchise> = ({
  id,
  name,
  name_english,
  last_year,
  first_year,
  total_releases,
  total_duration,
  total_episodes,
  image,
}) => {
  const imageUrl =
    image && image.optimized && image.optimized.preview
      ? `${IMAGE_URL}${image.optimized.preview}`
      : DEFAULT_IMAGE;

  const blurUrl = image && image.thumbnail ? `${IMAGE_URL}${image.thumbnail}` : DEFAULT_IMAGE;

  return (
    <Link href={`/anime/franchises/${id}`}>
      <div
        className="flex bg-neutral-800 shadow-md rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-white/30 relative w-full max-w-4xl h-[200px]"
        key={id}
      >
        {/* Левая часть - Изображение */}
        <div className="relative w-1/2 min-h-full">
          <Image
            src={imageUrl}
            alt={`${name} preview`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={blurUrl}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Правая часть - Информация */}
        <div className="p-4 w-3/5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-neutral-300 text-lg line-clamp-3">{name}</h3>
            <p className="text-[10px] font-semibold text-neutral-500">{name_english}</p>
          </div>
          <div className="mt-4">
            <p className="text-xs text-neutral-500">
              {first_year} — {last_year}
            </p>
            <p className="text-xs text-neutral-500">
              {total_releases} сезона • {total_episodes} {getEpisodesText(total_episodes)}
            </p>
            <p className="text-[10px] font-semibold text-neutral-600">{total_duration}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FranchiseCard;
