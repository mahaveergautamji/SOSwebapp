"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Waypoints, ShieldCheck, PhoneOutgoing } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


export function FamilyEmergencyCard() {
  const { toast } = useToast();

  const sendMessage = (message: string) => {
    toast({
      title: "Message Sent",
      description: `Your message "${message}" has been sent to your emergency contacts.`,
    });
  };

  const emergencyActions = [
    {
      label: "I need help",
      message: "I need help, please contact me immediately.",
      icon: AlertTriangle,
      variant: "destructive",
      tooltip: "Sends 'I need help, please contact me immediately.' to your contacts."
    },
    {
      label: "I'm on my way",
      message: "I'm on my way.",
      icon: Waypoints,
      variant: "secondary",
      tooltip: "Sends 'I'm on my way.' to your contacts."
    },
    {
      label: "I'm safe",
      message: "I'm safe.",
      icon: ShieldCheck,
      variant: "outline",
      className: "border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600",
      tooltip: "Sends 'I'm safe.' to your contacts."
    },
    {
      label: "Call me now",
      message: "Call me now.",
      icon: PhoneOutgoing,
      variant: "default",
      tooltip: "Sends 'Call me now.' to your contacts."
    }
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Emergency</CardTitle>
        <CardDescription>Quickly notify your family. Hover for details.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <TooltipProvider>
          {emergencyActions.map((action) => (
            <Tooltip key={action.label}>
              <TooltipTrigger asChild>
                <Button
                  variant={action.variant}
                  className={`flex flex-col h-20 transition-transform hover:scale-105 ${action.className || ''}`}
                  onClick={() => sendMessage(action.message)}
                >
                  <action.icon className="h-6 w-6 mb-1" />
                  <span>{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
