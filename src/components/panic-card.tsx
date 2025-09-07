"use client";

import { useState } from 'react';
import { Siren, ShieldCheck, MapPin, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

export function PanicCard() {
  const [isEmergency, setIsEmergency] = useState(false);

  if (isEmergency) {
    return (
      <Card className="bg-destructive/10 border-destructive">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-destructive flex items-center gap-2">
                <Siren />
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
                <AlertDialogAction onClick={() => setIsEmergency(false)}>I'm Safe</AlertDialogAction>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><MapPin className="h-5 w-5" /> Real-time Location Sharing</h3>
            <p className="text-sm text-muted-foreground mb-4">Your live location is being shared with your emergency contacts.</p>
            <div className="rounded-lg overflow-hidden border">
              <Image src="https://picsum.photos/800/250" data-ai-hint="map location" alt="Map showing current location" width={800} height={250} className="w-full object-cover"/>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2"><Users className="h-5 w-5" /> Notifying Emergency Contacts</h3>
            <div className="flex items-center space-x-4">
              {['Mom', 'Rohan', 'Priya'].map(name => (
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="destructive" 
              size="lg" 
              className="h-24 w-24 md:h-32 md:w-32 rounded-full shadow-lg shadow-destructive/50 transform transition hover:scale-105 active:scale-95"
            >
              <div className="flex flex-col items-center">
                <Siren className="h-8 w-8 md:h-10 md:w-10" />
                <span className="mt-1 text-lg font-bold">SOS</span>
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Activate SOS?</AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately share your location and a distress signal with your emergency contacts. Are you sure?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setIsEmergency(true)}>Activate</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
