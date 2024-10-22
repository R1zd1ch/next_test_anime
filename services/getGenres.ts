import axios from 'axios';

const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

export const getGenres = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/genres`);
    return response.data;
  } catch (err: any) {
    console.log('Ошибка в получении жанров, getGenres', err.message, err);
    throw new Error('Ошибка в getGenres.');
  }
};

export const getGenresById = async (id: number) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/genres/${id}`);
    return response.data;
  } catch (err: any) {
    console.log('Ошибка в получении данных по жанру, getGenresById', err.message || err);
    throw new Error('Ошибка в getGenresById');
  }
};

export const getGenresRandom = async (limit: number = 1) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/genres/random?limit=${limit}`);
    return response.data;
  } catch (err: any) {
    console.log('Ошибка в получении рандомного жанра(жанров), getGenresRandom', err.message || err);
    throw new Error('Ошибка в getGenresRandom');
  }
};

export const getGenresReleases = async (genreId: number, page: number = 1, limit: number = 15) => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/genres/${genreId}/releases?page=${page}&limit=${limit}`,
    );
    return response.data;
  } catch (err: any) {
    console.log('Ошибка в получении тайтлов по id, getGenresReleases', err.message || err);
    throw new Error('Ошибка в getGenresReleases');
  }
};
