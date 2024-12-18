import UserInfo from '@/components/user-info';
import { currentUser } from '@/lib/current-user';

export default async function Page() {
   const user = await currentUser();

   return <UserInfo user={user!} label="Server component" />;
}
