'use server';

import { currentRole } from '@/lib/current-role';
import { UserRole } from '@prisma/client';

export async function admin() {
   const role = await currentRole();

   if (role !== UserRole.ADMIN) {
      return { error: 'Forbidden!' };
   }

   return { success: 'Allowed' };
}
