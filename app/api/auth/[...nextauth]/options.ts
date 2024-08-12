import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";


interface Credentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  role: string;
  accessToken?: string;
}

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 10000, 
      },
      profile(profile) {
        return {
          ...profile,
          id: profile.sub,
          role: "Google User",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "text",
          placeholder: "Enter email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials: Credentials | undefined): Promise<User | null> {
        if (!credentials) return null;

        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const user: User | null = await res.json();

        if (res.ok && user) {
          // console.log('from options', user)
          user.role = "user";
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user info from token", user.data)
        token.id = user.data.id;
        token.email = user.data.email;
        token.name = user.data.name
        token.role = user.data.role;
        token.accessToken = user.data.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      session.user.email = token.email
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
