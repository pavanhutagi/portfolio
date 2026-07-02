"use client";

import clsx from "clsx";

import { useAppContext } from "@/context/app-context";

export default function RightNeonBulb() {
  const { isRightNeonBulbLit, setIsRightNeonBulbLit } = useAppContext();

  const containerClasses = clsx(
    "fixed inset-x-0 bottom-0",
    "flex h-[20px] w-full justify-center z-50",
    "md:right-0 md:left-auto md:top-0 md:bottom-0 md:h-full md:w-[20px] md:items-center"
  );

  const bulbClasses = clsx(
    // Base styles
    "h-full w-[200px] cursor-pointer rounded-t-full",
    "md:h-[300px] md:w-full md:rounded-none md:rounded-tl-full md:rounded-bl-full",

    // Conditional styles based on lit state
    isRightNeonBulbLit
      ? "bg-accent-500 shadow-[0_0_40px_var(--color-accent-500),0_0_120px_var(--color-accent-600)] hover:bg-accent-400"
      : "bg-accent-900/70 hover:bg-accent-700"
  );

  return (
    <div>
      <div className={containerClasses}>
        <div onClick={() => setIsRightNeonBulbLit(!isRightNeonBulbLit)} className={bulbClasses} />
      </div>
    </div>
  );
}
