import Navbar from './_components/navbar';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
   return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-y-10 bg-sky-300">
         <Navbar />
         {children}
      </div>
   );
}
