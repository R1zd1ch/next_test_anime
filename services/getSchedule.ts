import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL_NEW as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const getDayIndexes = () => {
  const todayIndex = new Date().getDay() === 0 ? 7 : new Date().getDay();
  const yesterdayIndex = todayIndex === 1 ? 7 : todayIndex - 1;
  const tomorrowIndex = todayIndex === 7 ? 1 : todayIndex + 1;

  return { todayIndex, yesterdayIndex, tomorrowIndex };
};

export const getSchedule = async () => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/anime/schedule/week`);

    return response.data;
  } catch (err: any) {
    console.error('Расписание не получено:', err.message || err);
    throw new Error('Ошибка при получении расписания.');
  }
};
