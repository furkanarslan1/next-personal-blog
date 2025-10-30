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

// export const config = {
//   matcher: ["/admin/:path*"],
// };

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    // secret: process.env.AUTH_SECRET,
  });

  // Not logged in user
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
  }

  // user isn't admin
  if (typeof token.role !== "string" || token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  // İf user is Admin
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
