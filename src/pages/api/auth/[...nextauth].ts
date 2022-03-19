import type { Session } from "./types";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      // @ts-ignore
      clientId: process.env.GOOGLE_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    // @ts-ignore
    session: async ({ session, user }: { session: Session; user: User }) => {
      session.user = { name: user.name, image: user.image, username: user.username };
      return session;
    },
  },

  events: {
    createUser: async ({ user }) => {
      if (user.name) {
        const randomId = Math.random().toString(36).substr(2, 6);
        await prisma.user.update({
          where: { id: user.id },
          data: { username: user.name.toLowerCase().split(" ").concat(randomId).join("-") },
        });
      }
    },
  },
});
