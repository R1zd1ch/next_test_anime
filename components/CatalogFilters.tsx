'use client';
import React, { useState, useEffect } from 'react';
import {
  getAgeRatings,
  getGenres,
  getProductionStatuses,
  getPublishStatuses,
  getSeasons,
  getSorting,
  getTypes,
  getYears,
} from '@/services/getCatalog';
import useAnimeStore from '@/store/useAnimeStore';
import Skeleton from 'react-loading-skeleton';
import ReactSlider from 'react-slider';
import { IoMdClose } from 'react-icons/io';

interface AgeRating {
  value: string;
  label: string;
  description: string;
}

export const AgeRatings = () => {
  const [ageRatings, setAgeRatings] = useState<AgeRating[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setTempSearchParams, tempSearchParams, searchParams } = useAnimeStore();

  const fetchAgeRatings = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getAgeRatings();
      setAgeRatings(data);
    } catch (err) {
      setError(`'Ошибка при загрузке возрастных категорий', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (value: string) => {
    setSelectedRatings((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((rating) => rating !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    setTempSearchParams({ ageRatings: selectedRatings });
    console.log('Selected Ratings:', selectedRatings);
  }, [selectedRatings]);

  useEffect(() => {
    if (searchParams.ageRatings.length === 0) {
      setSelectedRatings([]);
    } else {
      setAgeRatings(searchParams.ageRatings);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('Updated searchParams from zustand:', tempSearchParams.ageRatings);
  }, [tempSearchParams]);

  useEffect(() => {
    fetchAgeRatings();
  }, []);

  return (
    <div className="py-5">
      <h3 className="text-lg text-neutral-200 font-semibold">Возрастной рейтинг</h3>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите допустимый возрастной рейтинг релизов, по которым будут отфильтрованы все тайтлы
      </h3>
      <div className="flex flex-wrap gap-2 h-8">
        {loading ? (
          // Отображение скелетонов, адаптированных под будущие данные
          <div className="flex flex-wrap gap-2 h-10">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  width={40} // Ширина скелетона такая же, как и у кнопок
                  height={32} // Высота скелетона соответствует высоте кнопок
                  className="rounded-md"
                />
              ))}
          </div>
        ) : (
          ageRatings.map((rating) => (
            <button
              key={rating.value}
              type="button"
              onClick={() => handleRatingClick(rating.value)}
              className={`text-sm font-medium px-2 py-2 w-11 rounded-md ${
                selectedRatings.includes(rating.value)
                  ? 'bg-neutral-500 text-neutral-300'
                  : 'bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600'
              }`}
            >
              {rating.label}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

interface Genre {
  id: number;
  name: string;
}

export const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string>('');
  const { tempSearchParams, setTempSearchParams, searchParams } = useAnimeStore();

  const fetchGenres = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError(`Ошибка при загрузке жанров, ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleGenreSelection = (genre: Genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.some((g) => g.id === genre.id)
        ? prevSelected.filter((g) => g.id !== genre.id)
        : [...prevSelected, genre],
    );
  };

  useEffect(() => {
    setTempSearchParams({ genres: selectedGenres.map((genre) => genre.id) });
  }, [selectedGenres]);

  useEffect(() => {
    console.log('Updated searchParams from zustand:', tempSearchParams.genres);
  }, [tempSearchParams]);

  useEffect(() => {
    if (searchParams.genres.length === 0) {
      setSelectedGenres([]);
    } else {
      setGenres(searchParams.genres);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchGenres();
  }, []);

  const filteredGenres = genres.filter((genre) =>
    genre.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  return (
    <div className="relative h-40">
      <div>
        <h3 className="text-lg text-neutral-200 font-semibold">Жанры</h3>
        <h3 className="text-xs text-neutral-600 font-semibold mb-4">
          Укажите жанры, по которым будут отфильтрованы все наши релизы. При выборе нескольких —
          будет использована комбинация
        </h3>
      </div>
      {loading ? (
        <Skeleton height={48} className="w-full h-12" style={{ borderRadius: '15px' }}></Skeleton>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="relative flex w-full h-12">
          <input
            type="text"
            placeholder="Укажите жанры"
            className="w-full px-4 py-2 text-base lg:text-base rounded-xl border border-neutral-600 bg-transparent focus:outline-none"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          />
        </div>
      )}

      {isDropdownOpen && (
        <div className="absolute z-10 bg-neutral-900 border border-neutral-700 rounded-md shadow-xl mt-2 w-full h-96 overflow-y-auto ">
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex text-xl flex-col gap-6 py-5 px-10">
              {filteredGenres.length > 0 ? (
                filteredGenres.map((genre) => (
                  <label key={genre.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedGenres.some((g) => g.id === genre.id)}
                      onChange={() => toggleGenreSelection(genre)}
                      className="hidden  border-neutral-700"
                    />
                    <span
                      className={`w-8 h-8 border-2 rounded-xl flex items-center justify-center mr-2 
                      ${selectedGenres.some((g) => g.id === genre.id) ? 'bg-neutral-600 border-neutral-800' : 'border-neutral-600'}
                    `}
                    >
                      {selectedGenres.some((g) => g.id === genre.id) && (
                        <span className="w-4 h-4 bg-white rounded-md"></span>
                      )}
                    </span>
                    {genre.name}
                  </label>
                ))
              ) : (
                <p>Жанры не найдены</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface DubbingStatus {
  value: string;
  description: string;
}

export const DubbingStatuses = () => {
  const [dubbingStatuses, setDubbingStatuses] = useState<DubbingStatus[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { tempSearchParams, setTempSearchParams, searchParams } = useAnimeStore();

  const fetchDubbingStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: DubbingStatus[] = await getProductionStatuses();
      setDubbingStatuses(data);
    } catch (err) {
      setError(`'Ошибка при загрузке статусов озвучки', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusClick = (value: string) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((status) => status !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    setTempSearchParams({ productionStatuses: selectedStatuses });
  }, [selectedStatuses]);

  useEffect(() => {
    if (searchParams.productionStatuses.length === 0) {
      setSelectedStatuses([]);
    } else {
      setDubbingStatuses(searchParams.productionStatuses);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log('Updated searchParams from zustand:', tempSearchParams.productionStatuses);
  }, [tempSearchParams]);

  useEffect(() => {
    fetchDubbingStatuses();
  }, []);

  return (
    <div className="py-5">
      <h3 className="text-lg text-neutral-200 font-semibold">Статус озвучки</h3>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите статус озвучки для фильтрации тайтлов
      </h3>
      <div className="flex gap-2">
        {loading ? (
          <div className="flex  gap-2 ">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} width={146} height={36} />
              ))}
          </div>
        ) : (
          dubbingStatuses.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => handleStatusClick(status.value)}
              className={`px-4 py-2 text-sm font-medium w-auto rounded-md ${
                selectedStatuses.includes(status.value)
                  ? 'bg-neutral-500 text-neutral-300'
                  : 'bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600'
              }`}
            >
              {status.description}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

interface OngoingStatus {
  value: string;
  description: string;
}

export const OngoingStatuses: React.FC = () => {
  const [ongoingStatuses, setOngoingStatuses] = useState<OngoingStatus[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTempSearchParams, searchParams } = useAnimeStore();

  const fetchOngoingStatuses = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: OngoingStatus[] = await getPublishStatuses();
      setOngoingStatuses(data);
    } catch (err) {
      setError(`'Ошибка при загрузке статусов озвучки', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusClick = (value: string) => {
    setSelectedStatuses((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((status) => status !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    setTempSearchParams({ publishStatuses: selectedStatuses });
  }, [selectedStatuses]);

  useEffect(() => {
    if (searchParams.publishStatuses.length === 0) {
      setSelectedStatuses([]);
    } else {
      setOngoingStatuses(searchParams.publishStatuses);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchOngoingStatuses();
  }, []);

  return (
    <div className="py-5">
      <h3 className="text-lg text-neutral-200 font-semibold">Статус выхода</h3>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите статус выхода для фильтрации тайтлов
      </h3>
      <div className="flex gap-2">
        {loading ? (
          <div className="flex gap-2">
            {Array(2)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} width={102} height={37} />
              ))}
          </div>
        ) : (
          ongoingStatuses.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => handleStatusClick(status.value)}
              className={`px-4 py-2 text-sm font-medium w-auto rounded-md ${
                selectedStatuses.includes(status.value)
                  ? 'bg-neutral-500 text-neutral-300'
                  : 'bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600'
              }`}
            >
              {status.description}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

interface Season {
  value: string;
  description: string;
}

export const Seasons = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTempSearchParams, searchParams } = useAnimeStore();

  const fetchSeasons = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: Season[] = await getSeasons();
      setSeasons(data);
    } catch (err) {
      setError(`'Ошибка при загрузке статусов озвучки', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusClick = (value: string) => {
    setSelectedSeasons((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((status) => status !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    setTempSearchParams({ seasons: selectedSeasons });
  }, [selectedSeasons]);

  useEffect(() => {
    if (searchParams.seasons.length === 0) {
      setSelectedSeasons([]);
    } else {
      setSeasons(searchParams.seasons);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSeasons();
  }, []);

  return (
    <div className="py-5">
      <h3 className="text-lg text-neutral-200 font-semibold">Сезоны</h3>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите сезоны для фильтрации тайтлов
      </h3>
      <div className="flex gap-2">
        {loading ? (
          <div className="flex  gap-2 ">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} width={66} height={36} />
              ))}
          </div>
        ) : (
          seasons.map((status) => (
            <button
              key={status.value}
              type="button"
              onClick={() => handleStatusClick(status.value)}
              className={`px-4 py-2 text-sm font-medium w-auto rounded-md ${
                selectedSeasons.includes(status.value)
                  ? 'bg-neutral-500 text-neutral-300'
                  : 'bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600'
              }`}
            >
              {status.description}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

interface SortingOption {
  value: string;
  label: string;
  description: string;
}

export const Sorting = () => {
  const [sortingOptions, setSortingOptions] = useState<SortingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTempSearchParams, searchParams } = useAnimeStore();

  const fetchSortingOptions = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data: SortingOption[] = await getSorting();
      setSortingOptions(data);
    } catch (err) {
      setError(`'Ошибка при загрузке вариантов сортировки', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTempSearchParams({ sorting: selectedOption });
  }, [selectedOption]);

  useEffect(() => {
    if (searchParams.sorting.length === 0) {
      setSelectedOption(null);
    } else {
      setSortingOptions(searchParams.sorting);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchSortingOptions();
  }, []);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsDropdownOpen(false); // Закрытие списка после выбора
  };

  return (
    <div className="py-5">
      {loading && (
        <div>
          <Skeleton className="w-full" height={41} style={{ borderRadius: '10px' }} />
        </div>
      )}
      {!loading && (
        <div className="relative inline-block w-full">
          {/* Кнопка для открытия списка */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full px-4 py-2 text-base lg:text-base rounded-xl border border-neutral-600 bg-transparent focus:outline-none text-left text-neutral-300"
          >
            {selectedOption
              ? sortingOptions.find((opt) => opt.value === selectedOption)?.label
              : 'Выберите сортировку'}
          </button>

          {/* Выпадающий список */}
          <div
            className={`absolute z-10 mt-2 w-full bg-neutral-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform ${
              isDropdownOpen ? ' opacity-100 scale-y-100' : 'max-h-0 opacity-0 scale-y-0'
            } origin-top`}
          >
            <div className="flex justify-between items-center p-2 border-b border-neutral-400">
              <span className="font-semibold text-neutral-300">Сортировка</span>
              <button onClick={() => setIsDropdownOpen(false)} className="text-neutral-400">
                <IoMdClose />
              </button>
            </div>

            {loading ? (
              <p className="p-2">Загрузка...</p>
            ) : error ? (
              <p className="p-2 text-red-500">{error}</p>
            ) : (
              <ul className="p-2">
                {sortingOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => handleOptionClick(option.value)}
                      className={`block w-full text-left px-4 py-2 hover:bg-neutral-700 rounded-lg ${
                        selectedOption === option.value
                          ? 'bg-neutral-500 text-neutral-300'
                          : 'text-neutral-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

interface AnimeType {
  value: string;
  description: string;
}

export const AnimeTypes = () => {
  const [animeTypes, setAnimeTypes] = useState<AnimeType[]>([]);
  const [selectedAnimeTypes, setSelectedAnimeTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setTempSearchParams, searchParams } = useAnimeStore();

  const fetchAnimeTypes = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await getTypes();
      setAnimeTypes(data);
    } catch (err) {
      setError(`'Ошибка при загрузке типов Аниме', ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTypesClick = (value: string) => {
    setSelectedAnimeTypes((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((rating) => rating !== value)
        : [...prevSelected, value],
    );
  };

  useEffect(() => {
    setTempSearchParams({ types: selectedAnimeTypes });
  }, [selectedAnimeTypes]);

  useEffect(() => {
    if (searchParams.types.length === 0) {
      setSelectedAnimeTypes([]);
    } else {
      setAnimeTypes(searchParams.types);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchAnimeTypes();
  }, []);

  return (
    <div className="py-5">
      <h3 className="text-lg text-neutral-200 font-semibold">Тип</h3>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите типы релизов, по которым будут отфильтрованы все релизы
      </h3>
      <div className="flex flex-wrap gap-2">
        {loading ? (
          // Отображение скелетонов при загрузке
          <div className="flex flex-wrap gap-2 ">
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} width={56} height={37} />
              ))}
          </div>
        ) : (
          animeTypes.map((rating) => (
            <button
              key={rating.value}
              type="button"
              onClick={() => handleTypesClick(rating.value)}
              className={`text-sm font-medium px-3 py-2 rounded-md ${
                selectedAnimeTypes.includes(rating.value)
                  ? 'bg-neutral-500 text-neutral-300'
                  : 'bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600'
              }`}
            >
              {rating.description}
            </button>
          ))
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export const YearSlider = () => {
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [yearRange, setYearRange] = useState<[number, number]>([0, 0]);
  const { setTempSearchParams, searchParams } = useAnimeStore();

  const fetchYears = async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки
      const data = await getYears(); // Пример ответа сервера
      setYears(data);
      setYearRange([Math.min(...data), Math.max(...data)]); // Устанавливаем начальный диапазон
    } catch (error) {
      setError(`'Ошибка при загрузке годов', ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  useEffect(() => {
    setTempSearchParams({ fromYear: yearRange[0], toYear: yearRange[1] });
  }, [yearRange]);

  useEffect(() => {
    // Если фильтры сброшены, обновляем yearRange
    if (searchParams.fromYear === '' && searchParams.toYear === '') {
      setYearRange([Math.min(...years), Math.max(...years)]); // Возвращаем диапазон по умолчанию
    } else {
      setYearRange([Number(searchParams.fromYear), Number(searchParams.toYear)]);
    }
  }, [searchParams, years]);

  const handleSliderChange = (values: [number, number]) => {
    setYearRange(values);
  };

  return (
    <div className="w-full flex flex-col py-5">
      <label className="text-lg text-neutral-200 font-semibold">Период выхода</label>
      <h3 className="text-xs text-neutral-600 font-semibold mb-4">
        Укажите типы релизов, по которым будут отфильтрованы все релизы
      </h3>
      {loading ? (
        <Skeleton className="w-full" height={20} style={{ borderRadius: '20px' }}></Skeleton>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            {/* Отображение минимального года */}
            <div className="text-sm font-medium">{yearRange[0]}</div>

            {/* Слайдер */}
            <div className="relative w-5/6 px-1 rounded-xl">
              <ReactSlider
                className="w-full bg-neutral-600 h-2 rounded-xl"
                thumbClassName="w-5 h-5 bg-neutral-400 rounded-full cursor-pointer transform -translate-y-1/3"
                trackClassName="bg-neutral-600 h-2 rounded-xl"
                min={Math.min(...years)}
                max={Math.max(...years)}
                value={yearRange}
                onChange={handleSliderChange}
                ariaLabel={['Lower thumb', 'Upper thumb']}
                pearling
                minDistance={1}
                renderTrack={(props, state) => {
                  return (
                    <div
                      {...props}
                      className={`h-2 rounded-xl ${
                        state.index === 1 ? 'bg-neutral-400' : 'bg-neutral-600'
                      }`}
                    />
                  );
                }}
              />
            </div>

            {/* Отображение максимального года */}
            <div className="text-sm font-medium text-">{yearRange[1]}</div>
          </div>
        </>
      )}
    </div>
  );
};

export const SubmitButton = () => {
  const submitParams = useAnimeStore((state) => state.submitParams);

  return (
    <div className="my-4 py-2 px-6 flex items-center justify-center border-2 border-neutral-500 rounded-xl bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600">
      <button onClick={submitParams}>Применить</button>
    </div>
  );
};

export const ResetButton = () => {
  const resetParams = useAnimeStore((state) => state.resetFilters);

  return (
    <div className="my-4 py-2 px-6 flex items-center justify-center border-2 border-neutral-500 rounded-xl bg-neutral-700 text-neutral-300 shadow-inner hover:bg-neutral-600">
      <button onClick={resetParams}>Сбросить</button>
    </div>
  );
};
