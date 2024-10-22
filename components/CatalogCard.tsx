import Image from "next/legacy/image";

interface AnimeCardProps {
  name: {
    main: string;
    english: string | null;
    alternative: string | null;
  };
  description: string;
  poster: {
    src: string;
    thumbnail: string;
  };
  year: number;
  type: string;
  ageRating: string;
  genres: { id: number; name: string }[];
  episodesTotal: number;
  isAdult: boolean;
  season: string;
}

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const AnimeCard: React.FC<AnimeCardProps> = ({
  name,
  description,
  poster,
  year,
  type,
  ageRating,
  genres,
  season,
}) => {
  const text = ageRating;
  const fixedAgeRating = text.match(/\d+\+/);
  return (
    <div className="flex flex-col sm:flex-row bg-neutral-900 border-2 border-neutral-600 text-white shadow-inner rounded-xl overflow-hidden w-full p-4 sm:p-8">
      {/* Левая часть с изображением */}
      <div className="relative w-full sm:w-48 h-64 sm:h-64 flex-shrink-0 mx-auto sm:mx-0">
        <Image
          src={`${IMAGE_URL}${poster.src}`}
          alt={name.main}
          width={180}
          height={260}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      {/* Правая часть с информацией */}
      <div className="flex flex-col p-4 justify-center w-full">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">{name.main}</h3>
          <p className="text-xs sm:text-sm text-gray-400">{name.english || 'N/A'}</p>
          <p className="text-xs sm:text-sm text-gray-400">
            {year} • {season} • {type} • {fixedAgeRating}
          </p>
          <p className="text-xs sm:text-sm text-gray-400">
            {genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
        <p className=" sm:mt-4 text-xs sm:text-sm text-gray-500 line-clamp-3 mt-3">{description}</p>
      </div>
    </div>
  );
};

export default AnimeCard;
