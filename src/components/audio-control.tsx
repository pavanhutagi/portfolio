"use client";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useIdleVisibility } from "@/hooks/useIdleVisibility";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

export default function AudioControl() {
  const isVisible = useIdleVisibility();
  const { isPlaying, togglePlay } = useAudioPlayer({
    audioUrl: "/music/background-music.mp3",
  });

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 p-[13px] rounded-full bg-[#1D1D1D] text-[#636363] transition-all duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-40"
      }`}
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
    </button>
  );
}
