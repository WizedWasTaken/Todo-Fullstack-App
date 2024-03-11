import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import DiscordProvider from 'next-auth/providers/discord';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string
    // }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_ID as string,
    //   clientSecret: process.env.DISCORD_SECRET as string,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect to the home page or a custom page
    },
    async session({session, token, user}) {
      return session;
    },
    async jwt({token, user, account, profile, isNewUser }) {
      return token;
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  const missingVars = ['GITHUB_ID', 'GITHUB_SECRET', 'GOOGLE_ID', 'GOOGLE_SECRET', 'DISCORD_ID', 'DISCORD_SECRET', 'NEXTAUTH_URL'].filter(key => !process.env[key]);
  if (missingVars.length > 0) {
    console.warn('Missing environment variables:', missingVars.join(', '));
  }
}

