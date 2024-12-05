type Props = {
   children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
   return (
      <div className="flex h-screen items-center justify-center bg-sky-500 text-5xl">
         {children}
      </div>
   );
}
