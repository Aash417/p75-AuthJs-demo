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
      <span onClick={onClick} className="cursor-pointer">
         {children}
      </span>
   );
}
