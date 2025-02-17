import "../globals.css";
import TopNavbar from "../components/topnavbar";
import { Icon } from "@iconify/react";

export default function HomePage() {
  return (
    <>
      {/* Noise Effect Gradient Background */}
      <div className="noise-bg "></div>
      <div className="bg-container"></div>
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-2 relative">
        {/* Left: Muze Text */}
        <span className="text-white text-xl font-regular font-inter">
          MUZE
        </span>

        {/* Center: Navbar */}
        <TopNavbar />

        {/* Right: Circle */}
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </div>

            {/* Title Section */}
            <div className="text-left mt-6 ml-12">
        <h1 className="text-3xl ">
          <span className="text-[#EFB839] font-inknut">Rediscover</span>
          <span className=" text-white italic"> your saved </span>
          <span className="text-[#EFB839] font-inknut"> MUZZs</span>
          <br />
          <span className=" text-white italic">or add more</span>
        </h1>
      </div>

    {/* Gradient TextField */}
<div className="flex justify-left mt-6 ml-12">
  <div className="relative">
    {/* Outer Stroke (Border) */}
    <div className="absolute inset-0 rounded-lg p-[4px] bg-gradient-to-bl from-[#FFDA44] via-[#7C3C0C] to-yellow-400 blur-[3px]  translate-x-[-2px] translate-y-[-1.5px] scale-y-[0.97]"></div>
    
    {/* Textarea */}
    <textarea
      placeholder="what can I help you with?"
      className="relative w-[700px] h-[120px] bg-[#1f1f1f] text-white/70  px-4 py-3 rounded-lg outline-none border-none placeholder-shown:text-start placeholder:text-white/20 placeholder:font-light"
    />
  </div>

  
</div>
  {/* Icons Section */}
  <div className="flex items-center gap-6 mt-4 ml-12 text-gray-300 text-[12px]">
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
      <Icon icon="ion:document-outline" width="18" height="18" color="#14AE5C"/> <span>upload doc</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
    <Icon icon="hugeicons:note-done" width="18" height="18" color="#F24822"/>  <span>add note</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
    <Icon icon="mdi:web" width="18" height="18" color="#0D99FF"/>  <span>add web URL</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
    <Icon icon="line-md:twitter" width="18" height="18" color="#0D99FF"/>  <span>add tweet</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:text-white">
      ⋮ <span>more</span>
    </div>
  </div>
    </>
  );
}
