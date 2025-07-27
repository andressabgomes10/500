import React, { Suspense, memo } from 'react';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';
import { useActiveNavigationItem } from '@/hooks/useNavigation';
import { usePermissions } from '@/hooks/usePermissions';
import { AccessDenied } from '@/components/auth/AccessDenied';

interface ContentRendererProps {
  activeSection: string;
}

const LoadingFallback = memo(() => (
  <EnhancedLoading 
    variant="card" 
    text="Carregando seção..." 
    className="m-4"
  />
));

LoadingFallback.displayName = 'LoadingFallback';

export const ContentRenderer = memo(({ activeSection }: ContentRendererProps) => {
  const navigationItem = useActiveNavigationItem(activeSection);
  const { hasPermission } = usePermissions();
  
  // Verificar permissão antes de renderizar
  if (!hasPermission(activeSection)) {
    return <AccessDenied />;
  }
  
  if (!navigationItem?.component) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center space-y-4">
          <div className="text-6xl text-muted-foreground">🔍</div>
          <h2 className="text-2xl font-semibold text-foreground">
            Seção não encontrada
          </h2>
          <p className="text-muted-foreground max-w-md">
            A seção "{activeSection}" não existe ou não foi configurada corretamente.
          </p>
        </div>
      </div>
    );
  }

  const Component = navigationItem.component;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="animate-fade-in">
        <Component />
      </div>
    </Suspense>
  );
});

ContentRenderer.displayName = 'ContentRenderer';