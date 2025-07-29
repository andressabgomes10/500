import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ResponsiveCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  mobileLayout?: 'stacked' | 'compact';
}

export const ResponsiveCard = ({ 
  children, 
  className, 
  mobileLayout = 'stacked',
  ...props 
}: ResponsiveCardProps) => {
  return (
    <Card 
      className={cn(
        'transition-all duration-300 hover:shadow-lg',
        mobileLayout === 'compact' && 'md:p-6 p-4',
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  );
};

interface ResponsiveCardHeaderProps extends React.ComponentProps<typeof CardHeader> {
  children: React.ReactNode;
  compact?: boolean;
}

export const ResponsiveCardHeader = ({ 
  children, 
  className, 
  compact = false,
  ...props 
}: ResponsiveCardHeaderProps) => {
  return (
    <CardHeader 
      className={cn(
        compact ? 'pb-3 md:pb-6' : 'pb-6',
        className
      )} 
      {...props}
    >
      {children}
    </CardHeader>
  );
};

interface ResponsiveCardContentProps extends React.ComponentProps<typeof CardContent> {
  children: React.ReactNode;
  compact?: boolean;
}

export const ResponsiveCardContent = ({ 
  children, 
  className, 
  compact = false,
  ...props 
}: ResponsiveCardContentProps) => {
  return (
    <CardContent 
      className={cn(
        compact ? 'p-3 md:p-6' : 'p-6',
        className
      )} 
      {...props}
    >
      {children}
    </CardContent>
  );
};