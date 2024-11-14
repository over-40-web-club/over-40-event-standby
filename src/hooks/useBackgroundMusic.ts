import { useState, useEffect } from 'react';

interface UseBackgroundMusicOptions {
  url: string;
  volume?: number;
  loop?: boolean;
}

interface UseBackgroundMusicReturn {
  isPlaying: boolean;
  volume: number;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  fadeIn: () => void;
  fadeOut: () => void;
}

export const useBackgroundMusic = ({
  url,
  volume: initialVolume = 0.5,
  loop = true,
}: UseBackgroundMusicOptions): UseBackgroundMusicReturn => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);

  useEffect(() => {
    audio.loop = loop;
    audio.volume = volume;

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio, loop, volume]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch((error) => {
        console.log('Audio playback failed:', error);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
    audio.volume = clampedVolume;
  };

  const fadeIn = () => {
    let currentVolume = 0;
    audio.volume = 0;
    setIsPlaying(true);

    const fadeInterval = setInterval(() => {
      if (currentVolume < volume) {
        currentVolume = Math.min(volume, currentVolume + 0.1);
        audio.volume = currentVolume;
      } else {
        clearInterval(fadeInterval);
      }
    }, 200);
  };

  const fadeOut = () => {
    let currentVolume = audio.volume;

    const fadeInterval = setInterval(() => {
      if (currentVolume > 0) {
        currentVolume = Math.max(0, currentVolume - 0.1);
        audio.volume = currentVolume;
      } else {
        setIsPlaying(false);
        clearInterval(fadeInterval);
      }
    }, 200);
  };

  return {
    isPlaying,
    volume,
    togglePlay,
    setVolume,
    fadeIn,
    fadeOut,
  };
};
