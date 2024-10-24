import { FranchiseElement } from '@/app/anime/franchises/[id]/page';
import FranchisesPageList from '@/components/Franchises/FranchisesPageList';
import Image from 'next/image';
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

interface FranchiseElementProps {
  franchise: FranchiseElement;
}

const FranchisePage: React.FC<FranchiseElementProps> = ({ franchise }) => {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="flex items-center gap-3 sm:gap-6 p-3 sm:p-5 rounded-2xl  text-neutral-200 bg-neutral-800 shadow-2xl shadow-black">
        <div className="relative h-[120px] w-[120px]">
          <Image
            src={`${IMAGE_URL}${franchise.image.optimized.preview}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={`${franchise.name} preview`}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={`${IMAGE_URL}${franchise.image.thumbnail}`}
            className="w-full h-full rounded-xl"
          />
        </div>
        <div>
          <div className="pb-5">
            <h1 className=" text-lg sm:text-2xl text-neutral-200 font-bold line-clamp-1">
              {franchise.name}
            </h1>
          </div>
          <h1 className="text-xs sm:text-sm text-neutral-200 font-bold line-clamp-1">
            {franchise.name_english}
          </h1>
          <h2 className="text-xs sm:text-base text-neutral-500 font-semibold">
            {franchise.first_year}
            {franchise.first_year !== franchise.last_year
              ? `— ${franchise.last_year}`
              : null} • {franchise.total_releases} сезона • {franchise.total_episodes} эпизода •{' '}
            {franchise.total_duration}
          </h2>
        </div>
      </header>
      <div className="mt-6 mb-8">
        {/* Здесь можете добавить логику отображения карточек */}
        <FranchisesPageList releases={franchise.franchise_releases}></FranchisesPageList>
      </div>
    </div>
  );
};

export default FranchisePage;
