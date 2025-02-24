"use client";

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

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-center justify-center text-center gap-4 sm:gap-6"
    >
      <h1 className="text-text-light dark:text-text-dark font-extrabold text-3xl sm:text-4xl md:text-5xl">
        Hi, I'm Pavan Hutagi
      </h1>

      <div
        className={`group relative cursor-pointer rounded-full text-text-dark px-3 py-2 md:px-5 md:py-3 w-[70%] sm:w-auto ${
          isLeftNeonBulbLit && isRightNeonBulbLit
            ? "bg-primary-500"
            : isLeftNeonBulbLit
              ? "bg-gradient-to-r from-primary-500 to-secondary-500"
              : isRightNeonBulbLit
                ? "bg-gradient-to-l from-primary-500 to-secondary-500"
                : "bg-secondary-500"
        }`}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--xPos, 100%) var(--yPos, 100%), #ff0000, transparent 75%)",
          }}
        />

        <p className="text-dark-text relative z-10 text-sm sm:text-lg md:text-xl">
          I build modern web solutions & love turning ideas into reality
        </p>
      </div>
    </section>
  );
}
