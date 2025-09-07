import { AppHeader } from '@/components/app-header';
import { PanicCard } from '@/components/panic-card';
import { ThreatDetectorCard } from '@/components/threat-detector-card';
import { CommunityAlertsCard } from '@/components/community-alerts-card';
import { EmergencyServicesCard } from '@/components/emergency-services-card';
import { FamilyEmergencyCard } from '@/components/family-emergency-card';
import { AppFooter } from '@/components/app-footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
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
      </main>
      <AppFooter />
    </div>
  );
}
