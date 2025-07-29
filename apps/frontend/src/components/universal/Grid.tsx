import React from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
  adaptive?: boolean;
}

export const Grid = ({ 
  children, 
  className, 
  cols = { default: 1 },
  gap = 'md',
  adaptive = true
}: GridProps) => {
  const isMobile = useIsMobile();

  const gapClasses = {
    sm: 'gap-2 md:gap-4',
    md: 'gap-4 md:gap-6',
    lg: 'gap-6 md:gap-8'
  };

  const getGridCols = () => {
    if (adaptive && isMobile) {
      return 'grid-cols-1';
    }

    const colsMap = {
      1: 'grid-cols-1',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-2 lg:grid-cols-3',
      4: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
    };

    let classes = colsMap[cols.default as keyof typeof colsMap] || 'grid-cols-1';
    
    if (cols.sm) classes += ` sm:grid-cols-${cols.sm}`;
    if (cols.md) classes += ` md:grid-cols-${cols.md}`;
    if (cols.lg) classes += ` lg:grid-cols-${cols.lg}`;
    if (cols.xl) classes += ` xl:grid-cols-${cols.xl}`;

    return classes;
  };

  return (
    <div 
      className={cn(
        'grid',
        getGridCols(),
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};