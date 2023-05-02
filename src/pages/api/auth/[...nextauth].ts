import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        address: {
          label: 'Address',
          type: 'text',
          placeholder: '0x0',
        },
        name: { type: 'text', placeholder: '' },
        role: { type: 'text', placeholder: '' },
      },
      async authorize(credentials) {
        if (!credentials?.address || !credentials?.role || !credentials?.name)
          return null;

        return {
          id: credentials?.address,
          name: credentials?.name,
          role: credentials?.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    session: async ({ session, user, token }) =>
      Promise.resolve({ ...session, ...user, ...token }),
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
