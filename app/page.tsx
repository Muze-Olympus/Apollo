"use client";

import "./globals.css";
import Image from "next/image";
import {UserAuth} from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  //firebase
  const {  user, signInWithGoogle} = UserAuth();
  const router = useRouter();
  const [userSession, setUserSession] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserSession(sessionStorage.getItem("user"));
    }
  }, []);
  
  const handleSignIn = async () => {
   await signInWithGoogle();
  };

  useEffect(() => {
    if (user||userSession) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#252424]">
      {/* Top Row */}
      <div className="flex justify-between items-center py-4 px-12">
      <Image src="/assets/logo.png" alt="Logo" width={70} height={70} />
        <div className="flex space-x-8">
        <button onClick={handleSignIn} className="text-white">Login</button >
          <div className="flex items-center space-x-2"> <span className="italic text-white text-xs font-light ">Don’t have an account?</span>   {<button  onClick={handleSignIn} className="text-white">SignUp</button >}
          </div>
        </div>
      </div>
      
      {/* Centered Image */}
      <div className="flex justify-center items-center flex-grow">
        {/* <img src="/assets/images/auth_screen.svg" alt="Centered Image" className="w-full px-12" /> */}
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
    </div>
  );
}
