import React, { useState } from 'react';
import { Target, TrendingUp, Users, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/shared/SectionHeader';

const MetasSection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Gestão de Metas"
        subtitle="Acompanhe o desempenho das equipes e metas individuais"
        icon={Target}
      />

      <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="diario">Diário</TabsTrigger>
          <TabsTrigger value="semanal">Semanal</TabsTrigger>
          <TabsTrigger value="mensal">Mensal</TabsTrigger>
        </TabsList>

        <TabsContent value="mensal" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Metas de Equipe */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Metas por Equipe
                </CardTitle>
                <CardDescription>Performance das equipes neste mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma equipe cadastrada</p>
                  <p className="text-sm">Configure suas equipes primeiro</p>
                </div>
              </CardContent>
            </Card>

            {/* Performance Individual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Individual
                </CardTitle>
                <CardDescription>Top performers do mês</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum operador cadastrado</p>
                  <p className="text-sm">Cadastre operadores para ver performance</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo Geral */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Resumo Geral do Mês</CardTitle>
              <CardDescription>Visão consolidada de todas as metas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Metas Definidas</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Metas Atingidas</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">0%</div>
                  <div className="text-sm text-gray-500">Taxa de Sucesso</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">0</div>
                  <div className="text-sm text-gray-500">Operadores Ativos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="semanal" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Metas Semanais</CardTitle>
              <CardDescription>Performance da semana atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma meta semanal configurada</p>
                <p className="text-sm">Configure metas para acompanhar performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diario" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Metas Diárias</CardTitle>
              <CardDescription>Performance do dia atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhuma meta diária configurada</p>
                <p className="text-sm">Configure metas para acompanhar performance</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetasSection;