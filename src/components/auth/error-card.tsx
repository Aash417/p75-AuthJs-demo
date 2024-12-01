import BackButton from './back-button';
import Header from '../header';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

export default function ErrorCard() {
   return (
      <Card>
         <CardHeader>
            <Header label="Oops something went wrong!" />
         </CardHeader>
         <CardContent></CardContent>
         <CardFooter>
            <BackButton label="Back to login" href="/auth/login" />
         </CardFooter>
      </Card>
   );
}
