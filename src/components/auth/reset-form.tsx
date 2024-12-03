'use client';

import { reset } from '@/app/actions/reset';
import { ResetSchema } from '@/schemas';
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

export default function ResetForm() {
   const [error, setError] = useState<string | undefined>('');
   const [success, setSuccess] = useState<string | undefined>('');
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof ResetSchema>>({
      resolver: zodResolver(ResetSchema),
      defaultValues: {
         email: '',
      },
   });

   function onSubmit(values: z.infer<typeof ResetSchema>) {
      setError('');
      setSuccess('');
      console.log(values);

      startTransition(() => {
         reset(values).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
            form.reset();
         });
      });
   }

   return (
      <CardWrapper
         headerLabel="Forgot your password ?"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
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
               </div>

               <FormError message={error} />
               <FormSuccess message={success} />

               <Button type="submit" className="w-full">
                  Send reset email
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
}