"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/supabase/client";

export default function AuthCallback() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function handleAuthCallback() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth error:", error);
        return;
      }

      if (data?.session) {
        // Redirect to dashboard after successful authentication
        router.replace("/dashboard");
      } else {
        // Redirect to login if no session
        router.replace("/");
      }
    }

    handleAuthCallback();
  }, [router, supabase]);

  return <div>Loading...</div>;
}
