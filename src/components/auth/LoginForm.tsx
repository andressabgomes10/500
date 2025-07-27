import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Shield, Users, Headphones, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole, roleLabels } from '@/types/auth';

export const LoginForm = () => {
  const [role, setRole] = useState<UserRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    setIsLoading(true);

    // Simular delay de autenticação
    await new Promise(resolve => setTimeout(resolve, 1000));
    login('demo@starprint.com', role as UserRole);
    setIsLoading(false);
  };

  const handleQuickLogin = async (selectedRole: UserRole) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    login('demo@starprint.com', selectedRole);
    setIsLoading(false);
  };

  const clearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const roleIcons = {
    admin: Shield,
    gestao: Users,
    atendente: Headphones
  };

  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageSquare className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">StarPrint CRM</CardTitle>
          <CardDescription>
            Acesse o sistema com seu perfil
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">Perfil de Acesso</label>
              <Select value={role} onValueChange={value => setRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu perfil" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(roleLabels).map(([key, label]) => {
                  const Icon = roleIcons[key as UserRole];
                  return <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {label}
                        </div>
                      </SelectItem>;
                })}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!role || isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Botões de acesso rápido */}
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-center text-muted-foreground">Acesso Rápido:</p>
            <div className="grid grid-cols-1 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('admin')}
                disabled={isLoading}
                className="justify-start"
              >
                <Shield className="h-4 w-4 mr-2" />
                Entrar como Administrador
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('gestao')}
                disabled={isLoading}
                className="justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                Entrar como Gestão
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('atendente')}
                disabled={isLoading}
                className="justify-start"
              >
                <Headphones className="h-4 w-4 mr-2" />
                Entrar como Atendente
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center mb-2">
              <strong>Perfis de Demonstração:</strong>
            </p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                <span><strong>Admin:</strong> Acesso completo</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                <span><strong>Gestão:</strong> Relatórios e monitoramento</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-3 w-3" />
                <span><strong>Atendente:</strong> Apenas atendimento</span>
              </div>
            </div>
          </div>

          {/* Botão de debug */}
          <div className="mt-4 pt-4 border-t">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearStorage}
              className="w-full text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Limpar dados e recarregar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};