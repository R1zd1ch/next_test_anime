// ScheduleServer.tsx (Серверный компонент)
import { getSchedule, getTodayDay, getNextAndPrevDay } from '@/services/getSchedule';

export const fetchScheduleData = async () => {
  const today = getTodayDay();
  const threeDays = getNextAndPrevDay(today);
  const schedule = await getSchedule(threeDays);
  return { schedule, today };
};
