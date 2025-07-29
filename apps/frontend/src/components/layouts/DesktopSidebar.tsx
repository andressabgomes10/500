import React from 'react';
import { NavigationMenu } from './NavigationMenu';
import { Brand } from './Brand';
import { UserProfile } from './UserProfile';

interface DesktopSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const DesktopSidebar = ({ activeSection, onSectionChange }: DesktopSidebarProps) => {
  return (
    <div className="w-72 bg-card border-r h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-background to-muted/30">
        <Brand />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <NavigationMenu
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <UserProfile />
      </div>
    </div>
  );
};