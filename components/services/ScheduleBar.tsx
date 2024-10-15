'use client';
// SchedulePage.tsx (Основной компонент)
import { fetchScheduleData } from './ScheduleServer';
import { ScheduleClient } from './ScheduleClient';

const SchedulePage = async () => {
  const { schedule, today } = await fetchScheduleData();

  return <ScheduleClient schedule={schedule} today={today} />;
};

export default SchedulePage;
