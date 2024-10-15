// ScheduleClient.tsx (Клиентский компонент)
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const weekDays = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

const IMAGE_URL = process.env.IMAGE_URL;

export const ScheduleClient = ({ schedule, today }) => {
  const [selectedDay, setSelectedDay] = useState(today);

  const handleDayChange = (dayOffset) => {
    const newDay = (today + dayOffset + 7) % 7; // Откорректируем день недели, чтобы было по кругу
    setSelectedDay(newDay);
  };

  const dayNames = ['Вчера', 'Сегодня', 'Завтра'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-6">Расписание обновлений</h1>

      {/* Кнопки для выбора дня */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleDayChange(-1)}
          className={`px-4 py-2 mx-2 border ${selectedDay === (today + 6) % 7 ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-white'} rounded-lg`}
        >
          Вчера
        </button>
        <button
          onClick={() => handleDayChange(0)}
          className={`px-4 py-2 mx-2 border ${selectedDay === today ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-white'} rounded-lg`}
        >
          Сегодня
        </button>
        <button
          onClick={() => handleDayChange(1)}
          className={`px-4 py-2 mx-2 border ${selectedDay === (today + 1) % 7 ? 'bg-blue-500 text-white' : 'bg-neutral-700 text-white'} rounded-lg`}
        >
          Завтра
        </button>
      </div>

      {/* Отображение только выбранного дня */}
      <div className="grid grid-cols-1 gap-6">
        {schedule
          .filter((day) => day.day === selectedDay)
          .map((day) => (
            <div key={day.day} className="rounded-lg border-2 p-4 bg-neutral-900">
              <h2 className="text-xl font-semibold mb-4 text-white">{weekDays[day.day]}</h2>
              <div className="grid grid-cols-2 gap-4">
                {day.list.map((anime) => (
                  <div key={anime.id} className="relative group bg-neutral-800 rounded-lg p-2">
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
                      <p className="text-sm text-gray-400">{anime.type.full_string}</p>
                      <p className="text-sm text-gray-400">Статус: {anime.status.string}</p>
                      <p className="text-sm text-gray-400">Жанры: {anime.genres.join(', ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
