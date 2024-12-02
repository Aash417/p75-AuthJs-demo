import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
   const confirmLink = `${process.env.NEXT_APP_URL}/auth/new-verification?token=${token}`;

   await resend.emails.send({
      from: 'Aashish <onboarding@resend.dev>',
      to: email,
      subject: 'confirm your email',
      html: `<p>click <a href='${confirmLink}'>here</a></p>`,
   });
}

export async function sendPasswordResetEmail(email: string, token: string) {
   const resetLink = `${process.env.NEXT_APP_URL}/auth/new-password?token=${token}`;

   await resend.emails.send({
      from: 'Aashish <onboarding@resend.dev>',
      to: email,
      subject: 'reset your password',
      html: `<p>click <a href='${resetLink}'>here</a></p>`,
   });
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
   await resend.emails.send({
      from: 'Aashish <onboarding@resend.dev>',
      to: email,
      subject: '2FA code',
      html: `<p>Your 2FA code : ${token}</p>`,
   });
}
