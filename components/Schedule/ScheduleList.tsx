import React, { useState, useEffect } from 'react';
import ScheduleDailyRelease from './ScheduleDailyRelease';
import { Schedule } from './ScheduleMain';
import { getSchedule } from '@/services/getSchedule';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const dayNames = {
  0: 'Все',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота',
  7: 'Воскресенье',
};

const ScheduleList: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingDay, setLoadingDay] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay() || 7);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true); // Начинаем загрузку

      try {
        const data = await getSchedule();
        setSchedules(data);
        setLoading(false); // Завершаем загрузку
      } catch (err: any) {
        setError(err.message);
        console.error(`Ошибка при загрузке франшиз: ${err}`);
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const filterSchedulesByDay = (day: number) => {
    return schedules.filter((schedule) => {
      const releaseDay = parseInt(schedule.release.publish_day.value);
      return releaseDay === day;
    });
  };

  const handleDayChange = (day: number) => {
    setSelectedDay(day);
    setLoadingDay(true);

    setTimeout(() => {
      setLoadingDay(false);
    }, 500);
  };

  const filteredSchedules = selectedDay === 0 ? schedules : filterSchedulesByDay(selectedDay);

  return (
    <div className="container mx-auto p-4 pt-0">
      <h2 className="text-2xl font-bold mb-4">Релизы на неделю</h2>

      <div className="flex gap-2 mb-6 flex-wrap">
        {loading
          ? Array(Object.keys(dayNames).length)
              .fill(0)
              .map((_, index) => (
                <Skeleton key={index} width={80} height={40} className="rounded-md" />
              ))
          : Object.entries(dayNames).map(([day, name]) => (
              <button
                key={day}
                className={`flex-shrink-0 px-4 py-2 text-xs sm:text-sm md:text-base lg:text-lg rounded shadow-black/50 shadow-md hover:bg-neutral-500 ${
                  selectedDay === parseInt(day)
                    ? 'bg-neutral-500 text-neutral-200 border-neutral-200 border-2'
                    : 'bg-neutral-700 text-neutral-200'
                }`}
                onClick={() => handleDayChange(parseInt(day))}
              >
                {name}
              </button>
            ))}
      </div>

      {loading || loadingDay ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array(filteredSchedules.length || 6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full aspect-[2/3] rounded-lg overflow-hidden">
                <Skeleton height="105%" width="100%" />
              </div>
            ))}
        </div>
      ) : error ? (
        <p className="text-red-500">Ошибка: {error}</p>
      ) : (
        <ScheduleDailyRelease releases={filteredSchedules} />
      )}
    </div>
  );
};

export default ScheduleList;
