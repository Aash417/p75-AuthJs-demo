'use client';

import { useRouter } from 'next/navigation';

type Props = {
   children: React.ReactNode;
   mode?: 'modal' | 'redirect';
   asChild?: boolean;
};

export default function LoginButton({ children, mode = 'redirect' }: Props) {
   const router = useRouter();
   function onClick() {
      console.log('login btn clk');
      router.push('/auth/login');
   }

   if (mode === 'modal')
      return (
         <span onClick={onClick} className="cursor-pointer">
            Implement modal
         </span>
      );

   return (
      <span onClick={onClick} className="cursor-pointer">
         {children}
      </span>
   );
}
