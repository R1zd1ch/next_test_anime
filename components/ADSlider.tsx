'use client';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { getUpdatesReleases } from '@/services/newEpisodes'; // Функция для получения релизов

const Slider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<any[]>([]); // Слайды приходят с API
  const [loading, setLoading] = useState(true); // Флаг загрузки

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUpdatesReleases(5); // Получаем данные
        setSlides(data); // Устанавливаем слайды
        setLoading(false); // Отключаем флаг загрузки
      } catch (error) {
        console.error('Error fetching slides data:', error);
      }
    };

    fetchData();
  }, []);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  if (loading) {
    return <div>Loading...</div>; // Пока данные загружаются
  }

  return (
    <div className="relative w-full h-[400px] bg-neutral-900 rounded-xl overflow-hidden">
      {/* Слайд */}
      <div className="relative h-full">
        <Image
          src={slides[currentSlide].posters.original.url} // Используем постеры из API
          alt={slides[currentSlide].names.ru} // Название аниме
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />

        {/* Информация на слайде */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white z-10">
          <div className="mb-4 text-sm uppercase bg-neutral-800 inline-block px-3 py-1 rounded-full">
            Реклама
          </div>
          <h2 className="text-4xl font-bold mb-2">{slides[currentSlide].names.ru}</h2>
          <p className="text-lg mb-4">{slides[currentSlide].description}</p>
          <button className="bg-red-600 px-5 py-3 rounded-md text-white hover:bg-red-700 transition">
            Смотреть
          </button>
        </div>

        {/* Кнопки навигации */}
        <div className="absolute inset-y-0 left-4 flex items-center z-10">
          <button
            onClick={prevSlide}
            className="text-white bg-neutral-800 p-2 rounded-full hover:bg-neutral-700 transition"
          >
            <FaChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 flex items-center z-10">
          <button
            onClick={nextSlide}
            className="text-white bg-neutral-800 p-2 rounded-full hover:bg-neutral-700 transition"
          >
            <FaChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Индикаторы */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? 'bg-red-600' : 'bg-neutral-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
