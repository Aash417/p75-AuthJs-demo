'use server';

import { getUserByEmail } from '@/data/user';
import { signIn } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/token';
import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { z } from 'zod';

export async function login(values: z.infer<typeof LoginSchema>) {
   const validatedFields = LoginSchema.safeParse(values);
   if (!validatedFields.success) return { error: 'Invalid fields' };

   const { email, password } = validatedFields.data;

   const existingUser = await getUserByEmail(email);
   if (!existingUser?.email || !existingUser?.password)
      return { error: 'Email does not exists!' };

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token,
      );

      return { success: 'Confirmation email sent!' };
   }

   try {
      await signIn('credentials', {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT,
      });

      return { success: 'logged in' };
   } catch (error) {
      if (error instanceof AuthError) {
         if (error.type === 'CredentialsSignin') {
            return { error: 'Invalid credentials' };
         }

         return { error: 'Something went wrong' };
      }

      throw error;
   }
}
