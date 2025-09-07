"use client";

import { useState, useEffect } from 'react';
import { Siren, ShieldCheck, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast";
import { sendEmergencyAlert } from '@/ai/flows/send-emergency-alert';

const emergencyContacts = ['Mom', 'Rohan', 'Priya'];

export function PanicCard() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [location, setLocation] = useState<{ lat: number; long: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let watchId: number;
    if (isEmergency) {
      // Get initial location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, long: longitude });
          sendEmergencyAlert({ latitude, longitude, contacts: emergencyContacts })
            .then(response => {
              if (response.success) {
                toast({ title: "Alert Sent", description: response.message });
              }
            });
        },
        (err) => {
          console.error(err);
          setError("Could not get location. Please enable location services.");
          toast({ variant: "destructive", title: "Location Error", description: "Could not get location. Please enable location services." });
        },
        { enableHighAccuracy: true }
      );
      
      // Watch for location changes
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, long: longitude });
          // Optionally, send updates to contacts periodically
        },
        (err) => {
           // Errors are handled by the initial getCurrentPosition
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
    
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [isEmergency, toast]);

  const activateSOS = () => {
    setError(null);
    setIsEmergency(true);
  };
  
  const cancelSOS = () => {
      setIsEmergency(false);
      setLocation(null);
      setError(null);
      toast({ title: "SOS Cancelled", description: "Your emergency contacts have been notified that you are safe." });
  };

  if (isEmergency) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Siren className="animate-ping" />
                SOS Activated
              </CardTitle>
              <CardDescription className="text-destructive/80 mt-1">
                Help is on the way. Your location and status have been shared.
              </CardDescription>
            </div>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Cancel SOS
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will cancel the SOS alert. Your emergency contacts will be notified that you are safe.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogCancel>Stay Alert</AlertDialogCancel>
                <AlertDialogAction onClick={cancelSOS}>I'm Safe</AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin className="h-5 w-5" /> Real-time Location Sharing</h3>
            {error && <p className="text-sm text-destructive mb-4">{error}</p>}
            {!error && <p className="text-sm text-muted-foreground mb-4">Your live location is being shared with your emergency contacts.</p>}
            <div className="rounded-lg overflow-hidden border aspect-video">
              {location ? (
                <iframe
                    title="Real-time Location"
                    className="w-full h-full"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${location.lat},${location.long}`}
                    allowFullScreen
                ></iframe>
              ) : (
                 <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Getting your location...</p>
                 </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5" /> Notifying Emergency Contacts</h3>
            <div className="flex items-center space-x-4">
              {emergencyContacts.map(name => (
                 <div key={name} className="flex flex-col items-center gap-1">
                    <Avatar>
                        <AvatarImage src={`https://picsum.photos/seed/${name}/100`} />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{name}</span>
                 </div>
              ))}
              <div className="text-sm text-muted-foreground">+2 more</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="text-center flex flex-col items-center justify-center p-8 md:p-12">
      <CardHeader className="p-0 mb-6">
        <ShieldCheck className="h-16 w-16 mx-auto text-primary mb-4" />
        <CardTitle className="text-2xl md:text-3xl">You are Protected</CardTitle>
        <CardDescription className="mt-2 text-base">Press the button below in case of an emergency.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Button 
          variant="destructive" 
          size="lg" 
          className="h-24 w-24 md:h-32 md:w-32 rounded-full shadow-lg shadow-destructive/50 transform transition hover:scale-105 active:scale-95"
          onClick={activateSOS}
        >
          <div className="flex flex-col items-center">
            <Siren className="h-8 w-8 md:h-10 md:w-10" />
            <span className="mt-1 text-lg font-bold">SOS</span>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
}
