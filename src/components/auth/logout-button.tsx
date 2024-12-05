'use client';

import { logout } from '@/app/actions/logout';

type Props = {
   children?: React.ReactNode;
};

export default function LogoutButton({ children }: Readonly<Props>) {
   function onClick() {
      logout();
   }

   return (
      <button onClick={onClick} className="cursor-pointer">
         {children}
      </button>
   );
}
