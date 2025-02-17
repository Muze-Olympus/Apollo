"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Icon } from "@iconify/react";

const cn = clsx;

const tabs = [
  {
    name: "Muze AI",
    icon: <Icon icon="mingcute:ai-line" width="24" height="24" />,
  },
  {
    name: "Muzz Matrix",
    icon: <Icon icon="material-symbols:graph-3" width="24" height="24" />,
  },
  {
    name: "Nemos",
    icon: <Icon icon="hugeicons:canvas" width="24" height="24" />,
  },
];

export default function TopNavbar() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex justify-center p-4">
      <div className="relative flex items-center space-x-8 bg-[#1F1F1F]/50 backdrop-blur-lg p-1 rounded-xl shadow-md shadow-white/40">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "relative px-6 py-3 flex items-center space-x-2 text-white text-sm font-regular transition-all font-inter",
              selectedTab === index ? "opacity-100" : "opacity-50"
            )}
            onClick={() => setSelectedTab(index)}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
        <motion.div
          className="absolute top-0 h-[2px] w-[40px] rounded-full bg-white"
          layoutId="underline"
          initial={false}
          animate={{
            left: `calc(${selectedTab * 38}% + ${selectedTab !== 2 ? 5 : 2}%)`,
            // Adjust for proper centering
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
}
