import db from '@/lib/db';

export async function getPasswordRestTokenByToken(token: string) {
   try {
      const passwordToken = await db.passwordResetToken.findUnique({
         where: {
            token,
         },
      });

      return passwordToken;
   } catch {
      return null;
   }
}

export async function getPasswordRestTokenByEmail(email: string) {
   try {
      const passwordToken = await db.passwordResetToken.findFirst({
         where: {
            email,
         },
      });

      return passwordToken;
   } catch {
      return null;
   }
}
