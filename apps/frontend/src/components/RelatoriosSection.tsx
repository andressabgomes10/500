
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, BarChart3 } from 'lucide-react';

const RelatoriosSection = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📑 Relatórios e Exportações</h1>
        <p className="text-gray-600">Geração e exportação de relatórios detalhados</p>
      </div>

      <Tabs defaultValue="geral" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="geral" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Relatório Geral
          </TabsTrigger>
          <TabsTrigger value="exportar" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar em Excel
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geral" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Relatório Geral - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</h2>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed flex items-center gap-2" disabled>
                <Download className="h-4 w-4" />
                Exportar PDF
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">0</div>
                <div className="text-sm text-gray-500">Total de Atendimentos</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">0%</div>
                <div className="text-sm text-gray-500">Taxa de Resolução</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">0min</div>
                <div className="text-sm text-gray-500">Tempo Médio</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-600">0</div>
                <div className="text-sm text-gray-500">Satisfação Média</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Atendimentos por Canal</h3>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum atendimento ainda</p>
                  <p className="text-sm">Dados aparecerão após atendimentos</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Performance por Operador</h3>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum operador cadastrado</p>
                  <p className="text-sm">Performance aparecerá com operadores ativos</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="exportar" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Exportar Relatórios</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Relatórios Disponíveis</h3>
                <div className="text-center py-8 text-gray-500">
                  <Download className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Nenhum relatório disponível</p>
                  <p className="text-sm">Relatórios aparecerão após atividade no sistema</p>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Configurar Exportação</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Período
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" disabled>
                      <option>Sem dados para exportar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Formato
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center opacity-50">
                        <input type="radio" name="formato" value="excel" className="mr-2" disabled />
                        <span className="text-sm">Excel (.xlsx)</span>
                      </label>
                      <label className="flex items-center opacity-50">
                        <input type="radio" name="formato" value="csv" className="mr-2" disabled />
                        <span className="text-sm">CSV</span>
                      </label>
                      <label className="flex items-center opacity-50">
                        <input type="radio" name="formato" value="pdf" className="mr-2" disabled />
                        <span className="text-sm">PDF</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Incluir
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center opacity-50">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">Dados dos atendimentos</span>
                      </label>
                      <label className="flex items-center opacity-50">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">Métricas de performance</span>
                      </label>
                      <label className="flex items-center opacity-50">
                        <input type="checkbox" className="mr-2" disabled />
                        <span className="text-sm">Gráficos e visualizações</span>
                      </label>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed flex items-center justify-center gap-2" disabled>
                    <Download className="h-4 w-4" />
                    Gerar Relatório
                  </button>
                  
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      Função disponível após dados no sistema
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RelatoriosSection;
