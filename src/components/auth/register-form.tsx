'use client';

import { register } from '@/app/actions/register';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
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

export default function RegisterForm() {
   const [error, setError] = useState<string | undefined>('');
   const [success, setSuccess] = useState<string | undefined>('');
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
         name: '',
         email: '',
         password: '',
      },
   });

   function onSubmit(values: z.infer<typeof RegisterSchema>) {
      setError('');
      setSuccess('');

      startTransition(() => {
         register(values).then((data) => {
            setError(data.error);
            setSuccess(data.success);
            form.reset();
         });
      });
   }

   return (
      <CardWrapper
         headerLabel="Create an account"
         backButtonLabel="Already have an account"
         backButtonHref="/auth/login"
         showSocial
      >
         <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="space-y-4">
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Name</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="text"
                                 placeholder="Enter your name"
                                 disabled={isPending}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

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

               <FormError message={error} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full">
                  Create an account
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}
