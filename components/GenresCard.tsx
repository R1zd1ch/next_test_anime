import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface GenreCardProps {
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

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const GenreCard: React.FC<GenreCardProps> = ({ id, name, image, total_releases }) => {
  return (
    <Link href={`/anime/genres/releasesGenre/${id}`}>
      <div
        className="genre-card max-w-xs bg-white shadow-md rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-white/30 relative"
        key={id}
      >
        <div className="relative min-h-80">
          <Image
            src={`${IMAGE_URL}${image.optimized.preview}`}
            alt={`${name} preview`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${IMAGE_URL}${image.thumbnail}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-neutral-300">
            <h3 className="text-xl font-bold text-shadow-md">{name}</h3>
            <p className="text-sm text-shadow-md text-neutral-400 font-semibold">
              {total_releases} релиз
            </p>
          </div>
        </div>
        <div className="absolute inset-0 border border-transparent rounded-2xl transition-colors duration-300 hover:border-white/40"></div>
      </div>
    </Link>
  );
};

export default GenreCard;
