import React, { useState, memo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileSidebar } from './MobileSidebar';
import { DesktopSidebar } from './DesktopSidebar';
import { AppHeader } from './AppHeader';
import { ErrorBoundary } from './ErrorBoundary';

interface AppLayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AppLayout = memo(({ children, activeSection, onSectionChange }: AppLayoutProps) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar */}
      {isMobile && (
        <MobileSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Desktop Sidebar */}
      {!isMobile && (
        <DesktopSidebar
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        {isMobile && (
          <AppHeader
            onMenuClick={() => setSidebarOpen(true)}
            activeSection={activeSection}
          />
        )}
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </div>
        </main>
      </div>
    </div>
  );
});

AppLayout.displayName = 'AppLayout';