"use client";

import { useAppContext } from "@/context/app-context";

export default function LeftNeonBulb() {
  const { isLeftNeonBulbLit, setIsLeftNeonBulbLit } = useAppContext();

  return (
    <div>
      <div className="fixed inset-x-0 top-0 flex h-[20px] w-full justify-center z-50 sm:fixed sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:h-auto sm:w-[20px]">
        <div
          onClick={() => setIsLeftNeonBulbLit(!isLeftNeonBulbLit)}
          className={`h-full w-[200px] cursor-pointer rounded-b-full sm:h-[300px] sm:w-full sm:rounded-b-none sm:rounded-r-full
            ${
              isLeftNeonBulbLit
                ? "bg-primary-500 shadow-[0_0_40px_theme(colors.primary.600),0_0_120px_theme(colors.primary.700)] hover:bg-primary-400"
                : "bg-primary-700 hover:bg-primary-600"
            }
          `}
        />
      </div>
    </div>
  );
}
