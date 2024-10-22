'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getSchedule, getDayIndexes } from '@/services/getSchedule';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Обязательно подключить стили скелетонов

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

interface Anime {
  id: string;
  name: {
    main?: string;
    english?: string;
  };
  episodes_total: number;
  year: string;
  type: {
    value: string;
    description: string;
  };
  age_rating: {
    label: string;
  };
  genres: { id: number; name: string }[];
  season: {
    description: string;
  };
  poster: {
    src: string;
    thumbnail: string;
    optimized: {
      src: string;
      thumbnail: string;
    };
  };
  publish_day: {
    value: number;
    description: string;
  };
}

// Компонент для отображения скелетона карточки
const SkeletonCard = () => (
  <div className="rounded-lg bg-neutral-900">
    <div className="relative group bg-neutral-800 rounded-lg min-h-[120px] h-auto">
      {/* Скелетон для изображения */}
      <Skeleton height={150} className="rounded-lg" />
    </div>
  </div>
);

const Schedule = () => {
  const { todayIndex, yesterdayIndex, tomorrowIndex } = getDayIndexes();

  const [selectedDay, setSelectedDay] = useState<number>(todayIndex);
  const [fullSchedule, setFullSchedule] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const fetchedSchedule = await getSchedule();
        const data = fetchedSchedule.map((item: any) => item.release);
        setFullSchedule(data);
      } catch (error) {
        console.error('Error fetching schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const filteredSchedule = fullSchedule.filter((anime) => anime.publish_day.value === selectedDay);

  const handleDayChange = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl mb-4">Расписание</h1>

      {/* Селектор дней в виде блоков с анимацией */}
      <div className="flex justify-start space-x-4 mb-6">
        <div className="border bg-neutral-800 flex justify-center px-4 gap-1 rounded-2xl">
          <div
            className={`p-3 px-4 bg-neutral-800 text-white rounded-2xl cursor-pointer ${
              selectedDay === yesterdayIndex ? 'bg-neutral-900' : ''
            }`}
            onClick={() => handleDayChange(yesterdayIndex)}
          >
            Вчера
          </div>
          <div
            className={`p-3 px-4 bg-neutral-800 text-white rounded-2xl cursor-pointer transition-all duration-300 ${
              selectedDay === todayIndex ? 'bg-neutral-900' : ''
            }`}
            onClick={() => handleDayChange(todayIndex)}
          >
            Сегодня
          </div>
          <div
            className={`p-3 px-4 bg-neutral-800 text-white rounded-2xl cursor-pointer ${
              selectedDay === tomorrowIndex ? 'bg-neutral-900' : ''
            }`}
            onClick={() => handleDayChange(tomorrowIndex)}
          >
            Завтра
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-6 text-white">{weekDays[selectedDay - 1]}</h2>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <>
          {/* Карточки с аниме */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((anime) => (
                <Link key={anime.id} href={`/anime/title/${anime.id}`}>
                  <div className="rounded-lg border-2 p-4 bg-neutral-900">
                    <div className="relative group bg-neutral-800 rounded-lg p-2 min-h-[120px] h-auto">
                      <Image
                        src={`${IMAGE_URL}${anime.poster.optimized.src}`}
                        alt={anime.id}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-0 transition duration-700 ease-linear group-hover:grayscale group-hover:opacity-100 rounded-lg"
                      />

                      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-lg">
                        <h3 className="text-base sm:text-lg font-semibold mb-1 text-white truncate">
                          {anime.name.main || anime.name.english}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-300">
                          {anime.year} • {anime.season.description} • {anime.type.description} •{' '}
                          {anime.age_rating.label}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300 mt-1 truncate">
                          Жанры: {anime.genres.map((genre) => genre.name).join(', ')}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-300">
                          Эпизодов: {anime.episodes_total}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-white">Нет аниме для выбранного дня.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Schedule;
