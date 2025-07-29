import React from 'react';
import { Monitor, Users, Phone, MessageSquare, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/SectionHeader';

const MonitoramentoSection = () => {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Monitoramento em Tempo Real"
        subtitle="Acompanhe atendimentos e status de canais em tempo real"
        icon={Monitor}
      />

      <Tabs defaultValue="canais" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="canais" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Painel por Canal
          </TabsTrigger>
          <TabsTrigger value="operadores" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Operadores
          </TabsTrigger>
          <TabsTrigger value="metricas" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Métricas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="canais" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-medium">WhatsApp</h3>
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Ativos</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h3 className="font-medium">Email</h3>
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Ativos</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <h3 className="font-medium">Telefone</h3>
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Ativos</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <h3 className="font-medium">Chat Site</h3>
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Ativos</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Status por Canal em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Monitor className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum canal ativo</p>
                <p className="text-sm">Configure seus canais de atendimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operadores" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Operadores Online
              </CardTitle>
              <CardDescription>Status atual da equipe de atendimento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum operador online</p>
                <p className="text-sm">Aguardando login da equipe</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metricas" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Métricas de Atendimento</CardTitle>
                <CardDescription>Dados em tempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Tempo médio de espera</span>
                    <span className="font-semibold">0min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxa de resolução</span>
                    <span className="font-semibold">0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Satisfação média</span>
                    <span className="font-semibold">0.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertas do Sistema</CardTitle>
                <CardDescription>Notificações importantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Monitor className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum alerta ativo</p>
                  <p className="text-sm">Sistema funcionando normalmente</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoramentoSection;