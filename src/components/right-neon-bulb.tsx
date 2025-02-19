"use client";

import { useAppContext } from "@/context/app-context";

export default function RightNeonBulb() {
  const { isRightNeonBulbLit, setIsRightNeonBulbLit } = useAppContext();

  return (
    <div className="invisible opacity-0 transition-all duration-300 md:visible md:opacity-100">
      <div className="fixed inset-y-0 right-0 flex w-[20px] items-center">
        <div
          onClick={() => setIsRightNeonBulbLit(!isRightNeonBulbLit)}
          className={`h-[300px] w-full cursor-pointer rounded-l-full transition-all duration-300
            ${
              isRightNeonBulbLit
                ? "bg-[#dc2828] shadow-[0_0_40px_#c64e4c,0_0_120px_#c22422] hover:bg-[#ff4837]"
                : "bg-[#90403d] hover:bg-[#b6514d]"
            }
          `}
        />
      </div>
    </div>
  );
}
