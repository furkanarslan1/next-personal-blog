import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { prisma } from "@lib/prisma";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "Credentials", //it doens't required

      //Define the fields you expect from the user
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },

      //Authentication logic
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        //get e-mail and password
        const email = credentials.email as string;
        const password = credentials.password as string;

        //for database
        //user find
        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            hashedPassword: true,
          },
        });

        //unless user find
        console.log("User not found");
        if (!user) return null;

        const isPasswordValid = await compare(password, user.hashedPassword);

        if (!isPasswordValid) {
          console.log("Parola geçersiz.");
          return null; // Kimlik doğrulama başarısız
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          //.. the others
        };
      },
    }),
  ],
});
