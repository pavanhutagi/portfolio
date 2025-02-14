"use client";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useIdleVisibility } from "@/hooks/useIdleVisibility";

export default function AudioControl() {
  const isVisible = useIdleVisibility();
  const { isPlaying, togglePlay } = useAudioPlayer({
    audioUrl: "/music/background-music.mp3",
  });

  return (
    <div className="invisible opacity-0 md:visible md:opacity-100 transition-all duration-300">
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 w-[50px] h-[50px] p-[13px] rounded-full bg-[#D4D4D4] hover:bg-white transition-all duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-40"
        }`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? <FaVolumeUp size={24} /> : <FaVolumeMute size={24} />}
      </button>
    </div>
  );
}
