import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface AdaptiveLayoutProps {
  children: React.ReactNode;
  mobileClassName?: string;
  desktopClassName?: string;
  className?: string;
}

export const AdaptiveLayout = ({ 
  children, 
  mobileClassName, 
  desktopClassName, 
  className 
}: AdaptiveLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      className,
      isMobile ? mobileClassName : desktopClassName
    )}>
      {children}
    </div>
  );
};

interface AdaptiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const AdaptiveContainer = ({ children, className }: AdaptiveContainerProps) => {
  return (
    <AdaptiveLayout
      className={cn('container mx-auto', className)}
      mobileClassName="px-4 py-2"
      desktopClassName="px-6 py-4"
    >
      {children}
    </AdaptiveLayout>
  );
};