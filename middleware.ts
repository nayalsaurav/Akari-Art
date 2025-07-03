import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        console.log("The token is ", token);
        // Allow unauthenticated access to these paths
        if (
          pathname.startsWith("/api/auth/*") ||
          pathname === "/signin" ||
          pathname === "/"
        ) {
          return true;
        }

        const isAuthorized = !!token;
        if (!isAuthorized) console.warn(`Unauthorized access to ${pathname}`);
        console.log("is Authorized : ", isAuthorized);
        return isAuthorized;
      },
    },
  }
);

export const config = {
  matcher: [
    // Protect all routes except static files and public assets
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
