import axios from 'axios';
const SESSION_TOKEN = process.env.NEXT_PUBLIC_SESSION_TOKEN as string;
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const searchAnime = async (query: string) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/app/search/releases`, {
      params: { query },
      headers: {
        Authorization: `Bearer ${SESSION_TOKEN}`,
      },
    });

    return response.data;
  } catch (err: any) {
    console.error('Ошибка при поиске аниме:', err.message || err);
    throw new Error('Не удалось выполнить поиск аниме. Попробуйте позже.');
  }
};
