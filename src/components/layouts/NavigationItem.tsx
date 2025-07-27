import React, { memo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavigationItem as INavigationItem } from '@/types/navigation';
import { cn } from '@/lib/utils';

interface NavigationItemProps {
  item: INavigationItem;
  isActive: boolean;
  onClick: (id: string) => void;
  compact?: boolean;
}

export const NavigationItem = memo(({ 
  item, 
  isActive, 
  onClick, 
  compact = false 
}: NavigationItemProps) => {
  const Icon = item.icon;
  
  return (
    <Button
      onClick={() => onClick(item.id)}
      variant="ghost"
      className={cn(
        "w-full justify-between h-auto p-4 text-left transition-all duration-200",
        isActive
          ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm'
          : 'hover:bg-muted/50 hover:text-foreground'
      )}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "p-2 rounded-lg transition-all duration-200",
          isActive 
            ? 'bg-primary text-primary-foreground shadow-md' 
            : 'bg-muted text-muted-foreground'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        {!compact && (
          <div className="text-left">
            <div className="font-semibold text-sm">{item.label}</div>
            <div className="text-xs text-muted-foreground">
              {item.description}
            </div>
          </div>
        )}
      </div>
      {!compact && (
        <ChevronRight className={cn(
          "h-4 w-4 transition-all duration-200",
          isActive ? 'text-primary transform rotate-90' : 'text-muted-foreground'
        )} />
      )}
    </Button>
  );
});

NavigationItem.displayName = 'NavigationItem';