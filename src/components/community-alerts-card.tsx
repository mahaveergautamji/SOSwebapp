import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const alerts = [
    { id: 1, location: "Oak Street Park", issue: "Suspicious activity reported", time: "5m ago" },
    { id: 2, location: "Main & 3rd Ave", issue: "Large, aggressive crowd", time: "12m ago" },
    { id: 3, location: "City Library", issue: "Report of theft", time: "30m ago" },
];

export function CommunityAlertsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Alerts</CardTitle>
        <CardDescription>Real-time reports from your area.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg overflow-hidden border aspect-video">
            <Image 
                src="https://picsum.photos/600/400" 
                data-ai-hint="map alerts" 
                alt="Map with community alerts" 
                width={600} 
                height={400} 
                className="w-full h-full object-cover"
            />
        </div>
        <ul className="space-y-3">
            {alerts.map(alert => (
                <li key={alert.id} className="flex items-start gap-3">
                    <div className="p-1.5 bg-accent rounded-full mt-1">
                        <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{alert.location}</p>

                        <p className="text-xs text-muted-foreground">{alert.issue}</p>
                    </div>
                    <time className="ml-auto text-xs text-muted-foreground whitespace-nowrap">{alert.time}</time>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
