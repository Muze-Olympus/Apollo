import { type NextRequest } from "next/server"
import { updateSession } from "./app/supabase/middleware"
 
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
 
export const config = {
    // //*: zero or more paths
// // + : one or more paths
// // ?: zero or one path
//   matcher: ["/dashboard/:path*"],
  matcher: ["/protected", "/signin", "/admin/:path*"],
}