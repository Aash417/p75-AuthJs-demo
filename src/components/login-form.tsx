import React from 'react';
import CardWrapper from './card-wrapper';

export default function LoginForm() {
   return (
      <CardWrapper
         headerLabel="Welcome back"
         backButtonLabel="Dont have an account"
         backButtonHref="/auth/register"
         showSocial
      >
         LoginForm
      </CardWrapper>
   );
}
