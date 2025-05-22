import { type NextRequest, NextResponse } from "next/server";

// Determine if we're in development mode
const isDev = process.env.NODE_ENV === "development";

export default function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of paths that do not require authentication
  const publicPaths = ["/login", "/forgot-password", "/otp", "/reset-password", "/sign-up"];

  // Allow API authentication endpoints without session validation
  const apiAuthPaths = ["/api/auth/", "/api/auth/**"];

  // Skip middleware for public paths or API authentication paths
  if (
    publicPaths.some((path) => pathname.startsWith(path)) ||
    apiAuthPaths.some((path) => pathname.startsWith(path.replace("**", "")))
  ) {
    return NextResponse.next(); // No session validation for these paths
  }

  // Get all cookies from the request
  const cookies = request.cookies;

  // Look for any session-related cookie that might indicate authentication
  // This is a more lenient approach that works with various auth configurations
  const hasSessionCookie = Array.from(cookies.getAll()).some(
    (cookie) =>
      cookie.name.includes("session") ||
      cookie.name.includes("token") ||
      cookie.name.includes("auth"),
  );

  // In development, log the cookies to help with debugging
  if (isDev) {
    // console.log('Available cookies:', Array.from(cookies.getAll()).map(c => c.name));
    // console.log('Session cookie detected:', hasSessionCookie);
  }

  // Check for authentication
  if (!hasSessionCookie) {
    // Always allow access in development mode if needed
    if (isDev && process.env.BYPASS_AUTH === "true") {
      // console.log('Auth bypassed in development mode');
      return NextResponse.next();
    }

    // Otherwise redirect to login
    if (!pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
