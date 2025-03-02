"use client";

import { useState, useEffect } from "react";
import { useSearchParams, } from "next/navigation";
import { createClient } from "@/app/supabase/client";
import { toast } from "react-hot-toast";
import { Icon } from "@iconify/react";
import Button from "../components/button";

export default function SignInPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const supabase = createClient();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const getRedirectUrl = () => {
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_SITE_URL;
    }
    return process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
  };
  
  // In your signInWithGoogle function:
  const redirectTo = `${getRedirectUrl()}/auth/callback${
    next ? `?next=${encodeURIComponent(next)}` : ""
  }`;

  async function signInWithGoogle() {
    setIsGoogleLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo,
        },
      });

      if (error) throw error;
      if (!data) throw new Error("Google sign-in failed.");

      toast.success("Successfully signed in! Redirecting...");
    } catch (error) {
      toast.error("Login failed! Please try again.");
      setIsGoogleLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen noise-bg">   
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg max-w-sm w-full text-center border border-white/20">
        <h1 className="text-2xl font-semibold text-white">Welcome Back!</h1>
        <p className="text-gray-300 mt-2">Sign in to continue</p>

        <Button
          type="button"
          onClick={signInWithGoogle}
          disabled={isGoogleLoading}
          className="mt-6 w-full bg-white/20 hover:bg-white/30 transition duration-300 text-white font-semibold py-3 rounded-xl flex items-center justify-center"
        >
          {isGoogleLoading ? (
            <Icon icon="line-md:loading-loop" className="mr-2 size-6 animate-spin" />
          ) : (
            <Icon icon="flat-color-icons:google" className="mr-2 size-6" />
          )}
          Sign in with Google
        </Button>

        <p className="text-sm text-gray-400 mt-4">
          By signing in, you agree to our{" "}
          <a href="/terms" className="underline hover:text-gray-300 transition">
            Terms & Conditions
          </a>
        </p>
      </div>
    </div>
  );
}
