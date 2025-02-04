import { useEffect, useRef, useState } from 'react';

interface UseAudioPlayerProps {
  audioUrl: string;
}

export const useAudioPlayer = ({ audioUrl }: UseAudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    audio.play().catch((err) => {
      console.error('Failed to auto-play audio:', err);
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }

      setIsPlaying(!isPlaying);
    } catch (err) {
      console.error('Failed to play audio:', err);
      setIsPlaying(false);
    }
  };

  return {
    isPlaying,
    togglePlay,
  };
};
