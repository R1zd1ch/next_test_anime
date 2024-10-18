import axios from 'axios';

const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const getUpdatesReleases = async (limit = 10) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/releases/latest`, {
      params: { limit },
    });

    return response.data;
  } catch (err: any) {
    console.error('Error fetching new episodes:', err.message || err);
    throw new Error('Не удалось получить обновления релизов. Попробуйте позже.');
  }
};
