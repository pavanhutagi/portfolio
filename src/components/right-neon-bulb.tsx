"use client";

import { useAppContext } from "@/context/app-context";

export default function RightNeonBulb() {
  const { isRightNeonBulbLit, setIsRightNeonBulbLit } = useAppContext();

  return (
    <div>
      <div className="fixed inset-x-0 bottom-0 flex h-[20px] w-full justify-center z-50 md:right-0 md:left-auto md:top-0 md:bottom-0 md:h-full md:w-[20px] md:items-center">
        <div
          onClick={() => setIsRightNeonBulbLit(!isRightNeonBulbLit)}
          className={`h-full w-[200px] cursor-pointer rounded-t-full md:h-[300px] md:w-full md:rounded-none md:rounded-tl-full md:rounded-bl-full
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
