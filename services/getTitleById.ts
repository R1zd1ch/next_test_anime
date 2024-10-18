import axios from 'axios';
const SESSION_TOKEN = process.env.NEXT_PUBLIC_SESSION_TOKEN as string;
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const getTitleById = async (id: number) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/releases/${id}`, {
      headers: {
        Authorization: `Bearer ${SESSION_TOKEN}`,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error('Ошибка в getTitleById:', err.message || err);

    throw new Error(`Ошибка при получении данных о тайтле с ID: ${id}`);
  }
};
