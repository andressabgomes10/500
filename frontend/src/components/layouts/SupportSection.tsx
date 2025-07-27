import React from 'react';
import { Button } from '@/components/ui/button';

export const SupportSection = () => {
  return (
    <div className="p-4 border-t bg-gradient-to-r from-muted/50 to-background">
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-5 border border-primary/20">
        <h3 className="text-sm font-bold text-foreground mb-2">
          Central de Suporte
        </h3>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Etiquetas e Rótulos de Qualidade Desde 1996
        </p>
        <Button 
          className="w-full" 
          size="sm"
        >
          Obter Ajuda
        </Button>
      </div>
    </div>
  );
};