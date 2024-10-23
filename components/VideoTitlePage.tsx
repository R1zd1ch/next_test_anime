'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Button, IconButton, Menu, MenuItem, Slider, Typography, Box, Stack } from '@mui/material';
import { FiMaximize, FiMinimize } from 'react-icons/fi';
import { CiPlay1, CiPause1 } from 'react-icons/ci';
import { MdForward5, MdReplay5 } from 'react-icons/md';
import { GrChapterNext } from 'react-icons/gr';
import screenfull from 'screenfull';

interface Episode {
  id: number;
  name?: string;
  hls_480?: string;
  hls_720?: string;
  hls_1080?: string;
}

interface MultiEpisodeVideoPlayerProps {
  episodes: Episode[];
}

const MultiEpisodeVideoPlayer: React.FC<MultiEpisodeVideoPlayerProps> = ({ episodes }) => {
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState<string>('hls_480');
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const playerContainerRef = useRef<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fade, setFade] = useState(false);
  const [speedAnchorEl, setSpeedAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSpeed, setCurrentSpeed] = useState(1.0);
  const [isEpisodeMenuOpen, setIsEpisodeMenuOpen] = useState(false);
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const qualities = [
    { label: '480p', value: 'hls_480' },
    { label: '720p', value: 'hls_720' },
    { label: '1080p', value: 'hls_1080' },
  ];

  const speeds = [0.5, 1.0, 1.5, 2.0];

  const selectedEpisode: any = episodes[selectedEpisodeIndex];
  const videoExists = selectedEpisode && selectedEpisode[selectedQuality];

  const getMaxAvailableQuality = (episode: Episode) => {
    const availableQualities = qualities
      .filter((q) => episode[q.value as keyof Episode])
      .map((q) => q.value);
    return availableQualities[availableQualities.length - 1];
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
    };
  }, []);

  const handleEpisodeChange = (index: number) => {
    setSelectedEpisodeIndex(index);
    const maxQuality = getMaxAvailableQuality(episodes[index]);
    setSelectedQuality(maxQuality);
  };

  useEffect(() => {
    if (selectedEpisode) {
      const maxQuality = getMaxAvailableQuality(selectedEpisode);
      setSelectedQuality(maxQuality);
    }
  }, [selectedEpisode]);

  const handleQualityChange = (newQuality: string) => {
    try {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();

        setSelectedQuality(newQuality);
        setTimeout(() => {
          playerRef.current?.seekTo(currentTime, 'seconds');
        }, 100);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const togglePlayPause = () => {
    setPlaying((prev) => !prev);
  };

  const handleVolumeChange = (event: any, value: number | number[]) => {
    setVolume(value as number);
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played * 100);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeekChange = (event: any, value: number | number[]) => {
    setPlayed(value as number);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (event: any, value: number | number[]) => {
    setSeeking(false);
    playerRef.current?.seekTo((value as number) / 100);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFullScreen = () => {
    if (screenfull.isEnabled && playerRef.current) {
      const videoElement = playerRef.current.getInternalPlayer();

      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        if (videoElement) {
          if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
          } else if (videoElement.webkitEnterFullscreen) {
            videoElement.webkitEnterFullscreen();
          } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();
          }
        }
      } else {
        if (screenfull.isFullscreen) {
          screenfull.exit();
        } else {
          screenfull.request(playerContainerRef.current);
        }
      }
    }
  };

  useEffect(() => {
    let hideControlsTimeout: NodeJS.Timeout;
    if (playing && isFullscreen) {
      setFade(false);
      hideControlsTimeout = setTimeout(() => {
        setFade(true);
      }, 3000);
    } else {
      setFade(true);
    }

    return () => clearTimeout(hideControlsTimeout);
  }, [playing, isFullscreen]);

  const skipForward = () => {
    const currentTime = playerRef.current?.getCurrentTime() ?? 0;
    playerRef.current?.seekTo(currentTime + 5);
  };

  const skipBackward = () => {
    const currentTime = playerRef.current?.getCurrentTime() ?? 0;
    playerRef.current?.seekTo(currentTime - 5);
  };

  const handleSpeedMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setSpeedAnchorEl(event.currentTarget);
  };

  const handleSpeedMenuClose = (speed: number | null) => {
    setSpeedAnchorEl(null);
    if (speed !== null) {
      setCurrentSpeed(speed);
    }
  };

  const handleNextEpisode = () => {
    if (selectedEpisodeIndex < episodes.length - 1) {
      handleEpisodeChange(selectedEpisodeIndex + 1);
    }
  };

  const handleMouseMove = () => {
    setFade(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    if (playing) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setFade(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!playing) {
      setFade(true);
    }
  }, [playing]);

  useEffect(() => {
    const handleMouseLeave = () => {
      if (playing) {
        setFade(false);
      }
    };

    if (playerContainerRef.current) {
      const container = playerContainerRef.current;
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [playing]);

  useEffect(() => {
    if (isFullscreen && playing) {
      setFade(false);
    } else if (isFullscreen && !playing) {
      setFade(true);
    }
  }, [isFullscreen, playing]);

  return (
    <Box sx={{ backgroundColor: '#181818', color: '#fff', minHeight: '100vh' }}>
      {!videoExists ? (
        <Box textAlign="center">
          <Typography variant="h5">Видео недоступно</Typography>
          <Typography color="textSecondary">К сожалению, медиа этого аниме отсутствует</Typography>
        </Box>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center text-center sm:flex-row gap-2 sm:gap-4 mb-4">
            <h2 className="text-2xl font-bold">
              {selectedEpisode ? selectedEpisode.name || 'Без названия' : 'Без названия'}
            </h2>
            <div className="relative inline-block">
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
            <div className="relative inline-block">
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
          <Box ref={playerContainerRef} position="relative">
            <Box>
              <ReactPlayer
                ref={playerRef}
                url={selectedEpisode[selectedQuality]}
                className="react-player"
                playing={playing}
                volume={volume}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                onDuration={handleDuration}
                playbackRate={currentSpeed}
                controls={false}
                style={{ backgroundColor: 'black' }}
              />
            </Box>
            <Box position="absolute" width="100%" className="bottom-6 px-2 lg:bottom-12">
              {/* Таймлайн */}
              <Stack direction="row" justifyContent="space-between" className="mx-10">
                <Typography color="white">{formatTime((played / 100) * duration)}</Typography>
                <Typography color="white">{formatTime(duration)}</Typography>
              </Stack>
              <Slider
                value={played}
                onChange={handleSeekChange}
                onMouseDown={handleSeekMouseDown}
                onChangeCommitted={handleSeekMouseUp}
                step={0.01}
                min={0}
                max={100}
                sx={{
                  zIndex: 5,
                  color: '#fff', // Белый цвет
                  '&:hover .MuiSlider-thumb': {
                    display: 'block',
                    opacity: 1, // Добавляем прозрачность при наведении
                  },
                  '& .MuiSlider-thumb': {
                    display: fade ? 'block' : 'none',
                    transition: 'opacity 0.3s ease', // Плавный переход
                    opacity: 0, // Прозрачность по умолчанию
                  },
                  '& .MuiSlider-track': { height: '4px' },
                  '& .MuiSlider-rail': { height: '4px', color: '#333' },
                }}
              />
            </Box>
            {/* Панель управления */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              position="absolute"
              bottom="0"
              width="100%"
              p={{ xs: 0, sm: 1 }}
              bgcolor="rgba(0, 0, 0, 0.5)"
              sx={{
                opacity: fade ? 0.9 : 0,
                transition: 'opacity 0.6s ease',
                flexDirection: {
                  xs: 'row',
                  sm: 'row',
                },
                alignItems: {
                  xs: 'center',
                  sm: 'center',
                },
              }}
            >
              {/* Промотка и пауза */}
              <Stack
                direction="row"
                spacing={{ xs: -1, sm: 1 }}
                sx={{
                  mb: { xs: 0, sm: 0 },
                }}
              >
                <IconButton onClick={skipBackward} color="inherit">
                  <MdReplay5 style={{ color: 'white' }} />
                </IconButton>
                <IconButton onClick={togglePlayPause} color="inherit">
                  {playing ? (
                    <CiPause1 style={{ color: 'white' }} />
                  ) : (
                    <CiPlay1 style={{ color: 'white' }} />
                  )}
                </IconButton>
                <IconButton onClick={skipForward} color="inherit">
                  <MdForward5 style={{ color: 'white' }} />
                </IconButton>
              </Stack>

              {/* Громкость */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  min={0}
                  max={1}
                  step={0.05}
                  sx={{
                    width: {
                      xs: 70,
                      sm: 100,
                      md: 150,
                    },
                    mr: 1,
                    color: '#fff', // Белый цвет
                  }}
                />

                {/* Скорость воспроизведения */}
                <IconButton onClick={handleSpeedMenuOpen} color="inherit">
                  <Typography sx={{ color: '#fff' }}>{currentSpeed}x</Typography>
                </IconButton>
                <Menu
                  anchorEl={speedAnchorEl}
                  open={Boolean(speedAnchorEl)}
                  onClose={() => handleSpeedMenuClose(null)}
                >
                  {speeds.map((speed) => (
                    <MenuItem key={speed} onClick={() => handleSpeedMenuClose(speed)}>
                      {speed}x
                    </MenuItem>
                  ))}
                </Menu>

                {/* Следующий эпизод */}
                <Button
                  onClick={handleNextEpisode}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    ml: 2,
                  }}
                >
                  <GrChapterNext />
                </Button>
              </Stack>

              {/* Полноэкранный режим */}
              <IconButton onClick={toggleFullScreen} color="inherit">
                {screenfull.isFullscreen ? (
                  <FiMinimize style={{ color: 'white' }} />
                ) : (
                  <FiMaximize style={{ color: 'white' }} />
                )}
              </IconButton>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};

export default MultiEpisodeVideoPlayer;
