import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

export const getAgeRatings = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/age-ratings`);

    return response.data;
  } catch (err: any) {
    console.error('Список возрастных категорий не получен:', err.message || err);
    throw new Error('Ошибка при получении возрастов');
  }
};

export const getGenres = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/genres`);

    return response.data;
  } catch (err: any) {
    console.error('Список жанров не получен:', err.message || err);
    throw new Error('Ошибка при получении жанров');
  }
};

export const getProductionStatuses = async () => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/catalog/references/production-statuses`,
    );

    return response.data;
  } catch (err: any) {
    console.error('Список продакшн статусов не получен:', err.message || err);
    throw new Error('Ошибка при получении продакшн статусов');
  }
};

export const getPublishStatuses = async () => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/catalog/references/publish-statuses`,
    );

    return response.data;
  } catch (err: any) {
    console.error('Список паблиш статусов не получен:', err.message || err);
    throw new Error('Ошибка при получении паблиш статусов');
  }
};

export const getSeasons = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/seasons`);

    return response.data;
  } catch (err: any) {
    console.error('Список сезонов не получен:', err.message || err);
    throw new Error('Ошибка при получении сезонов');
  }
};

export const getSorting = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/sorting`);

    return response.data;
  } catch (err: any) {
    console.error('Список сортировок не получен:', err.message || err);
    throw new Error('Ошибка при получении сортировок');
  }
};

export const getTypes = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/types`);

    return response.data;
  } catch (err: any) {
    console.error('Список типов не получен:', err.message || err);
    throw new Error('Ошибка при получении типов');
  }
};

export const getYears = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/catalog/references/years`);

    return response.data;
  } catch (err: any) {
    console.error('Список годов не получен:', err.message || err);
    throw new Error('Ошибка при получении годов');
  }
};
