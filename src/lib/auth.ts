import { getUserById } from '@/data/user';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';
import authConfig from './auth.config';
import db from './db';
import { getTwoFactorConfirmationByUserId } from '@/data/tow-factor-confirmation';
import { getAccountByUserId } from '@/data/account';

export type ExtendedUser = {
   role: 'ADMIN' | 'USER';
   isTwoFactorEnabled: boolean;
   isOAuth: boolean;
} & DefaultSession['user'];

declare module 'next-auth' {
   interface Session {
      user: ExtendedUser;
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
      async signIn({ user, account }) {
         if (account?.provider !== 'credentials') return true;

         const existingUser = await getUserById(user.id!);
         if (!existingUser?.emailVerified) return false;

         if (existingUser.isTwoFactorEnabled) {
            const twoFactorConfirmation =
               await getTwoFactorConfirmationByUserId(existingUser.id);

            if (!twoFactorConfirmation) return false;

            // delete twoFactorConfirmation for next sign in
            await db.twoFactorConfirmation.delete({
               where: { id: twoFactorConfirmation.id },
            });
         }

         return true;
      },

      async jwt({ token }) {
         if (!token.sub) return token;

         const existingUser = await getUserById(token.sub);
         if (!existingUser) return token;

         const existingAccount = await getAccountByUserId(existingUser.id);

         token.isOAuth = !!existingAccount;
         token.role = existingUser.role;
         token.name = existingUser.name;
         token.email = existingUser.email;
         token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

         return token;
      },

      async session({ token, session }) {
         if (token.sub && session.user) {
            session.user.id = token.sub;
         }
         if (token.role && session.user) {
            session.user.role = token.role as UserRole;
         }
         if (session.user) {
            session.user.isTwoFactorEnabled =
               token.isTwoFactorEnabled as boolean;

            session.user.name = token.name;
            session.user.email = token.email!;
            session.user.isOAuth = token.isOAuth as boolean;
         }

         return session;
      },
   },

   adapter: PrismaAdapter(prisma),

   session: { strategy: 'jwt' },
   ...authConfig,
});
