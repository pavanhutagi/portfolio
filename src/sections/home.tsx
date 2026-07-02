"use client";

import clsx from "clsx";

import { useAppContext } from "@/context/app-context";

export default function HomeSection() {
  const { isLeftNeonBulbLit, isRightNeonBulbLit } = useAppContext();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--xPos", `${x}%`);
    e.currentTarget.style.setProperty("--yPos", `${y}%`);
  };

  // Tagline accent responds to the neon bulbs
  const taglineBorder = () => {
    if (isLeftNeonBulbLit && isRightNeonBulbLit) return "border-accent-500 glow-magenta";
    if (isLeftNeonBulbLit) return "border-primary-500 glow-cyan";
    if (isRightNeonBulbLit) return "border-accent-500 glow-magenta";
    return "border-secondary-400/60";
  };

  return (
    <section
      id="home"
      className={clsx(
        "relative flex min-h-screen flex-col items-center justify-center text-center",
        "gap-6 sm:gap-8 px-6"
      )}
    >
      {/* Status line */}
      <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-primary-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-500 animate-neon-breathe" />
        <span>System Online</span>
        <span className="text-secondary-400">//</span>
        <span className="text-accent-400">Bengaluru, IN</span>
      </div>

      {/* Glitch name */}
      <div className="flex flex-col items-center gap-2">
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.5em] text-text-secondaryDark">
          Hi, I'm
        </p>
        <h1
          data-text="PAVAN HUTAGI"
          className={clsx(
            "glitch neon-cyan font-display font-black uppercase leading-none",
            "text-4xl sm:text-6xl md:text-7xl lg:text-8xl",
            "tracking-tight"
          )}
        >
          PAVAN HUTAGI
        </h1>
      </div>

      {/* Role chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
        {["Frontend Engineer", "Architect", "Designer", "DJ"].map((role, i) => (
          <span
            key={role}
            className={clsx(
              "clip-corner-sm border px-3 py-1.5",
              i % 2 === 0
                ? "border-primary-500/50 text-primary-300"
                : "border-accent-500/50 text-accent-300"
            )}
          >
            {role}
          </span>
        ))}
      </div>

      {/* Tagline card with cursor-follow glow */}
      <div
        className={clsx(
          "group relative mt-2 max-w-2xl cursor-default overflow-hidden clip-corner",
          "border bg-secondary-800/60 backdrop-blur-sm",
          "px-5 py-4 md:px-7 md:py-5",
          "transition-all duration-300",
          taglineBorder()
        )}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--xPos, 50%) var(--yPos, 50%), rgba(0,229,255,0.18), transparent 70%)",
          }}
        />
        <p className="relative z-10 text-sm sm:text-lg md:text-xl text-text-primaryDark">
          I turn ideas into reality — in <span className="text-primary-400">code</span>,{" "}
          <span className="text-accent-400">design</span>, and on the{" "}
          <span className="text-primary-400">dance floor</span>.
        </p>
      </div>

      {/* Scroll cue */}
      <div className="mt-2 flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-text-secondaryDark">
        <span>Scroll to decrypt</span>
        <span className="animate-neon-breathe text-primary-500">▼</span>
      </div>
    </section>
  );
}
