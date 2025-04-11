"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopNavbar from "./animatedBar";
import { useRouter } from "next/navigation";
import { UserAuth } from "../context/AuthContext";

export default function TopUserBar() {
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();
  const { user, signOutGoogle } = UserAuth();

  // Protected route check - only checks Firebase auth state
  useEffect(() => {
    // Only redirect if there's definitely no authenticated user
    if (user === null) {
      router.replace("/");
    }

  }, [user, router]);

  const handleSignOut = async () => {
    await signOutGoogle();
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
          <span className="text-white font-light">Welcome, {user?.displayName}</span>
        )}

        {/* Profile Image with Logout Button */}
        <div
          className="relative group"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          {user?.photoURL ? (
            <Image
              src={user.photoURL}
              alt="User Profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={handleSignOut}
            />
          ) : (
            <div
              className="w-8 h-8 bg-gray-400 rounded-full cursor-pointer"
              onClick={handleSignOut}
            ></div>
          )}

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