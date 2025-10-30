// export { auth as middleware } from "@/auth";

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     secret: process.env.AUTH_SECRET,
//   });
//   if (!token) {
//     return NextResponse.redirect(new URL("login", request.url));
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// ***************  asıl kullandığım************
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     // secret: process.env.AUTH_SECRET,
//   });

//   // Not logged in user
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // user isn't admin
//   if (token.role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // İf user is Admin
//   return NextResponse.next();
// }
// *************************************************************************

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//     // secret: process.env.AUTH_SECRET,
//   });

//   // Not logged in user
//   if (!token) {
//     return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
//   }

//   // user isn't admin
//   if (typeof token.role !== "string" || token.role !== "ADMIN") {
//     return NextResponse.redirect(new URL("/", request.nextUrl.origin));
//   }

//   // İf user is Admin
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };

// src/middleware.ts
// src/middleware.ts - Vercel Edge Limitini Aşmak İçin Minimal Versiyon

// src/middleware.ts - Vercel Edge Limitini Aşmak İçin Minimal Versiyon

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get("authjs.session-token") ||
    request.cookies.get("__Secure-authjs.session-token");

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute && !sessionToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  if (request.nextUrl.pathname === "/login" && sessionToken) {
    return NextResponse.redirect(
      new URL("/admin/blogs", request.nextUrl.origin)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
