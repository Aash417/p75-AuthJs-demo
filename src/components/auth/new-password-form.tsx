'use client';

import { newPassword } from '@/app/actions/new-password';
import { NewPasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
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

export default function NewPasswordForm() {
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   const [error, setError] = useState<string | undefined>('');
   const [success, setSuccess] = useState<string | undefined>('');
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof NewPasswordSchema>>({
      resolver: zodResolver(NewPasswordSchema),
      defaultValues: {
         password: '',
      },
   });

   function onSubmit(values: z.infer<typeof NewPasswordSchema>) {
      setError('');
      setSuccess('');

      startTransition(() => {
         newPassword(values, token!).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
            form.reset();
         });
      });
   }

   return (
      <CardWrapper
         headerLabel="Enter a new password"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      >
         <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
               <div className="space-y-4">
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
                  Reset password
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}
