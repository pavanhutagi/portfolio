"use client";

import { useAppContext } from "@/context/app-context";

export default function LeftNeonBulb() {
  const { isLeftNeonBulbLit, setIsLeftNeonBulbLit } = useAppContext();

  return (
    <div className="invisible opacity-0 transition-all duration-300 md:visible md:opacity-100">
      <div className="fixed inset-y-0 left-0 flex w-[20px] items-center">
        <div
          onClick={() => setIsLeftNeonBulbLit(!isLeftNeonBulbLit)}
          className={`h-[300px] w-full cursor-pointer rounded-r-full transition-all duration-300
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
