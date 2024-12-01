import LoginButton from '@/components/auth/login-button';

export default function Home() {
   return (
      <div className="flex h-screen items-center justify-center bg-sky-500 text-5xl">
         <LoginButton mode="modal">
            <button>login</button>
         </LoginButton>
      </div>
   );
}
