"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mic, Users, Waypoints, Siren } from "lucide-react";

type WelcomeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WelcomeDialog({ open, onOpenChange }: WelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Siren className="h-6 w-6 text-primary" />
            Welcome to the SOS Web App!
          </DialogTitle>
          <DialogDescription>
            Your personal safety companion. Here’s a quick guide on how to use the app.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-8 w-8 text-destructive mt-1" />
            <div>
              <h4 className="font-semibold">SOS Button</h4>
              <p className="text-sm text-muted-foreground">
                Press the big red SOS button in an emergency to instantly notify your contacts and share your location.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mic className="h-8 w-8 text-primary mt-1" />
            <div>
              <h4 className="font-semibold">AI Threat Detection</h4>
              <p className="text-sm text-muted-foreground">
                Click "Start Scan" to let the AI listen for dangerous sounds or keywords in your environment for 5 seconds.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-green-500 mt-1" />
            <div>
              <h4 className="font-semibold">Family Emergency</h4>
              <p className="text-sm text-muted-foreground">
                Use the quick message buttons to let your family know if you need help, are on your way, or are safe.
              </p>
            </div>
          </div>
           <div className="flex items-start gap-4">
            <Waypoints className="h-8 w-8 text-blue-500 mt-1" />
            <div>
              <h4 className="font-semibold">Community & Services</h4>
              <p className="text-sm text-muted-foreground">
                Check real-time community alerts on the map and quickly call emergency services like police or ambulance.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>Got It!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
