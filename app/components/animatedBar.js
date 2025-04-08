"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const cn = clsx;

const tabs = [
  {
    name: "Muze AI",
    icon: <Icon icon="mingcute:ai-line" width="24" height="24" />,
    path: "/dashboard",  // Home path
  },
  {
    name: "Muzz Matrix",
    icon: <Icon icon="material-symbols:graph-3" width="24" height="24" />,
    path: "/matrix",  // Matrix path
  },
  {
    name: "Nemos",
    icon: <Icon icon="hugeicons:canvas" width="24" height="24" />,
    path: "/nemos",  // Nemos path
  },
];

export default function TopNavbar() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  
  // Set the initial tab based on the current path
  useEffect(() => {
    const path = window.location.pathname;
    const tabIndex = tabs.findIndex(tab => path.includes(tab.path));
    if (tabIndex !== -1) {
      setSelectedTab(tabIndex);
    }
  }, []);

  const handleTabClick = (index) => {
    setSelectedTab(index);
    router.push(tabs[index].path);
  };

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
            onClick={() => handleTabClick(index)}
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