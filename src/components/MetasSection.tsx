
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, TrendingUp, BarChart3 } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

const MetasSection = () => {
  return (
    <div className="p-8">
      <SectionHeader
        title="Metas e Desempenho"
        subtitle="Acompanhamento de produtividade e resultados"
        emoji="🎯"
      />

      <Tabs defaultValue="produtividade" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="produtividade" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Painel de Produtividade
          </TabsTrigger>
          <TabsTrigger value="metas" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Metas por Equipe
          </TabsTrigger>
          <TabsTrigger value="historicos" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Comparativos Históricos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="produtividade" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-primary">87%</div>
              <div className="text-sm text-muted-foreground">Taxa de Resolução</div>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-emerald-600">3.2min</div>
              <div className="text-sm text-muted-foreground">Tempo Médio</div>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600">156</div>
              <div className="text-sm text-muted-foreground">Atendimentos Hoje</div>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600">4.8</div>
              <div className="text-sm text-muted-foreground">Satisfação Média</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Ranking de Produtividade</h2>
            <div className="space-y-3">
              {[
                { nome: 'Ana Silva', atendimentos: 45, resolvidos: 42, tempo: '2.8min' },
                { nome: 'Carlos Santos', atendimentos: 38, resolvidos: 35, tempo: '3.1min' },
                { nome: 'Maria Lima', atendimentos: 41, resolvidos: 37, tempo: '3.3min' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                    <div>
                      <div className="font-medium">{item.nome}</div>
                      <div className="text-sm text-gray-500">{item.atendimentos} atendimentos</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round((item.resolvidos / item.atendimentos) * 100)}% resolvidos</div>
                    <div className="text-sm text-gray-500">{item.tempo} médio</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metas" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Metas por Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { equipe: 'Suporte Técnico', meta: 80, atual: 75, cor: 'blue' },
                { equipe: 'Vendas', meta: 90, atual: 92, cor: 'green' },
                { equipe: 'Atendimento Geral', meta: 85, atual: 82, cor: 'purple' }
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{item.equipe}</h3>
                    <span className="text-sm text-gray-500">{item.atual}% / {item.meta}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-${item.cor}-500 h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${(item.atual / item.meta) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {item.atual >= item.meta ? 'Meta atingida!' : `Faltam ${item.meta - item.atual}% para a meta`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historicos" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Comparativos Históricos</h2>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Gráfico de evolução histórica</p>
                <p className="text-sm text-gray-400">Integração com biblioteca de gráficos em desenvolvimento</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetasSection;
