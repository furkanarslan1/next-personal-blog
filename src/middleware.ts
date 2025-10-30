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

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  console.log("--- MIDDLEWARE DEBUG BAŞLANGIÇ ---");
  console.log("URL:", request.url);
  console.log("JWT TOKEN:", token); // Eğer null ise sorun burada
  console.log(
    "AUTH_SECRET OKUNUYOR MU? (Uzunluk):",
    process.env.AUTH_SECRET?.length
  );
  console.log("--- MIDDLEWARE DEBUG BİTİŞ ---");

  // Not logged in user
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // user isn't admin
  if (token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // İf user is Admin
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
