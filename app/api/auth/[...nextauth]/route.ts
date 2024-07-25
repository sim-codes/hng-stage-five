import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        idToken: { label: "ID Token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.idToken) {
          throw new Error("No ID token provided");
        }
        
        try {
          const auth = getAuth();
          const decodedToken = await auth.verifyIdToken(credentials.idToken);
          return {
            id: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name || decodedToken.email?.split('@')[0],
          };
        } catch (error) {
          console.error('Error verifying Firebase token:', error);
          throw new Error(error instanceof Error ? error.message : "Failed to authenticate");
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signOut({ token }) {
      console.log('User signed out:', token);
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };