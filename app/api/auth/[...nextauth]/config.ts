import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { config } from '@/app/config';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Task Management Api',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'user@domain.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const formData = new FormData();
        Object.entries(credentials).forEach(([key, value]) => {
          formData.set(key, value);
        });
        const res = await fetch(`${config.API_BASE_URL}/auth/login`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          return null;
        }
        const json = await res.json();
        const token = `${json.token_type} ${json.access_token}`
        json.email = credentials?.username;
        json.token = token;
        return json;
      },
    }),
  ],
  callbacks: { 
    jwt: async ({ token, user, }) => {
      return {...token, ...user};
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
  },
};
