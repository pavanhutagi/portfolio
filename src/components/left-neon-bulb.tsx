"use client";

import clsx from "clsx";

import { useAppContext } from "@/context/app-context";

export default function LeftNeonBulb() {
  const { isLeftNeonBulbLit, setIsLeftNeonBulbLit } = useAppContext();

  return (
    <div>
      <div
        className={clsx(
          // Position and layout
          "fixed inset-x-0 top-0 flex h-[20px] w-full justify-center z-50",
          // Responsive adjustments
          "md:left-0 md:top-1/2 md:-translate-y-1/2 md:h-auto md:w-[20px]"
        )}
      >
        <div
          onClick={() => setIsLeftNeonBulbLit(!isLeftNeonBulbLit)}
          className={clsx(
            // Base styles
            "h-full w-[200px] cursor-pointer rounded-b-full",
            // Responsive styles
            "md:h-[300px] md:w-full md:rounded-tr-full md:rounded-br-full md:rounded-bl-none",
            // Conditional styles based on state
            isLeftNeonBulbLit
              ? [
                  "bg-primary-500",
                  "shadow-[0_0_40px_var(--color-primary-600),0_0_120px_var(--color-primary-700)]",
                  "hover:bg-primary-400",
                ]
              : ["bg-primary-700", "hover:bg-primary-600"]
          )}
        />
      </div>
    </div>
  );
}
