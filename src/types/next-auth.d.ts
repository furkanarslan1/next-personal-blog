import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

//Here we expand the NextAuth types
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role?: string; // Role area in the Prisma model
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
