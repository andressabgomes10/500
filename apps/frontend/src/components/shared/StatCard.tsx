import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  alert?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendValue, 
  icon: Icon, 
  description, 
  alert 
}: StatCardProps) => (
  <Card className="group relative overflow-hidden bg-card hover:shadow-lg transition-all duration-300">
    <div className="absolute inset-0 bg-gradient-to-r from-muted/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <CardHeader className="pb-3 relative z-10">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <div className="flex items-center space-x-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary to-primary/80 shadow-lg">
              <Icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-muted-foreground tracking-wide uppercase">
                {title}
              </CardTitle>
              {trendValue && (
                <div className={`flex items-center text-xs font-medium ${
                  trend === 'up' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {trend === 'up' ? 
                    <TrendingUp className="h-3 w-3 mr-1" /> : 
                    <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {trendValue}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl font-bold text-foreground tracking-tight">{value}</div>
            <p className="text-sm text-muted-foreground font-medium">{subtitle}</p>
          </div>
        </div>
      </div>
    </CardHeader>
    {description && (
      <CardContent className="pt-0 pb-4 relative z-10">
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{description}</p>
        {alert && (
          <Badge variant="destructive" className="text-xs font-medium">
            <AlertCircle className="h-3 w-3 mr-1" />
            {alert}
          </Badge>
        )}
      </CardContent>
    )}
  </Card>
);