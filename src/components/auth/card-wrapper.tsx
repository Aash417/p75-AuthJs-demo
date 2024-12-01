import Header from '../header';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import BackButton from './back-button';
import Social from './social';

type Props = {
   children: React.ReactNode;
   headerLabel: string;
   backButtonLabel: string;
   backButtonHref: string;
   showSocial?: boolean;
};

export default function CardWrapper({
   children,
   headerLabel,
   backButtonLabel,
   backButtonHref,
   showSocial,
}: Readonly<Props>) {
   return (
      <Card className="w-[400px] shadow-md">
         <CardHeader>
            <Header label={headerLabel} />
         </CardHeader>

         <CardContent className="text-xl">{children}</CardContent>

         {showSocial && (
            <CardFooter>
               <Social />
            </CardFooter>
         )}

         <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref} />
         </CardFooter>
      </Card>
   );
}
