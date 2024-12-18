import { ExtendedUser } from '@/lib/auth';
import { Card, CardContent, CardHeader } from './ui/card';

type Props = {
   user: ExtendedUser;
   label: string;
};

export default function UserInfo({ user, label }: Readonly<Props>) {
   return (
      <Card className="w-[600px] shadow-md">
         <CardHeader>
            <span className="text-center text-xl font-semibold">{label}</span>
         </CardHeader>

         <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
               <p className="text-sm font-medium">ID:</p>
               <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                  {user.id}
               </p>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
               <p className="text-sm font-medium">Name:</p>
               <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                  {user.name}
               </p>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
               <p className="text-sm font-medium">Email:</p>
               <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                  {user.email}
               </p>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
               <p className="text-sm font-medium">Role:</p>
               <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                  {user.role}
               </p>
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
               <p className="text-sm font-medium">Two Factor Authentication</p>
               <p className="max-w-[180px] truncate rounded-md bg-slate-100 p-1 font-mono text-xs">
                  {user.isTwoFactorEnabled ? 'ON' : 'OFF'}
               </p>
            </div>
         </CardContent>
      </Card>
   );
}
