"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import TopUserBar from "../components/topuserbar";
import Image from "next/image";
import type { Network } from "vis-network";

interface PreviewData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const previewCache = new Map<string, PreviewData>();

const fetchPreview = async (url: string) => {
  try {
    console.log(`Fetching preview for: ${url}`);

    // Return from cache if exists
    if (previewCache.has(url)) {
      console.log("Returning from cache");
      return previewCache.get(url);
    }

    // First try from local API
    const res = await fetch(`http://localhost:3000/api/preview?url=${encodeURIComponent(url)}`);
    const json = await res.json();

    const data = json?.data;
    let title = data?.title || "";
    let description = data?.description || "";
    let image = data?.images?.[0];
    let resolvedUrl = data?.url || url;

    // If title or description is missing, fallback to Microlink
    if (!title || !description) {
      const fallbackRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
      const fallbackJson = await fallbackRes.json();

      if (fallbackJson.status === "success" && fallbackJson.data) {
        const fallbackData = fallbackJson.data;
        title = title || fallbackData.title;
        description = description || fallbackData.description;
        image = image || fallbackData.image?.url;
        resolvedUrl = fallbackData.url || resolvedUrl;
      }
    }

    const previewData = {
      title: title || "We are on it",
      description: description || "Preview unavailable",
      image: image || "/assets/images/no_preview.webp",
      url: resolvedUrl,
    };

    // Store in cache
    previewCache.set(url, previewData);

    return previewData;

  } catch (error) {
    console.error("Error fetching preview:", error);
    return null;
  }
};

// Sample dataset for the graph
const sampleData = {
  nodes: [
    {
      id: 1,
      label: "",
      image: "https://pbs.twimg.com/profile_images/1894670840433934336/NZU2KfZ1_400x400.jpg",
      shape: "circularImage",
      fixed: { x: true, y: true },
      physics: false,
      size: 30,
    },
    { id: 2, label: "Gym", shape: "dot" },
    { id: 3, label: "Dev", shape: "dot" },
    { id: 4, label: "Guitar", shape: "dot" },
    { id: 5, label: "Diet", shape: "dot" },
    { id: 6, label: "Workout Plan", shape: "dot" },
    { id: 7, label: "Flutter", shape: "dot" },
    { id: 8, label: "AI", shape: "dot" },
    { id: 9, label: "Chords", shape: "dot" },
    { id: 10, label: "Songs", shape: "dot" },
    {
      id: 11,
      label: "Background Upload",
      image: "https://findingtom.com/images/uploads/medium-logo/article-image-00.jpeg",
      shape: "circularImage",
      url: "https://medium.com/flutter",
    },
    {
      id: 12,
      label: "Clean diet guide",
      image: "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg",
      shape: "circularImage",
      url: "https://x.com/CoachPauI/status/1702470989991313627",
    },
    {
      id: 13,
      label: "Getting Lean",
      image: "https://goodly.co.in/wp-content/uploads/2023/10/youtube-logo-png-46016-1.png",
      shape: "circularImage",
      url: "https://www.youtube.com/watch?v=9Mfh_UYdo9k",
    },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 2, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 7 },
    { from: 3, to: 8 },
    { from: 4, to: 9 },
    { from: 4, to: 10 },
    { from: 7, to: 11 },
    { from: 5, to: 12 },
    { from: 6, to: 13 },
  ],
};

// Graph component
function VisNetworkGraph() {
  const graphRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);
  const [hoveredNode, setHoveredNode] = useState<{
    title: string;
    image: string;
    description: string;
    url: string;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    const initializeNetwork = async () => {
      if (graphRef.current) {
        const { Network } = await import("vis-network/standalone");
  
        networkRef.current = new Network(graphRef.current, sampleData, {
          nodes: {
            shape: "dot",
            size: 20,
            font: { color: "#ffffff" },
            color: { background: "#D57489", border: "#ffffff" },
          },
          edges: { color: "#ffffff", arrows: { to: { enabled: false } } },
          physics: { stabilization: true },
          interaction: {
            hover: true,
            tooltipDelay: 0,
            zoomView: true,
            zoomSpeed: 0.2,
          },
        });
  
        // Handle hover behavior
        networkRef.current.on("hoverNode", async (params: { node: number }) => {
          const node = sampleData.nodes.find((n) => n.id === params.node);
          if (node?.url) {
            const preview = await fetchPreview(node.url);
            console.log(preview);
  
            const position = networkRef.current?.getPositions([params.node])[params.node];
            if (position && networkRef.current) {
              const canvasPosition = networkRef.current.canvasToDOM(position);
  
              setHoveredNode(
                preview
                  ? {
                      ...preview,
                      url: node.url,
                      x: canvasPosition.x + 20,
                      y: canvasPosition.y - 40,
                    }
                  : null
              );
            }
          }
        });
  
        // Handle blur behavior
        networkRef.current.on("blurNode", () => {
          setHoveredNode(null);
        });
  
        // Handle click event to open URL
        networkRef.current.on("click", (params: { nodes: number[] }) => {
          if (params.nodes.length > 0) {
            const node = sampleData.nodes.find((n) => n.id === params.nodes[0]);
            if (node?.url) {
              window.open(node.url, "_blank");
            }
          }
        });

        networkRef.current.once("stabilizationIterationsDone", () => {
          networkRef.current?.setOptions({
            physics: false,
          });
        });
      }
    };
  
    initializeNetwork();
  }, []);
  
  const resetCenterNode = () => {
    if (networkRef.current) {
      networkRef.current.moveTo({ position: { x: 0, y: 0 }, scale: 1 });
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-10">
      {/* Graph Container */}
      <div ref={graphRef} className="w-full h-full"></div>

      {/* Hovered Node Preview */}
      {hoveredNode && (
        <div
          className="absolute bg-gray-900 text-white p-2 rounded-lg shadow-lg w-64"
          style={{
            top: `${hoveredNode.y}px`,
            left: `${hoveredNode.x}px`,
            transform: "translate(-50%, -100%)", 
          }}
        >
          <Image
            src={hoveredNode.image}
            alt={hoveredNode.title}
            width={256}
            height={128}
            className="w-full h-32 object-cover rounded-md"
            unoptimized
          />
          <div className="mt-1">
            <h3 className="font-bold text-sm">{hoveredNode.title}</h3>
            <p className="text-xs text-gray-400">{hoveredNode.description}</p>
          </div>
        </div>
      )}

      {/* Reset Position Button */}
      <button
        onClick={resetCenterNode}
        className="absolute bottom-4 left-4 bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg"
      >
        Reset Position
      </button>
    </div>
  );
}

// Dynamic import to ensure no server-side rendering (Next.js dynamic import)
const DynamicVisNetworkGraph = dynamic(() => Promise.resolve(VisNetworkGraph), { ssr: false });

// Main Component
export default function VisGraph() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-0 left-0 w-screen h-screen z-0 noise-bg"></div>
      <div className="absolute top-0 left-0 w-screen h-screen z-20 graph-container">
        <DynamicVisNetworkGraph />
      </div>
      <div className="relative z-30 navbar mx-2">
        <TopUserBar />
      </div>
    </div>
  );
}