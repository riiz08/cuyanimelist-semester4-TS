import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { compare } from "bcrypt";
import { getServerSession, NextAuthOptions } from "next-auth";
import { getComponentTypeModule } from "next/dist/server/lib/app-dir-module";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = await compare(
          credentials.password,
          user.password!
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
        };
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_URL,
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = user.email;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, user, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id || account.userId;
      } else if (user) {
        token.accessToken = user.accessToken || null;
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken || null;
      session.user.id = token.id || session.user.id;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};

export const authSession = async () => {
  const session = await getServerSession(authOptions);
  return session?.user;
};
