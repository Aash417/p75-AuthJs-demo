'use client';

import { login } from '@/app/actions/login';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import CardWrapper from './card-wrapper';
import FormError from './form-error';
import FormSuccess from './form-success';
import { Button } from './ui/button';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from './ui/form';
import { Input } from './ui/input';

export default function LoginForm() {
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
      },
   });

   function onSubmit(values: z.infer<typeof LoginSchema>) {
      setError('');
      setSuccess('');

      startTransition(() => {
         login(values).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
            form.reset();
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
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>

               <FormError message={error || urlError} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full">
                  Login
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}
