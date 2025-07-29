import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info';
}

const variantStyles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  danger: 'bg-red-50 border-red-200 text-red-700',
  info: 'bg-blue-50 border-blue-200 text-blue-700'
};

export const StatusCard = ({ icon: Icon, value, label, variant }: StatusCardProps) => (
  <Card className={`${variantStyles[variant]} border`}>
    <CardContent className="p-4">
      <div className="flex items-center space-x-2">
        <Icon className="h-8 w-8" />
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-sm">{label}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);