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
      return session;
    },
    async jwt({ token, user }) {
      return token;
    },
    async signIn({ user, account }) {
      mongoose.connect(process.env.MONGODB_URI as string);

      const existingUser = await User.findOne({ email: user.email }).exec();

      console.log('existingUser', existingUser);
      if (!existingUser) {
        console.log('creating user');
        await User.create({
          email: user.email,
          name: user.name,
          image: user.image,
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
