'use client';

import { DEFAULT_LOGIN_REDIRECT } from '@/route';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '../ui/button';

export default function Social() {
   function onClick() {
      signIn('google', { callbackUrl: DEFAULT_LOGIN_REDIRECT });
   }

   return (
      <div className="flex w-full items-center gap-x-2">
         <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={onClick}
            disabled={true}
         >
            <FcGoogle />
         </Button>
      </div>
   );
}
