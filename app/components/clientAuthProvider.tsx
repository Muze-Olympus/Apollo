// components/ClientAuthProvider.tsx
"use client";

import { AuthContextProvider } from "../context/AuthContext";

export default function ClientAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}