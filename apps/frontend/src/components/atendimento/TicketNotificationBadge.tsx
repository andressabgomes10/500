import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

interface TicketNotificationBadgeProps {
  count: number;
  className?: string;
}

const TicketNotificationBadge = ({ count, className = '' }: TicketNotificationBadgeProps) => {
  if (count === 0) return null;

  return (
    <Badge 
      variant="destructive" 
      className={`absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs ${className}`}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
};

export default TicketNotificationBadge; 