import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { NavigationMenu } from './NavigationMenu';
import { Brand } from './Brand';
import { UserProfile } from './UserProfile';

interface MobileSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSidebar = ({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onClose 
}: MobileSidebarProps) => {
  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="text-left">
            <Brand />
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 py-4">
          <NavigationMenu
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />
        </div>

        <div className="p-4 border-t">
          <UserProfile />
        </div>
      </SheetContent>
    </Sheet>
  );
};