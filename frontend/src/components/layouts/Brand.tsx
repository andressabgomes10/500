import React from 'react';
import { MessageSquare } from 'lucide-react';

export const Brand = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
        <MessageSquare className="h-7 w-7 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-foreground">StarPrint CRM</h1>
        <p className="text-xs text-muted-foreground font-medium">Sistema de Atendimento</p>
      </div>
    </div>
  );
};