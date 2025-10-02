"use client";

import "./globals.css";
import Image from "next/image";
import { UserAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModal";

export default function Home() {
  const { user } = UserAuth();
  const router = useRouter();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  
  const handleLogin = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setShowAuthModal(true);
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#252424]">
      {/* Top Row */}
      <div className="flex justify-between items-center py-4 px-12">
        <Image src="/assets/logo.png" alt="Logo" width={70} height={70} />
        <div className="flex space-x-8">
          <button onClick={handleLogin} className="text-white">Login</button>
          <div className="flex items-center space-x-2"> 
          <span className="italic text-white text-xs font-light">Don&#39;t have an account?</span>
            <button onClick={handleSignUp} className="text-white">SignUp</button>
          </div>
        </div>
      </div>
      
      {/* Centered Image */}
      <div className="flex justify-center items-center flex-grow">
        <Image
          src="/assets/images/auth_screen.svg"
          alt="Centered Image"
          width={800} 
          height={600}
          className="w-full px-12"
        />
      </div>
      
      {/* Bottom Row */}
      <div className="flex justify-between items-center py-4 px-12">
        <button className="text-white">Privacy Policy</button>
        <button className="text-white">Contact Us</button>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onToggleMode={toggleAuthMode}
      />
    </div>
  );
}