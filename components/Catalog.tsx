'use client';
import CatalogInputSearch from './CatalogInputSearch';
import {
  AgeRatings,
  Genres,
  DubbingStatuses,
  OngoingStatuses,
  Seasons,
  Sorting,
  AnimeTypes,
  YearSlider,
  SubmitButton,
  ResetButton,
} from './CatalogFilters';
import CatalogList from './CatalogList';

export default function AnimeCatalog() {
  return (
    <div className="mx-4 md:mx-0 lg:mx-0 min-h-screen">
      <header className="text-left py-6 bg-neutral-900 text-neutral-200">
        <h1 className="text-2xl font-bold">Каталог Аниме</h1>
        <h2 className="text-neutral-700">Самые свежие релизы</h2>
      </header>

      {/* Адаптивная сетка: фильтры сверху на мобильных и карточки снизу */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-6">
        {/* Фильтры: на мобильных сверху, а на больших экранах занимают 2 колонки справа */}
        <div className="lg:col-span-2 order-1 lg:order-2 space-y-4">
          <CatalogInputSearch />
          <div className="p-6 border border-neutral-600 rounded-xl">
            <Genres />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <AnimeTypes />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <OngoingStatuses />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <DubbingStatuses />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <Sorting />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <Seasons />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <YearSlider />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
            <AgeRatings />
            <div className="border-b-2 border-neutral-600 shadow-sm"></div>
          </div>
          <div className="flex justify-center gap-12  border border-neutral-600 rounded-xl">
            <SubmitButton />
            <ResetButton />
          </div>
        </div>

        {/* Каталог аниме: на мобильных снизу, а на больших экранах занимает 3 колонки слева */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <CatalogList />
        </div>
      </div>
    </div>
  );
}
