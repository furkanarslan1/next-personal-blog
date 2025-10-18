import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const prisma = new PrismaClient();

export default {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Kullanıcıyı bul
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          throw new Error("User not found");
        }

        // Şifre kontrolü
        const isValid = await compare(
          credentials.password as string,
          user.password as string
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user; // giriş başarılı
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 days
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    // signIn: "auth/signin",
    // signOut: "auth/signout",
    // error: "/auth/error",
    // verifyRequest: "/auth/verify-request",
    // newUser: null,
  },
} satisfies NextAuthConfig;
