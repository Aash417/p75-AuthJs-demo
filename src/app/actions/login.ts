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

   console.log(values);

   const { email, password } = validatedFields.data;

   const existingUser = await getUserByEmail(email);
   if (!existingUser || !existingUser.email || !existingUser.password)
      return { error: 'Email does not exists!' };

   if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(email);
      await sendVerificationEmail(
         verificationToken.email,
         verificationToken.token,
      );

      return { success: 'Confimation email sent!' };
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
         switch (error.type) {
            case 'CredentialsSignin':
               return { error: 'Invalid credentials' };

            default:
               return { error: 'Something went wrong' };
         }
      }

      throw error;
   }
}
