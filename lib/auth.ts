import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "./prisma";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: "ADMIN" | "EMPLOYEE"; // Add role here
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role: "ADMIN" | "EMPLOYEE"; // Ensure User includes role
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.id || !user.Password) {
          throw new Error("Invalid credentials");
        }

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.Password
        );

        if (!correctPassword) {
          throw new Error("Invalid credentials");
        }

        // console.log("Authorized User:", user);
        return { id: user.id, name: user.name, email: user.email, role: user.role }; // Include user ID
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV !== "production",
  callbacks: {
    async session({ session, token }) {
      // console.log("Session Token:", token);
      if (token && session.user) {
        session.user.id = token.id as string; // Add user ID to session
        session.user.role = token.role as "ADMIN" | "EMPLOYEE";
      }
      // console.log("Session User:", session.user);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      // console.log("JWT Token:", token);
      return token;
    },
  },
};
