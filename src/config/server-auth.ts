import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_SECRET } from './env';

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: `openid https://www.googleapis.com/auth/userinfo.email`,
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.accessToken) {
        return {
          ...session,
          accessToken: token.accessToken,
        };
      }

      return session;
    },
    async jwt({ account, token }) {
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
