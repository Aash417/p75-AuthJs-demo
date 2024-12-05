import { HiOutlineExclamationTriangle } from 'react-icons/hi2';

type Props = {
   message?: string;
};

export default function FormError({ message }: Readonly<Props>) {
   if (!message) return null;

   return (
      <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
         <HiOutlineExclamationTriangle className="h-6 w-6" />
         <p>{message}</p>
      </div>
   );
}
