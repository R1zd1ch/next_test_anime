import { getSchedule, getTodayDay, getNextAndPrevDay } from '@/services/getSchedule';

export const getScheduleData = async () => {
  const today = getTodayDay();
  const threeDays = getNextAndPrevDay(today);
  const schedule = await getSchedule(threeDays);
  return schedule;
};
