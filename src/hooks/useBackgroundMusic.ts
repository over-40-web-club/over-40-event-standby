import { useState, useEffect, useRef } from 'react';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(initialVolume);
  const fadeIntervalRef = useRef<number>();
  const initializedRef = useRef(false);

  // Audio インスタンスの作成のみを行う
  useEffect(() => {
    audioRef.current = new Audio(url);
    initializedRef.current = true;

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [url]);

  // 初期設定と更新の両方を処理
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = loop;
      audioRef.current.volume = volume;
    }
  }, [loop, volume]);

  // 再生状態の制御
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((error) => {
        console.log('Audio playback failed:', error);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);
  };

  const fadeIn = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    let currentVolume = 0;
    audioRef.current.volume = 0;
    setIsPlaying(true);

    fadeIntervalRef.current = window.setInterval(() => {
      if (currentVolume < volume) {
        currentVolume = Math.min(volume, currentVolume + 0.1);
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      } else {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
      }
    }, 200);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;

    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    let currentVolume = audioRef.current.volume;

    fadeIntervalRef.current = window.setInterval(() => {
      if (currentVolume > 0) {
        currentVolume = Math.max(0, currentVolume - 0.1);
        if (audioRef.current) {
          audioRef.current.volume = currentVolume;
        }
      } else {
        setIsPlaying(false);
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
        }
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
