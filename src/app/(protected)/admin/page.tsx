'use client';

import { admin } from '@/app/actions/admin';
import RoleGate from '@/components/auth/role-gate';
import FormSuccess from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { UserRole } from '@prisma/client';

export default function Page() {
   function onApiRouteClick() {
      fetch('/api/admin').then((res) => {
         if (res.ok) console.log('ok');
         else console.log('forbidden for now');
      });
   }

   function onServerActionClick() {
      admin().then((data) => {
         if (data.error) {
            console.log(data.error);
         }

         if (data.succes) {
            console.log(data.succes);
         }
      });
   }

   return (
      <Card>
         <CardHeader>
            <p className="text-center text-2xl font-semibold">Admin</p>
         </CardHeader>

         <CardContent className="space-y-4">
            <RoleGate allowedRole={UserRole.ADMIN}>
               <FormSuccess message="You are allowed to see this content !" />
            </RoleGate>

            <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">Admin only api route </p>
               <Button onClick={onApiRouteClick}>Click to test</Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3 shadow-md">
               <p className="text-sm font-medium">Admin only server action</p>
               <Button onClick={onServerActionClick}>Click to test</Button>
            </div>
         </CardContent>
      </Card>
   );
}
