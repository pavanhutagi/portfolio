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

  // Get background class based on neon bulb state
  const getBackgroundClass = () => {
    if (isLeftNeonBulbLit && isRightNeonBulbLit) {
      return "bg-primary-500";
    } else if (isLeftNeonBulbLit) {
      return "bg-gradient-to-b md:bg-gradient-to-r from-primary-500 to-secondary-500";
    } else if (isRightNeonBulbLit) {
      return "bg-gradient-to-t md:bg-gradient-to-l from-primary-500 to-secondary-500";
    } else {
      return "bg-secondary-500";
    }
  };

  return (
    <section
      id="home"
      className={clsx(
        "flex min-h-screen flex-col items-center justify-center text-center",
        "gap-4 sm:gap-6"
      )}
    >
      <h1
        className={clsx(
          "text-text-primary dark:text-text-primaryDark font-extrabold",
          "text-3xl sm:text-4xl md:text-5xl"
        )}
      >
        Hi, I'm Pavan Hutagi
      </h1>

      <div
        className={clsx(
          "group relative cursor-pointer rounded-full text-text-dark",
          "px-3 py-2 md:px-5 md:py-3 w-[70%] lg:w-auto",
          getBackgroundClass()
        )}
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--xPos, 100%) var(--yPos, 100%), #f65454, transparent 75%)",
          }}
        />

        <p className={clsx("text-text-primaryDark relative z-10", "text-sm sm:text-lg md:text-xl")}>
          I love turning ideas into reality - whether in code, design, or on the dance floor.
        </p>
      </div>

      <p className="text-text-secondary dark:text-text-secondaryDark text-sm">
        The portfolio is still under development.
      </p>
    </section>
  );
}
