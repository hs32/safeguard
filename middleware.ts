import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/blocked-sites", "/profile"]
const adminRoutes = ["/admin"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute || isAdminRoute) {
    // Check for auth token in cookies or headers
    const token =
      request.cookies.get("auth_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      // Redirect to signin page if no token found
      const url = request.nextUrl.clone()
      url.pathname = "/signin"
      url.searchParams.set("redirect", pathname)
      return NextResponse.redirect(url)
    }

    if (isAdminRoute) {
      // Note: In a real app, you'd decode the JWT to check the role
      // For now, we'll handle this client-side in the admin page
      // The admin page will check the role and redirect if not admin
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/blocked-sites/:path*", "/profile/:path*", "/admin/:path*"],
}
