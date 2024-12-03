'use server';

import { signOut } from '@/lib/auth';

export async function logout() {
   //sone server stuff

   await signOut();
}
