'use client';
import { useEffect, useState } from 'react';
import VideoTitlePage from './VideoTitlePage';
import Skeleton from 'react-loading-skeleton';

const VideoWrapper = ({ anime }: { anime: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Задержка 2 секунды

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border-1 min-h-96 max-w-5xl mx-auto">
      {isLoading ? (
        // Исправляем стили контейнера для правильного отображения скелетона
        <div className="relative w-full h-[400px] lg:h-[630px] bg-neutral-900 border border-neutral-700 rounded-lg overflow-hidden">
          <Skeleton className="absolute inset-0 w-full h-full" style={{ borderRadius: '8px' }} />
        </div>
      ) : (
        <VideoTitlePage episodes={anime.episodes} />
      )}
    </div>
  );
};

export default VideoWrapper;
