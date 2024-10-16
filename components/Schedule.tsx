'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getSchedule, getTodayDay, getNextAndPrevDay } from '@/services/getSchedule';

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

const Schedule = () => {
  const [selectedDay, setSelectedDay] = useState('today'); // хранит выбор пользователя
  const [fullSchedule, setFullSchedule] = useState([]); // хранит полное расписание для всех дней
  const [loading, setLoading] = useState(true); // флаг загрузки

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      const today = getTodayDay(); // получаем текущий день
      const days = getNextAndPrevDay(today); // получаем массив дней [вчера, сегодня, завтра]

      // Получаем расписание сразу для всех трех дней
      const fetchedSchedule = await getSchedule(days);
      setFullSchedule(fetchedSchedule); // сохраняем полное расписание
      setLoading(false);
    };

    fetchSchedule();
  }, []);

  // Фильтрация расписания в зависимости от выбранного дня
  const filteredSchedule = fullSchedule.find((day) => {
    if (selectedDay === 'yesterday') return day.day === getNextAndPrevDay(getTodayDay())[0];
    if (selectedDay === 'today') return day.day === getNextAndPrevDay(getTodayDay())[1];
    if (selectedDay === 'tomorrow') return day.day === getNextAndPrevDay(getTodayDay())[2];
  });

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl mb-4">Расписание ></h1>

      {/* Dropdown для выбора дня */}
      <div className="mb-4">
        <label htmlFor="daySelector" className="text-white mr-4">
          Выберите день:
        </label>
        <select
          id="daySelector"
          className="p-2 bg-neutral-800 text-white rounded-lg"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="yesterday">Вчера</option>
          <option value="today">Сегодня</option>
          <option value="tomorrow">Завтра</option>
        </select>
      </div>

      {loading ? (
        <p className="text-white">Загрузка...</p>
      ) : (
        <>
          {/* Отображаем выбранный день только один раз сверху */}
          <h2 className="text-xl font-semibold mb-6 text-white">
            {weekDays[filteredSchedule?.day]}
          </h2>

          {/* Карточки с аниме */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {filteredSchedule?.list.map((anime) => (
              <div key={anime.id} className="rounded-lg border-2 p-4 bg-neutral-900">
                <div className="grid grid-cols-1 gap-4">
                  <div className="relative group bg-neutral-800 rounded-lg p-2">
                    <Link href={`/anime/title/${anime.id}`}>
                      <Image
                        src={`${IMAGE_URL}${anime.posters.small.url}`}
                        alt={anime.names.ru || anime.names.en}
                        width={150}
                        height={200}
                        className="rounded-lg transition duration-300 ease-in-out transform group-hover:grayscale group-hover:scale-105"
                      />
                    </Link>
                    <div className="mt-2 text-white">
                      <h3 className="text-base font-semibold">
                        {anime.names.ru || anime.names.en}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Schedule;
