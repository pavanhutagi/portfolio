"use client";

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { useAudioPlayer } from "@/hooks/audio-player";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function AudioControl() {
  const isVisible = useIdleVisibility();
  const { isPlaying, togglePlay } = useAudioPlayer({
    audioUrl: "/music/background-music.mp3",
  });

  return (
    <div className="invisible opacity-0 transition-all duration-300 md:visible md:opacity-100">
      <button
        onClick={togglePlay}
        className={`bg-background-dark dark:bg-background-light drop-shadow-[0_0_4px_rgba(0,0,0,0.2)] fixed bottom-6 left-6 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px] rounded-full p-[13px] transition-transform duration-300 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 ${
          isVisible ? "translate-x-0" : "-translate-x-40"
        }`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <FaVolumeUp className="h-5 w-5 text-text-dark dark:text-text-light" />
        ) : (
          <FaVolumeMute className="h-5 w-5 text-text-dark dark:text-text-light" />
        )}
      </button>
    </div>
  );
}
