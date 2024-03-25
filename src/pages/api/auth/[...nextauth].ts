// imports
import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';

// importing providers
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// database
import User from '@/lib/models/User';
import dbConnect from '@/lib/utils/database/dbConnect';

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
          return null; // Ensure both email and password are present
        }

        console.log('Credentials:', credentials);

        try {
          // Your database connection logic
          await dbConnect();

          // Fetching the user by email
          const user = await User.findOne({ email: credentials.email }).exec();
          console.log('User:', user);
          if (!user) {
            // If no user is found with the email, return null
            return null;
          }
          // TODO: User returns as null. Need to fix this

          console.log('User:', user);

          // Verifying the password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log('Password:', isValid);
          if (!isValid) {
            // If the password comparison fails, return null
            return null;
          }

          // Return the user object on successful authentication
          return { id: user.id, email: user.email, name: user.name };
        } catch (error) {
          console.error('Authentication error:', error);
          return null; // Return null on any error during the authentication process
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: any }) {
      await dbConnect();
      session.user.groups = await getUserGroups(session.user.email);
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      token.groups = await getUserGroups(token.email);
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
