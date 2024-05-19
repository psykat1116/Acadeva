import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-4">
      <Image height={30} width={30} alt="logo" src={"/logo.svg"} />
      <span className="text-[28px] font-bold text-[#0369a1]">Acadeva</span>
    </div>
  );
};

export default Logo;
