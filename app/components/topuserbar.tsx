"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopNavbar from "./animatedBar";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";

export default function TopUserBar() {
  const [showLogout, setShowLogout] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const { user, signOut } = UserAuth();

  // Protected route check
  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else {
      setUserEmail(user.email);
    }
  }, [user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex justify-between items-center px-6 py-6 relative">
      {/* Left: Muze Text */}
      <span className="text-white text-xl font-regular font-inter">MUZE</span>

      {/* Center: Navbar */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <TopNavbar />
      </div>

      {/* Right: Session Info & Profile */}
      <div className="flex space-x-4 items-center relative">
        {user && (
          <span className="text-white font-light">Welcome, {userEmail}</span>
        )}

        {/* Profile Image with Logout Button */}
        <div
          className="relative group"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          {/* Default profile icon since we don't have photo URLs from backend */}
          <div
            className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer flex items-center justify-center"
            onClick={handleSignOut}
          >
            <span className="text-white text-sm font-bold">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
            </span>
          </div>

          {/* Logout Button (Appears on Hover) */}
          {showLogout && (
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded-md shadow-md cursor-pointer hover:bg-red-600 transition">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}