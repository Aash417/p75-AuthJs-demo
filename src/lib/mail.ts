import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
   const confirmLink = `${process.env.NEXT_APP_URL}/auth/new-verification?token=${token}`;

   await resend.emails.send({
      from: 'Aashish <onboarding@resend.dev>',
      to: 'extry99@gmail.com',
      subject: 'confirm your email',
      html: `<p>click <a href='${confirmLink}'>here</a></p>`,
   });
}
