import React from 'react';
import { LoadingSpinner } from './loading-spinner';
import { cn } from '@/lib/utils';

interface EnhancedLoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
  variant?: 'default' | 'minimal' | 'card';
}

export const EnhancedLoading = ({ 
  size = 'md', 
  text, 
  className,
  variant = 'default' 
}: EnhancedLoadingProps) => {
  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <LoadingSpinner size={size} />
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn("bg-card rounded-lg border p-8", className)}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <LoadingSpinner size={size} />
          {text && (
            <p className="text-sm text-muted-foreground animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center justify-center min-h-[200px]", 
      className
    )}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size={size} />
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};