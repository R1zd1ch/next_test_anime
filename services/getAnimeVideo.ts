import axios from 'axios';

const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const getVideosAnime = async (releaseEpisodeId: number) => {
  try {
    const response = await axios.get(
      `${ANILIBRIA_API_URL}/anime/releases/episodes/${releaseEpisodeId}`,
    );
    return response.data;
  } catch (err: any) {
    console.error('Ошибка при получении эпизода:', err.message || err);
    throw new Error('Не удалось получить эпизод. Попробуйте позже.');
  }
};
