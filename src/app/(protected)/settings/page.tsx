import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';

export default async function Page() {
   const session = await auth();

   return (
      <div>
         {JSON.stringify(session)}
         <form
            action={async () => {
               'use server';

               await signOut();
            }}
         >
            <Button type="submit">signout</Button>
         </form>
      </div>
   );
}
