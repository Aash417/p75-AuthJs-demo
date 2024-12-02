'use client';

import { login } from '@/app/actions/login';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import { Button } from '../ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import CardWrapper from './card-wrapper';

export default function LoginForm() {
   const [showTwoFactor, setShowTwoFactor] = useState(false);
   const [error, setError] = useState<string | undefined>('');
   const [success, setSuccess] = useState<string | undefined>('');
   const [isPending, startTransition] = useTransition();

   const searchParams = useSearchParams();
   const urlError =
      searchParams.get('error') === 'OAuthAccountNotLinked'
         ? 'Email already in use with different provider!'
         : '';

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: '',
         password: '',
         code: '',
      },
   });

   function onSubmit(values: z.infer<typeof LoginSchema>) {
      setError('');
      setSuccess('');

      startTransition(() => {
         login(values)
            .then((data) => {
               if (data.error) {
                  form.reset();
                  setError(data?.error);
               }
               if (data.success) {
                  form.reset();
                  setSuccess(data?.success);
               }

               if (data.twoFactor) {
                  setShowTwoFactor(true);
               }
            })
            .catch((e) => {
               setError('something went wrong');
               console.log(e);
            });
      });
   }

   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Dont have an account"
         backButtonHref="/auth/register"
         showSocial
      >
         <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="space-y-4">
                  {showTwoFactor && (
                     <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder="123456"
                                    disabled={isPending}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  )}
                  {!showTwoFactor && (
                     <>
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       type="email"
                                       placeholder="Enter your email"
                                       disabled={isPending}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Password</FormLabel>
                                 <FormControl>
                                    <Input
                                       {...field}
                                       type="password"
                                       placeholder="Enter your password"
                                       disabled={isPending}
                                    />
                                 </FormControl>
                                 <Button
                                    size="sm"
                                    variant="link"
                                    asChild
                                    className="px-0 font-normal"
                                 >
                                    <Link href="/auth/reset">
                                       Forgot password ?
                                    </Link>
                                 </Button>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </>
                  )}
               </div>

               <FormError message={error || urlError} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full">
                  {showTwoFactor ? 'Confirm' : 'Login'}
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}
