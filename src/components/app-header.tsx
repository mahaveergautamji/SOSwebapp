import { Shield, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center">
        <div className="mr-4 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-primary" />
          <h1 className="font-bold text-lg">Guardian Angel</h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <Avatar>
              <AvatarImage src="https://picsum.photos/100" alt="User" />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
        </div>
      </div>
    </header>
  );
}
