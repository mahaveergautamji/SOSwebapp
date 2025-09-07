"use client";

import { useState, useEffect } from 'react';
import { PanicCard } from '@/components/panic-card';
import { ThreatDetectorCard } from '@/components/threat-detector-card';
import { CommunityAlertsCard } from '@/components/community-alerts-card';
import { EmergencyServicesCard } from '@/components/emergency-services-card';
import { FamilyEmergencyCard } from '@/components/family-emergency-card';
import { WelcomeDialog } from '@/components/welcome-dialog';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeDialog');
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      localStorage.setItem('hasSeenWelcomeDialog', 'true');
    }
  }, []);

  return (
    <>
      <div className="mx-auto max-w-7xl grid gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6 md:gap-8">
          <PanicCard />
          <ThreatDetectorCard />
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <FamilyEmergencyCard />
          <CommunityAlertsCard />
          <EmergencyServicesCard />
        </div>
      </div>
      <WelcomeDialog open={showWelcome} onOpenChange={setShowWelcome} />
    </>
  );
}
