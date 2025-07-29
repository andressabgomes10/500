import React, { useState } from 'react';
import { Settings, Users, Shield, Database, Bell, Key } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/SectionHeader';

const AdministracaoSection = () => {
  const [activeTab, setActiveTab] = useState('usuarios');

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Administração do Sistema"
        subtitle="Gerencie usuários, permissões e configurações do sistema"
        icon={Settings}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Usuários
          </TabsTrigger>
          <TabsTrigger value="permissoes" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Permissões
          </TabsTrigger>
          <TabsTrigger value="sistema" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            Sistema
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="usuarios" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gerenciamento de Usuários</CardTitle>
                <CardDescription>Adicione, edite ou remova usuários do sistema</CardDescription>
              </div>
              <Button>Novo Usuário</Button>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum usuário cadastrado</p>
                <p className="text-sm">Clique em "Novo Usuário" para começar</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissoes" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Perfis de Acesso
                </CardTitle>
                <CardDescription>Configure níveis de acesso por perfil</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Administrador</h4>
                      <Badge variant="outline">Acesso Total</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Acesso completo a todas as funcionalidades</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Supervisor</h4>
                      <Badge variant="outline">Acesso Parcial</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Supervisão de equipe e relatórios</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">Operador</h4>
                      <Badge variant="outline">Acesso Básico</Badge>
                    </div>
                    <p className="text-sm text-gray-600">Atendimento ao cliente</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Módulos do Sistema
                </CardTitle>
                <CardDescription>Controle de acesso por módulo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Dashboard</span>
                    <Badge variant="secondary">Todos</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>WhatsApp Business</span>
                    <Badge variant="secondary">Todos</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Relatórios</span>
                    <Badge variant="outline">Admin/Supervisor</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Administração</span>
                    <Badge variant="outline">Admin</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sistema" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Gerais</CardTitle>
                <CardDescription>Configurações básicas do sistema</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Nome da Empresa</span>
                  <span className="font-semibold">StarPrint Etiquetas</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Versão do Sistema</span>
                  <Badge variant="outline">v2.0</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status do Banco</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Online</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>WhatsApp Service</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">Conectado</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backup e Segurança</CardTitle>
                <CardDescription>Configurações de backup e segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Último Backup</span>
                  <span className="text-sm text-gray-600">Nunca</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Backup Automático</span>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700">Desabilitado</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Fazer Backup Agora
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notificacoes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Central de Notificações
              </CardTitle>
              <CardDescription>Configure alertas e notificações do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma notificação configurada</p>
                <p className="text-sm">Configure alertas para eventos importantes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdministracaoSection;