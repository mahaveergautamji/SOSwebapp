"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Waypoints, ShieldCheck, PhoneOutgoing } from 'lucide-react';

export function FamilyEmergencyCard() {
  const { toast } = useToast();

  const sendMessage = (message: string) => {
    toast({
      title: "Message Sent",
      description: `Your message "${message}" has been sent to your emergency contacts.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Emergency</CardTitle>
        <CardDescription>Quickly notify your family.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button variant="destructive" className="flex flex-col h-20 transition-transform hover:scale-105" onClick={() => sendMessage("I need help, please contact me immediately.")}>
            <AlertTriangle className="h-6 w-6 mb-1" />
            <span>I need help</span>
        </Button>
        <Button variant="secondary" className="flex flex-col h-20 transition-transform hover:scale-105" onClick={() => sendMessage("I'm on my way.")}>
            <Waypoints className="h-6 w-6 mb-1" />
            <span>I'm on my way</span>
        </Button>
        <Button variant="outline" className="flex flex-col h-20 border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600 transition-transform hover:scale-105" onClick={() => sendMessage("I'm safe.")}>
            <ShieldCheck className="h-6 w-6 mb-1" />
            <span>I'm safe</span>
        </Button>
        <Button variant="default" className="flex flex-col h-20 transition-transform hover:scale-105" onClick={() => sendMessage("Call me now.")}>
            <PhoneOutgoing className="h-6 w-6 mb-1" />
            <span>Call me now</span>
        </Button>
      </CardContent>
    </Card>
  );
}
