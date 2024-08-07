import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface Credentials {
  email: string;
  password: string;
}



interface User {
  id: string;
  email: string;
  role: string;
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
          let userRole = "Google User";
          return {
            ...profile,
            id: profile.sub,
            role: userRole,
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
      async authorize(credentials: Credentials | undefined) {
        if (!credentials) return null;
        
        const res = await fetch("https://akil-backend.onrender.com/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        
        const user: User | null = await res.json();
        if (res.ok && user) {
            user["role"] = "Unverified Email"
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any, user?: User }) {
      if (user) token.user = user.role;
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user.role = token.user;
      return session;
    },
  },
   pages: {
    signIn: '/signin',  
   }
};
