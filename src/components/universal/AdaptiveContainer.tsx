import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppDetection } from '@/hooks/useAppDetection';

interface AdaptiveContainerProps {
  children: React.ReactNode;
  className?: string;
  fullHeight?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const AdaptiveContainer = ({ 
  children, 
  className, 
  fullHeight = false,
  padding = 'md'
}: AdaptiveContainerProps) => {
  const isMobile = useIsMobile();
  const { isNativeApp, orientation } = useAppDetection();

  const paddingClasses = {
    none: '',
    sm: 'p-2 md:p-4',
    md: 'p-4 md:p-6 lg:p-8',
    lg: 'p-6 md:p-8 lg:p-12'
  };

  return (
    <div 
      className={cn(
        'w-full',
        fullHeight && 'min-h-screen',
        isNativeApp && 'pt-safe-top pb-safe-bottom',
        isMobile && orientation === 'landscape' && 'px-safe-left px-safe-right',
        paddingClasses[padding],
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};