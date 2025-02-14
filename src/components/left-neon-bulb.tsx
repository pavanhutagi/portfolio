"use client";

import { useState } from "react";

export default function LeftNeonBulb() {
  const [isLit, setIsLit] = useState(false);

  return (
    <div className="fixed inset-y-0 left-0 w-[25px] flex items-center">
      <div
        onClick={() => setIsLit(!isLit)}
        className={`
        w-full 
        h-[300px] 
        rounded-r-full 
        cursor-pointer
        transition-all
        duration-300
        ${
          isLit
            ? "bg-[#dc2828] shadow-[0_0_40px_#c64e4c,0_0_120px_#c22422] hover:bg-[#ff4837]"
            : "bg-[#90403d] hover:bg-[#b6514d]"
        }
      `}
      />
    </div>
  );
}
