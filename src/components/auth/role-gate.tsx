'use client';

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client';
import React from 'react';
import FormError from '../form-error';

type Props = {
   children: React.ReactNode;
   allowedRole: UserRole;
};

export default function RoleGate({ children, allowedRole }: Readonly<Props>) {
   const role = useCurrentRole();

   if (role !== allowedRole)
      return (
         <FormError message="You do not have permission to view this content !" />
      );

   return <>{children}</>;
}
