// import { AuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import prismadb from "./prisma";
// import bcrypt from "bcrypt";

// export const authOptions: AuthOptions = {
//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Missing credentials");
//         }

//         const user = await prismadb.user.findFirst({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user.id || !user.Password) {
//           throw new Error("Invalid credentials");
//         }

//         const correctPassword = await bcrypt.compare(
//           credentials.password,
//           user.Password
//         );

//         if (!correctPassword) {
//           throw new Error("Invalid credentials");
//         }

//         return user;
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/login",
//   },
//   debug: process.env.NODE_ENV !== "production",
// };
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
    };
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

        console.log("Authorized User:", user); // Log the authorized user
        return { id: user.id, name: user.name, email: user.email }; // Include user ID
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
      console.log("Session Token:", token); // Log the session token
      if (token && session.user) {
        session.user.id = token.id as string; // Add user ID to session
      }
      console.log("Session User:", session.user); // Log the session user
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to token
      }
      console.log("JWT Token:", token); // Log the JWT token
      return token;
    },
  },
};
