// imports
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// database
import User from '@/lib/models/User';
import dbConnect from '@/lib/server/dbConnect';

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
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          await dbConnect();

          // Fetching the user by email
          const user = await User.findOne({ email: credentials.email }).exec();
          if (!user) {
            // If no user is found with the email, return null
            return null;
          }

          // Verifying the password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            // If the password comparison fails, return null
            return null;
          }

          // Return the user object on successful authentication
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      await dbConnect();
      const dbUser = await getUserInfo(session.user.email);
      session.user.groups = dbUser.group;
      session.user.image = dbUser.image;
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      const dbUser = await getUserInfo(token.email);
      token.id = dbUser.id;
      token.groups = dbUser.group;
      token.image = dbUser.image;
      return token;
    },
    async signIn({ user, account }: { user: any; account: any }) {
      await dbConnect();

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
      } else {
        const existingUser = await User.findOne({ email: user.email }).exec();

        if (!existingUser) {
          throw new Error('User not found');
        }

        existingUser.provider = account?.provider;
        existingUser.providerId = account?.providerAccountId;
        await existingUser.save();
      }

      return true;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};

export default NextAuth(authOptions);

async function getUserInfo(email: string) {
  return await User.findOne({ email }).exec();
}
