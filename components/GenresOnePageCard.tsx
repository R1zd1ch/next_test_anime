import Image from 'next/image';
import Link from 'next/link';

export interface ReleaseData {
  id: number;
  type: Type;
  year: number;
  name: Name;
  alias: string;
  season: Season;
  poster: Poster;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating: AgeRating;
  publish_day: PublishDay;
  description: string;
  notification: string | null;
  episodes_total: number;
  external_player: string | null;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  episodes_are_unknown: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  genres: Genre[];
}

export interface Type {
  value: string;
  description: string;
}

export interface Name {
  main: string;
  english: string;
  alternative: string | null;
}

export interface Season {
  value: string;
  description: string;
}

export interface Poster {
  src: string;
  thumbnail: string;
  optimized: OptimizedPoster;
}

export interface OptimizedPoster {
  src: string;
  thumbnail: string;
}

export interface AgeRating {
  value: string;
  label: string;
  is_adult: boolean;
  description: string;
}

export interface PublishDay {
  value: number;
  description: string;
}

export interface Genre {
  id: number;
  name: string;
  image: GenreImage;
  total_releases: number;
}

export interface GenreImage {
  preview: string;
  thumbnail: string;
  optimized: OptimizedGenreImage;
}

export interface OptimizedGenreImage {
  preview: string;
  thumbnail: string;
}

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const GenreCard: React.FC<{
  id: number;
  name: Name;
  poster: Poster;
  episodes_total: number;
}> = ({ id, name, poster, episodes_total }) => {
  return (
    <div>
      <Link href={`/anime/title/${id}`}>
        <div
          className="genre-card max-w-xs bg-white shadow-md rounded-2xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-white/30 relative"
          key={id}
        >
          <div className="relative min-h-80">
            <Image
              src={`${IMAGE_URL}${poster.optimized.src}`}
              alt={`${name} preview`}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={`${IMAGE_URL}${poster.thumbnail}`}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-neutral-300">
              <h3 className="text-xl font-bold text-shadow-md">{name.main}</h3>
              <p className="text-sm text-shadow-md text-neutral-400 font-semibold">
                {episodes_total}
              </p>
            </div>
          </div>
          <div className="absolute inset-0 border border-transparent rounded-2xl transition-colors duration-300 hover:border-white/40"></div>
        </div>
      </Link>
    </div>
  );
};

export default GenreCard;
