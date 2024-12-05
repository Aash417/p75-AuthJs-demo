'use client';

import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import LoginForm from './login-form';

type Props = {
   children: React.ReactNode;
   mode?: 'modal' | 'redirect';
   asChild?: boolean;
};

export default function LoginButton({
   children,
   mode = 'redirect',
   asChild,
}: Readonly<Props>) {
   const router = useRouter();
   function onClick() {
      router.push('/auth/login');
   }

   if (mode === 'modal')
      return (
         <Dialog>
            <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
            <DialogContent className="w-auto bg-transparent p-0">
               <LoginForm />
            </DialogContent>
         </Dialog>
      );

   return (
      <span onClick={onClick} className="cursor-pointer">
         {children}
      </span>
   );
}
