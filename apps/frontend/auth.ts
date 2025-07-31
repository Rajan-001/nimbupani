import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Twitter from "next-auth/providers/twitter"
import {prisma} from "@repo/db/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
       authorization: {
        params: {
       prompt: "consent"

        }
      },
    }),
    Twitter({
   // eslint-disable-next-line turbo/no-undeclared-env-vars
   clientId: process.env.AUTH_TWITTER_ID!,
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      clientSecret: process.env.AUTH_TWITTER_SECRET!,
      version: "2.0" 
    })
   
  ],
  secret: process.env.AUTH_SECRET!,
  events:{
    async signIn({ user, account }) {
      if (!user?.email || !account?.provider) return;

      // ✅ Check if email already exists
      const existingUser = await prisma.userInfo.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        // ✅ Store only email + provider
        await prisma.userInfo.create({
          data: {
            email: user.email,
            provider: account.provider,
          },
        });
      } else {
        // ✅ Optional: update provider if user signs in with another provider
        await prisma.userInfo.update({
          where: { email: user.email },
          data: { provider: account.provider },
        });
      }
    },
  }
})
