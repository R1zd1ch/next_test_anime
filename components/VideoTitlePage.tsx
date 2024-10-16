'use client';

import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import ReactSlider from 'react-slider';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { MdForward5, MdReplay5 } from 'react-icons/md'; // Иконки для промотки

const MultiEpisodeVideoPlayer = ({ episodes }) => {
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState('hls_1080');
  const [isEpisodeMenuOpen, setIsEpisodeMenuOpen] = useState(false);
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef(null);
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL_NEW;

  const qualities = [
    { label: '480p', value: 'hls_480' },
    { label: '720p', value: 'hls_720' },
    { label: '1080p', value: 'hls_1080' },
  ];

  const selectedEpisode = episodes[selectedEpisodeIndex];

  const handleEpisodeChange = (index) => {
    setSelectedEpisodeIndex(index);
    setSelectedQuality('hls_1080');
  };

  const handleQualityChange = (quality) => {
    setSelectedQuality(quality);
  };

  const togglePlayPause = () => {
    setPlaying((prev) => !prev); // Переключение воспроизведения
  };

  const handleVolumeChange = (value) => {
    setVolume(value); // Изменение громкости через ReactSlider
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played * 100); // Обновляем только если пользователь не двигает слайдер
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeekChange = (value) => {
    setPlayed(value);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (value) => {
    setSeeking(false);
    playerRef.current.seekTo(value / 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      playerRef.current.getInternalPlayer().requestFullscreen().catch(console.error);
    } else {
      document.exitFullscreen();
    }
  };

  const skipForward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime + 5);
  };

  const skipBackward = () => {
    const currentTime = playerRef.current.getCurrentTime();
    playerRef.current.seekTo(currentTime - 5);
  };

  return (
    <div className="relative p-2">
      <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4">
        <h2 className="text-2xl font-bold">{selectedEpisode.name || 'Без названия'}</h2>

        {/* Выпадающее меню для выбора эпизодов */}
        <div className="relative inline-block my-4">
          <button
            onClick={() => setIsEpisodeMenuOpen(!isEpisodeMenuOpen)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span>Эпизод {selectedEpisodeIndex + 1}</span>
            <svg
              className="w-4 h-4 ml-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.516 7.548L10 11.682l4.484-4.134 1.032 1.144L10 14l-5.516-5.308z" />
            </svg>
          </button>
          {isEpisodeMenuOpen && (
            <ul className="absolute bg-gray-100 border rounded-lg shadow-lg mt-2 z-10 max-h-60 w-full overflow-y-auto">
              {episodes.map((episode, index) => (
                <li key={episode.id}>
                  <button
                    onClick={() => {
                      handleEpisodeChange(index);
                      setIsEpisodeMenuOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left ${index === selectedEpisodeIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 text-gray-800'}`}
                  >
                    Эпизод {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Выпадающее меню для выбора качества */}
        <div className="relative inline-block my-4">
          <button
            onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
          >
            <span>
              {qualities.find((quality) => quality.value === selectedQuality)?.label ||
                'Выберите качество'}
            </span>
            <svg
              className="w-4 h-4 ml-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.516 7.548L10 11.682l4.484-4.134 1.032 1.144L10 14l-5.516-5.308z" />
            </svg>
          </button>
          {isQualityMenuOpen && (
            <ul className="absolute bg-gray-100 border rounded-lg shadow-lg mt-2 z-10 w-full">
              {qualities.map((quality) => (
                <li key={quality.value}>
                  <button
                    onClick={() => {
                      handleQualityChange(quality.value);
                      setIsQualityMenuOpen(false);
                    }}
                    className={`block px-4 py-2 w-full text-left ${quality.value === selectedQuality ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 text-gray-800'}`}
                  >
                    {quality.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="relative w-full h-0 pb-[56.25%]">
        <ReactPlayer
          ref={playerRef}
          url={selectedEpisode[selectedQuality]}
          className="absolute top-0 left-0 w-full h-full"
          controls={false}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          onProgress={handleProgress}
          onDuration={handleDuration}
          light={false}
        />
        {/* Таймлайн */}
        <div className="absolute bottom-7 w-full px-6 z-30">
          <ReactSlider
            className="h-1 bg-neutral-50 bg-opacity-25% rounded-t-lg shadow-2xl"
            thumbClassName="w-2 h-2 -top-0.5 bg-slate-700 bg-opacity-25% focus:outline-none"
            trackClassName="bg-white rounded-full"
            min={0}
            max={100}
            step={0.01}
            value={played}
            onBeforeChange={handleSeekMouseDown}
            onChange={handleSeekChange}
            onAfterChange={handleSeekMouseUp}
          />
          <div className="flex justify-between text-sm text-neutral-50 mx-10">
            <span>{formatTime((played / 100) * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Панель управления */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 flex justify-between items-center transition-opacity duration-300 hover:opacity-100 opacity-100">
          {/* Кнопка воспроизведения/паузы */}
          <button
            className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-800 transition-colors"
            onClick={togglePlayPause}
          >
            {playing ? <CiPause1 /> : <CiPlay1 />}
          </button>

          {/* Кнопки для промотки */}
          <div className="flex space-x-2">
            <button
              className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-800 transition-colors"
              onClick={skipBackward}
            >
              <MdReplay5 />
            </button>
            <button
              className="bg-slate-700 text-white px-3 py-1 rounded hover:bg-slate-800 transition-colors"
              onClick={skipForward}
            >
              <MdForward5 />
            </button>
          </div>

          {/* Слайдер громкости */}
          <ReactSlider
            className="w-32 h-1 bg-neutral-50 rounded-md"
            thumbClassName="w-4 h-4 bg-slate-700 rounded-full shadow-lg -top-1.5"
            trackClassName="bg-blue-600"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
          />
          <button
            onClick={toggleFullScreen}
            className="bg-slate-700 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            {document.fullscreenElement ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      </div>

      {/* Длительность эпизода */}
      <div className="mt-1 text-gray-600">
        <p>
          Длительность: {Math.floor(selectedEpisode.duration / 60)} мин{' '}
          {selectedEpisode.duration % 60} сек
        </p>
      </div>
    </div>
  );
};

export default MultiEpisodeVideoPlayer;
