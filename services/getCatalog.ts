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

export const getProductionStatus = async () => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/catalog/references/production-statuses`,
    );

    return response.data;
  } catch (err: any) {
    console.error('Список статусов не получен:', err.message || err);
    throw new Error('Ошибка при получении статусов');
  }
};

export const getProductionStatus = async () => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/catalog/references/production-statuses`,
    );

    return response.data;
  } catch (err: any) {
    console.error('Список статусов не получен:', err.message || err);
    throw new Error('Ошибка при получении статусов');
  }
};
