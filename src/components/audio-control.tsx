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
    <div className="invisible opacity-0 md:visible md:opacity-100 transition-all duration-300">
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 w-[50px] h-[50px] p-[13px] rounded-full bg-dark-background dark:bg-background transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "-translate-x-40"
        }`}
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <FaVolumeUp className="w-5 h-5 text-dark-text dark:text-text" />
        ) : (
          <FaVolumeMute className="w-5 h-5 text-dark-text dark:text-text" />
        )}
      </button>
    </div>
  );
}
