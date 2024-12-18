import { GoCheckCircle } from 'react-icons/go';

type Props = {
   message?: string;
};

export default function FormSuccess({ message }: Readonly<Props>) {
   if (!message) return null;

   return (
      <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
         <GoCheckCircle className="h-6 w-6" />
         <p>{message}</p>
      </div>
   );
}
