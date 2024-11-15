import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

interface MusicControllerProps {
  url: string;
  initialVolume?: number;
  loop?: boolean;
  className?: string;
}

export const MusicController: React.FC<MusicControllerProps> = ({
  url,
  initialVolume = 0.5,
  loop = true,
  className = '',
}) => {
  const bgm = useBackgroundMusic({
    url,
    volume: initialVolume,
    loop,
  });

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className='flex items-center space-x-4'>
        <input
          type='range'
          min='0'
          max='1'
          step='0.1'
          value={bgm.volume}
          onChange={(e) => bgm.setVolume(parseFloat(e.target.value))}
          className='w-24 accent-purple-500 bg-white/10 rounded-full'
        />
        <button
          onClick={bgm.togglePlay}
          className='bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm transition-all duration-300'
          aria-label={bgm.isPlaying ? '音楽を停止' : '音楽を再生'}
        >
          {bgm.isPlaying ? (
            <Volume2 className='w-6 h-6' />
          ) : (
            <VolumeX className='w-6 h-6' />
          )}
        </button>
      </div>
      <div className='text-sm text-gray-400'>音楽：魔王魂</div>
    </div>
  );
};
