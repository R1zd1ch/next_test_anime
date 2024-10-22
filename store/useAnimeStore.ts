import { create } from 'zustand';
import { fetchAnimeReleases } from '@/services/getCatalog';

interface AnimeStore {
  [x: string]: any;
  searchParams: {
    page: number | any;
    limit: number | any;
    genres: (number | any)[]; // Массив жанров
    types: (string | any)[]; // Массив типов релизов
    seasons: (string | any)[]; // Массив сезонов
    fromYear: string | number; // Минимальный год
    toYear: string | number; // Максимальный год
    search: string | any; // Поисковый запрос
    sorting: string | any; // Тип сортировки
    ageRatings: (string | any)[]; // Массив возрастных рейтингов
    publishStatuses: (string | any)[]; // Массив статусов публикации
    productionStatuses: (string | any)[]; // Массив статусов производства
  };
  tempSearchParams: Omit<AnimeStore['searchParams'], 'search'>; // Промежуточные параметры
  releases: any[]; // Массив релизов
  isLoading: boolean;
  error: string | null;
  setSearch: (search: string) => void; // Обновление только поискового запроса
  setTempSearchParams: (params: Partial<AnimeStore['tempSearchParams']>) => void; // Обновление временных параметров
  submitParams: () => void; // Применение временных параметров
  resetFilters: () => void;
  fetchReleases: () => Promise<void>; // Получение релизов
}

const useAnimeStore = create<AnimeStore>((set, get) => ({
  searchParams: {
    page: 1,
    limit: 40,
    genres: [], // Список жанров, например [15, 20]
    types: [], // Типы релизов, например ['TV', 'WEB']
    seasons: [], // Сезоны, например ['winter', 'autumn']
    fromYear: '', // Минимальный год выхода
    toYear: '', // Максимальный год выхода
    search: '', // Поисковый запрос
    sorting: '', // Сортировка по рейтингу
    ageRatings: [], // Возрастные рейтинги, например ['R6_PLUS', 'R12_PLUS']
    publishStatuses: [], // Статус публикации, например ['IS_ONGOING']
    productionStatuses: [], // Статус производства, например ['IS_IN_PRODUCTION'],
  },
  tempSearchParams: {
    page: 1,
    limit: 40,
    genres: [],
    types: [],
    seasons: [],
    fromYear: '',
    toYear: '',
    sorting: '',
    ageRatings: [],
    publishStatuses: [],
    productionStatuses: [],
  },
  releases: [],
  isLoading: false,
  error: null,

  setSearch: (search) =>
    set((state) => ({
      searchParams: { ...state.searchParams, search }, // Обновляем только параметр поиска
    })),

  setTempSearchParams: (params) =>
    set((state) => ({
      tempSearchParams: { ...state.tempSearchParams, ...params }, // Обновляем временные параметры
    })),

  submitParams: () => {
    const { tempSearchParams } = get();
    set((state) => ({
      searchParams: { ...state.searchParams, ...tempSearchParams }, // Применяем временные параметры к основным
    }));
    get().fetchReleases(); // Выполняем запрос на получение релизов
  },

  resetFilters: () => {
    set({
      searchParams: {
        page: 1,
        limit: 40,
        genres: [],
        types: [],
        seasons: [],
        fromYear: '',
        toYear: '',
        search: '',
        sorting: '',
        ageRatings: [],
        publishStatuses: [],
        productionStatuses: [],
      },
      tempSearchParams: {
        page: 1,
        limit: 40,
        genres: [],
        types: [],
        seasons: [],
        fromYear: '',
        toYear: '',
        sorting: '',
        ageRatings: [],
        publishStatuses: [],
        productionStatuses: [],
      },
    });
    get().fetchReleases(); // Перезапрашиваем релизы с дефолтными параметрами
  },

  fetchReleases: async () => {
    const { searchParams } = get(); // Получаем текущие параметры поиска
    set({ isLoading: true, error: null }); // Устанавливаем флаг загрузки

    try {
      const response = await fetchAnimeReleases(searchParams); // Выполняем запрос
      set({ releases: response, isLoading: false }); // Сохраняем релизы и убираем флаг загрузки
    } catch (error) {
      set({ error: 'Error fetching anime releases', isLoading: false }); // Обрабатываем ошибку
      console.error('Error fetching anime releases:', error);
    }
  },
}));

export default useAnimeStore;
