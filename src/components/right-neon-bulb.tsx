"use client";

import { useAppContext } from "@/context/app-context";

export default function RightNeonBulb() {
  const { isRightNeonBulbLit, setIsRightNeonBulbLit } = useAppContext();

  return (
    <div>
      <div className="fixed inset-x-0 bottom-0 flex h-[20px] w-full justify-center z-50 sm:fixed sm:right-0 sm:left-auto sm:top-0 sm:bottom-0 sm:h-full sm:w-[20px] sm:items-center">
        <div
          onClick={() => setIsRightNeonBulbLit(!isRightNeonBulbLit)}
          className={`h-full w-[200px] cursor-pointer rounded-t-full sm:h-[300px] sm:w-full sm:rounded-none sm:rounded-tl-full sm:rounded-bl-full
            ${
              isRightNeonBulbLit
                ? "bg-primary-500 shadow-[0_0_40px_theme(colors.primary.600),0_0_120px_theme(colors.primary.700)] hover:bg-primary-400"
                : "bg-primary-700 hover:bg-primary-600"
            }
          `}
        />
      </div>
    </div>
  );
}
