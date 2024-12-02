import { getPasswordRestTokenByEmail } from '@/data/password-reset-token';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { getVerificationTokenByEmail } from '@/data/verification-token';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import db from './db';

export async function generateVerificationToken(email: string) {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000);

   const existingToken = await getVerificationTokenByEmail(email);
   if (existingToken) {
      await db.verificationToken.delete({
         where: { id: existingToken.id },
      });
   }

   const verificationToken = await db.verificationToken.create({
      data: {
         email,
         token,
         expires,
      },
   });
   return verificationToken;
}

export async function generatePasswordResetToken(email: string) {
   const token = uuidv4();
   const expires = new Date(new Date().getTime() + 3600 * 1000);

   const existingToken = await getPasswordRestTokenByEmail(email);
   if (existingToken) {
      await db.verificationToken.delete({
         where: { id: existingToken.id },
      });
   }

   const passwordResetToken = await db.passwordResetToken.create({
      data: {
         email,
         token,
         expires,
      },
   });
   return passwordResetToken;
}

export async function generateTwoFactorToken(email: string) {
   const token = crypto.randomInt(100_000, 1_000_000).toString();
   // recommended to expire token between 15min to 60min
   const expires = new Date(new Date().getTime() + 3600 * 1000);

   const existingToken = await getTwoFactorTokenByEmail(email);
   if (existingToken) {
      await db.twoFactorToken.delete({
         where: { id: existingToken.id },
      });
   }

   const twoFactorToken = await db.twoFactorToken.create({
      data: {
         email,
         token,
         expires,
      },
   });

   return twoFactorToken;
}
