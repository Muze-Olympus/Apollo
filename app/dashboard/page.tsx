"use client";
import "../globals.css";
import { Icon } from "@iconify/react";
import TopUserBar from "../components/topuserbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    console.log("Searching for:", input);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(input)}`);
      const data = await res.json();
      console.log("Search result:", data);
    } catch (err) {
      console.error("Search error:", err);
    }

    setIsLoading(false);
    setInput(""); // Clear input
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <>
      {/* Background */}
      <div className="noise-bg"></div>
      <div className="bg-container"></div>

      {/* Navbar */}
      <TopUserBar />

      {/* Title */}
      <div className="text-left mt-6 ml-12">
        <h1 className="text-3xl">
          <span className="text-[#EFB839] font-inknut">Rediscover</span>
          <span className=" text-white italic"> your saved </span>
          <span className="text-[#EFB839] font-inknut"> MUZZs</span>
          <br />
          <span className=" text-white italic">or add more</span>
        </h1>
      </div>

      {/* TextField Container */}
      <div className="flex justify-left mt-6 ml-12 items-start gap-4">
        <div className="relative w-[700px]">
          {/* Outer Gradient Stroke */}
          <div className="absolute inset-0 rounded-lg p-[4px] bg-gradient-to-bl from-[#FFDA44] via-[#7C3C0C] to-yellow-400 blur-[3px] translate-x-[-2px] translate-y-[-1.5px] scale-y-[0.97] z-0"></div>

          {/* Textarea */}
          <textarea
            placeholder="what can I help you with?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="relative z-10 w-full h-[120px] bg-[#1f1f1f] text-white/70 px-4 py-3 pb-7 rounded-lg outline-none border-none placeholder-shown:text-start placeholder:text-white/20 placeholder:font-light resize-none"
          />

          {/* Enter Button (inside textfield, bottom-right) */}
          {input.trim() !== "" && !isLoading && (
  <button
    onClick={handleSearch}
    className="absolute bottom-4 right-4 z-20"
  >
    <Icon icon="mi:enter" width="25" height="25" className="text-[#8a6f30] hover:text-[#ffc94a]" />
  </button>
)}

        </div>
      </div>

      {/* Icons Row */}
      <div className="flex items-center gap-6 mt-4 ml-12 text-gray-300 text-[12px]">
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Icon icon="ion:document-outline" width="18" height="18" color="#14AE5C" />
          <span>upload doc</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Icon icon="hugeicons:note-done" width="18" height="18" color="#F24822" />
          <span>add note</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Icon icon="mdi:web" width="18" height="18" color="#0D99FF" />
          <span>add web URL</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Icon icon="line-md:twitter" width="18" height="18" color="#0D99FF" />
          <span>add tweet</span>
        </div>
        <div 
          className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => router.push('/graph')}
        >
          <Icon icon="material-symbols:network-node" width="18" height="18" color="#8B5CF6" />
          <span>view graph</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          ⋮ <span>more</span>
        </div>
      </div>

      {/* Search Loader Placeholder */}
      {isLoading && (
        <div className="ml-12 mt-4 text-white text-sm animate-pulse">
          Fetching results...
        </div>
      )}

      {/* Graph Visualization Card */}
      <div className="ml-12 mr-12 mt-8">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer"
             onClick={() => router.push('/graph')}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Resource Graph Visualization</h3>
              <p className="text-gray-300 text-sm mb-4">
                Explore your resources and their relationships in an interactive network graph. 
                Discover connections, dependencies, and optimize your resource organization.
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <span className="flex items-center">
                  <Icon icon="material-symbols:network-node" className="mr-1" />
                  15 Resources
                </span>
                <span className="flex items-center">
                  <Icon icon="material-symbols:link" className="mr-1" />
                  23 Connections
                </span>
                <span className="flex items-center">
                  <Icon icon="material-symbols:category" className="mr-1" />
                  8 Categories
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-purple-400 text-2xl font-bold">Interactive</div>
                <div className="text-gray-400 text-xs">Graph View</div>
              </div>
              <Icon icon="material-symbols:arrow-forward" width="24" height="24" className="text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
