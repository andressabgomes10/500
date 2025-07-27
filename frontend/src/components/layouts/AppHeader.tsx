import React from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { roleLabels } from '@/types/auth';

interface AppHeaderProps {
  onMenuClick: () => void;
  activeSection: string;
}

export const AppHeader = ({ onMenuClick, activeSection }: AppHeaderProps) => {
  const { user } = useAuth();
  const getSectionTitle = (section: string) => {
    const titles: Record<string, string> = {
      dashboard: 'Dashboard',
      equipe: 'Equipe',
      escalas: 'Escalas',
      metas: 'Metas',
      atendimento: 'Atendimento',
      monitoramento: 'Monitoramento',
      relatorios: 'Relatórios',
      administracao: 'Administração'
    };
    return titles[section] || 'StarPrint CRM';
  };

  return (
    <header className="bg-background border-b px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="h-9 w-9"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-lg font-semibold text-foreground">
            {getSectionTitle(activeSection)}
          </h1>
          <p className="text-xs text-muted-foreground">
            {user && `${roleLabels[user.role]} • StarPrint CRM`}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <Bell className="h-4 w-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>
      </div>
    </header>
  );
};