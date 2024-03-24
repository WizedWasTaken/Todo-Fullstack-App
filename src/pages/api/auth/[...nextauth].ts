// imports
import NextAuth from 'next-auth';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// database
import User from '@/lib/models/User';
import mongoose from 'mongoose';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      session.user.groups = await getUserGroups(session.user.email);
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      token.groups = await getUserGroups(token.email);
      return token;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      // Your signIn callback logic
      if (!mongoose.connection.readyState) {
        mongoose.connect(process.env.MONGODB_URI || '');
      }

      const existingUser = await User.findOne({ email: user.email }).exec();

      if (!existingUser) {
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
          group: ['free'],
          provider: account?.provider,
          providerId: account?.providerAccountId,
        });
      }

      return true;
    },
    async redirect() {
      return '/dashboard';
    },
  },
  debug: true,
};

export default NextAuth(authOptions);

async function getUserGroups(userEmail: string) {
  const user = await User.findOne({ email: userEmail }).exec();
  return user?.group || [];
}
