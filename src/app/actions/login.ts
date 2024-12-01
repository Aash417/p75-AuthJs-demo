'use server';

import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { signIn } from '@/lib/auth';
import { z } from 'zod';

export async function login(values: z.infer<typeof LoginSchema>) {
   const validatedFields = LoginSchema.safeParse(values);
   if (!validatedFields.success) return { error: 'Invalid fields' };

   console.log(values);

   const { email, password } = validatedFields.data;

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
