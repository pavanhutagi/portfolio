"use client";

import clsx from "clsx";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import { useAppContext } from "@/context/app-context";
import { useAudioPlayer } from "@/hooks/audio-player";
import { useIdleVisibility } from "@/hooks/idle-visibility";

export default function AudioControl() {
  const isVisible = useIdleVisibility();
  const { isChatOpen } = useAppContext();
  const { isPlaying, togglePlay } = useAudioPlayer({
    audioUrl: "/music/background-music.mp3",
  });

  return (
    <div className="z-10">
      <button
        onClick={togglePlay}
        className={clsx(
          "fixed flex items-center justify-center rounded-full transition-all duration-300",

          "border border-primary-500/40 bg-secondary-900/80 backdrop-blur-md",
          "text-primary-400",
          "hover:border-primary-500 hover:glow-cyan hover:text-primary-300",

          "bottom-6 left-6 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10",

          "w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]",
          "p-2 sm:p-2.5 lg:p-3",

          isVisible ? "translate-x-0" : "-translate-x-40",
          isChatOpen && "max-sm:-translate-x-40!"
        )}
      >
        {isPlaying ? <FaVolumeUp className="h-5 w-5" /> : <FaVolumeMute className="h-5 w-5" />}
      </button>
    </div>
  );
}
