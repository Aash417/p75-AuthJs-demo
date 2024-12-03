'use client';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import LogoutButton from './logout-button';

export default function UserButton() {
   const user = useCurrentUser();

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Avatar>
               <AvatarImage src={user?.image || ''} />
               <AvatarFallback className="bg-sky-500 text-white">
                  <FaUser />
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>

         <DropdownMenuContent>
            <DropdownMenuItem>
               <LogoutButton>Logout</LogoutButton>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
