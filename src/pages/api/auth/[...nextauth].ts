// imports
import NextAuth from 'next-auth';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

// database
import User from '@/lib/models/User';
import mongoose from 'mongoose';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      console.log('From Auth!: Session', session);
      // @ts-ignore
      session.user.groups = await getUserGroups(session.user.email);
      console.log('From Auth 2!: Session', session);
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
    async signIn({ user, account }) {
      mongoose.connect(process.env.MONGODB_URI as string);

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
    async redirect({}) {
      return '/dashboard';
    },
  },

  debug: true,
});

async function getUserGroups(userEmail: string) {
  const user = await User.findOne({ email: userEmail }).exec();
  return user?.group || [];
}
