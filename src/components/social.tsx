'use client';

import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';

export default function Social() {
   return (
      <div className="flex w-full items-center gap-x-2">
         <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={() => {}}
         >
            <FcGoogle />
         </Button>
      </div>
   );
}
