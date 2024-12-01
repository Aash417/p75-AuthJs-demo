import { getUserById } from '@/data/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import db from './db';

declare module 'next-auth' {
   interface Session {
      user: {
         role: 'ADMIN' | 'USER';
      } & DefaultSession['user'];
   }
}

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
   pages: {
      signIn: '/auth/login',
      error: '/auth/error',
   },
   events: {
      async linkAccount({ user }) {
         await db.user.update({
            where: {
               id: user.id,
            },
            data: {
               emailVerified: new Date(),
            },
         });
      },
   },
   callbacks: {
      async jwt({ token }) {
         if (!token.sub) return token;

         const existingUser = await getUserById(token.sub);
         if (!existingUser) return token;

         token.role = existingUser.role;

         return token;
      },

      async session({ token, session }) {
         console.log(token);

         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         if (token.role && session.user) {
            session.user.role = token.role as UserRole;
         }

         return session;
      },
   },
   adapter: PrismaAdapter(prisma),
   session: { strategy: 'jwt' },
   ...authConfig,
});
