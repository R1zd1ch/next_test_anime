import axios from 'axios';
const ANILIBRIA_API_URL = process.env.NEXT_PUBLIC_ANILIBRIA_API_URL as string;

if (!ANILIBRIA_API_URL) {
  throw new Error('ANILIBRIA_API_URL не определен. Проверьте переменные окружения.');
}

export const getTodayDay = () => {
  const date = new Date();
  const day = date.getDay();
  return (day + 6) % 7;
};

export const getNextAndPrevDay = (day: number) => {
  const lastDay = day > 0 ? day - 1 : 6;
  const nextDay = day > 5 ? 0 : day + 1;
  return [lastDay, day, nextDay];
};
export const getSchedule = async (days: number[]) => {
  try {
    const response = await axios.get(`${ANILIBRIA_API_URL}/title/schedule`, {
      params: {
        days: days.join(','),
        filter: 'posters,type,status,names,genres,id',
      },
    });

    return response.data;
  } catch (err: any) {
    console.error('Расписание не получено:', err.message || err);
    throw new Error('Ошибка при получении расписания.');
  }
};
