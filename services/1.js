const axios = require('axios');

// const fetchAnimeReleases = async (searchParams) => {
//   try {
//     // Создание строки параметров
//     const queryParams = new URLSearchParams({
//       page: searchParams.page?.toString() || '1', // Страница в выдаче
//       limit: searchParams.limit?.toString() || '15', // Количество релизов в выдаче
//       'f[genres]': searchParams.genres?.join(','), // Список жанров через запятую
//       'f[types]': searchParams.types?.join(','), // Список типов релизов
//       'f[seasons]': searchParams.seasons?.join(','), // Список сезонов
//       'f[years][from_year]': searchParams.fromYear?.toString(), // Минимальный год выхода
//       'f[years][to_year]': searchParams.toYear?.toString(), // Максимальный год выхода
//       'f[search]': searchParams.search || '', // Поисковый запрос
//       'f[sorting]': searchParams.sorting || 'RATING_DESC', // Сортировка
//       'f[age_ratings]': searchParams.ageRatings?.join(','), // Список возрастных рейтингов
//       'f[publish_statuses]': searchParams.publishStatuses?.join(','), // Статус публикации
//       'f[production_statuses]': searchParams.productionStatuses?.join(','), // Статус производства
//     });

//     const url = `https://anilibria.top/api/v1/anime/catalog/releases?${queryParams.toString()}`;

//     const response = await axios.get(url);

//     // Обработка данных ответа
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching anime releases:', error);
//     return [];
//   }
// };

// // Пример вызова
// const searchParams = {
//   page: 1,
//   limit: 15,
//   genres: [15, 20],
//   types: ['TV', 'WEB'],
//   seasons: ['winter', 'autumn'],
//   fromYear: 2016,
//   toYear: 2020,
//   search: 'Мастера меча',
//   sorting: 'RATING_DESC',
//   ageRatings: ['R6_PLUS', 'R12_PLUS'],
//   publishStatuses: ['IS_ONGOING'],
//   productionStatuses: ['IS_IN_PRODUCTION'],
// };

// fetchAnimeReleases(searchParams).then((data) => {
//   console.log(data); // Логируем данные
// });

const ANILIBRIA_API_URL = 'https://anilibria.top/api/v1';

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

const getSchedule = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/schedule/week`);
    return response;
  } catch (err) {
    console.error('Расписание не получено:', err.message || err);
    throw new Error('Ошибка при получении расписания.');
  }
};

const main = async () => {
  try {
    const data = await getSchedule();
    console.log(data);
  } catch (error) {
    console.error('Ошибка при вызове функции:', error.message);
  }
};

main();
