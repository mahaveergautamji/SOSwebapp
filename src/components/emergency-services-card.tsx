import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Ambulance, ShieldAlert } from 'lucide-react';

export function EmergencyServicesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Services</CardTitle>
        <CardDescription>Quick access to local help.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full justify-start" size="lg" asChild>
          <a href="tel:112">
            <Phone className="mr-2 h-5 w-5"/>
            Call 112
          </a>
        </Button>
        <div className="flex gap-4">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="tel:102">
              <Ambulance className="mr-2 h-5 w-5"/>
              Ambulance
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a href="tel:112">
              <ShieldAlert className="mr-2 h-5 w-5"/>
              Police
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
