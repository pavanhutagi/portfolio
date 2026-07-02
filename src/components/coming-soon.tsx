import { useEffect, useState } from "react";

import clsx from "clsx";

export default function ComingSoon() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={clsx(
        "flex w-full flex-1 flex-col items-center justify-center gap-6 p-8",
        "transition-opacity duration-500",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={clsx(
          "relative flex flex-col items-center gap-4 clip-corner",
          "border border-accent-500/40 bg-secondary-800/60 px-10 py-8 text-center",
          "glow-magenta"
        )}
      >
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary-400">
          status: encrypted
        </span>
        <h1 className="font-display text-2xl font-black uppercase tracking-wider">
          <span className="neon-magenta">Coming Soon</span>
        </h1>
        <p className="max-w-xs text-sm text-text-secondaryDark">
          This module is currently under construction. Decryption in progress.
        </p>
        <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-secondary-900">
          <div className="h-full w-1/2 animate-marquee bg-linear-to-r from-primary-500 to-accent-500" />
        </div>
      </div>
    </div>
  );
}
