"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import TopNavbar from "./animatedBar";
import { useRouter } from "next/navigation";
import { createClient } from "../supabase/client";
import { User } from "@supabase/supabase-js";

export default function TopUserBar() {
  const [showLogout, setShowLogout] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
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
          <span className="text-white font-light">Welcome, {user?.email}</span>
        )}

        {/* Profile Image with Logout Button */}
        <div
          className="relative group"
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          {user?.user_metadata?.avatar_url ? (
            <Image
              src={user.user_metadata.avatar_url}
              alt="User Profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              onClick={handleLogout}
            />
          ) : (
            <div
              className="w-8 h-8 bg-gray-400 rounded-full cursor-pointer"
              onClick={handleLogout}
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
