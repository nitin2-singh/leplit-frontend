import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("auth_token")?.value;

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // 🔓 No token → allow only public routes
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  // ❌ No token → block everything else
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 Token exists → block login/signup
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/projects", req.url));
  }

  // ✅ Token exists → allow all protected routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api routes
     * - static files
     * - images
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
