'use client';

import { newVerification } from '@/app/actions/new-verification';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { RiLoaderLine } from 'react-icons/ri';
import FormError from '../form-error';
import FormSuccess from '../form-success';
import CardWrapper from './card-wrapper';

export default function NewVerificationForm() {
   const searchParams = useSearchParams();
   const token = searchParams.get('token');

   const [error, setError] = useState<string | undefined>('');
   const [success, setSuccess] = useState<string | undefined>('');

   const onSubmit = useCallback(() => {
      if (!token) {
         setError('Missing token!');
         return;
      }

      newVerification(token).then((data) => {
         setSuccess(data.success);
         setError(data.error);
      });
   }, [token]);

   useEffect(() => {
      onSubmit();
   }, [onSubmit]);

   return (
      <CardWrapper
         headerLabel="Confirmation Verification"
         backButtonLabel="Back to login"
         backButtonHref="/auth/login"
      >
         <div className="flex w-full items-center justify-center">
            {!success && !error && <RiLoaderLine className="animate-spin" />}
            <FormSuccess message={success} />
            <FormError message={error} />
         </div>
      </CardWrapper>
   );
}
