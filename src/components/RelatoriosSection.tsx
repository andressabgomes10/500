
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download } from 'lucide-react';

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
              <h2 className="text-xl font-semibold">Relatório Geral - Junho 2025</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Exportar PDF
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">2,145</div>
                <div className="text-sm text-blue-600">Total de Atendimentos</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">87%</div>
                <div className="text-sm text-green-600">Taxa de Resolução</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-700">3.2min</div>
                <div className="text-sm text-purple-600">Tempo Médio</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-700">4.8</div>
                <div className="text-sm text-orange-600">Satisfação Média</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Atendimentos por Canal</h3>
                <div className="space-y-3">
                  {[
                    { canal: 'WhatsApp', quantidade: 1200, percentual: 56 },
                    { canal: 'Email', quantidade: 580, percentual: 27 },
                    { canal: 'Telefone', quantidade: 245, percentual: 11 },
                    { canal: 'Chat Site', quantidade: 120, percentual: 6 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm">{item.canal}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${item.percentual}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-12">{item.percentual}%</span>
                        <span className="text-sm text-gray-500 w-16">({item.quantidade})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Performance por Operador</h3>
                <div className="space-y-3">
                  {[
                    { nome: 'Ana Costa', atendimentos: 324, resolucao: 92 },
                    { nome: 'Carlos Lima', atendimentos: 298, resolucao: 89 },
                    { nome: 'Maria Santos', atendimentos: 276, resolucao: 85 },
                    { nome: 'Pedro Oliveira', atendimentos: 245, resolucao: 88 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span>{item.nome}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">{item.atendimentos} atend.</span>
                        <span className="font-medium">{item.resolucao}% resolução</span>
                      </div>
                    </div>
                  ))}
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
                <div className="space-y-3">
                  {[
                    { nome: 'Atendimentos Completo', descricao: 'Todos os atendimentos com detalhes', periodo: 'Últimos 30 dias' },
                    { nome: 'Performance da Equipe', descricao: 'Métricas de produtividade', periodo: 'Mês atual' },
                    { nome: 'Satisfação do Cliente', descricao: 'Pesquisas e avaliações', periodo: 'Últimos 3 meses' },
                    { nome: 'Análise por Canal', descricao: 'Breakdown por canal de atendimento', periodo: 'Personalizado' }
                  ].map((item, i) => (
                    <div key={i} className="border rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.nome}</h4>
                          <p className="text-xs text-gray-600 mt-1">{item.descricao}</p>
                          <span className="text-xs text-blue-600 mt-1 inline-block">{item.periodo}</span>
                        </div>
                        <button className="ml-3 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          Excel
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Configurar Exportação</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Período
                    </label>
                    <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                      <option>Últimos 7 dias</option>
                      <option>Últimos 30 dias</option>
                      <option>Mês atual</option>
                      <option>Período personalizado</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Formato
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="formato" value="excel" className="mr-2" defaultChecked />
                        <span className="text-sm">Excel (.xlsx)</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="formato" value="csv" className="mr-2" />
                        <span className="text-sm">CSV</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="formato" value="pdf" className="mr-2" />
                        <span className="text-sm">PDF</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Incluir
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Dados dos atendimentos</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" defaultChecked />
                        <span className="text-sm">Métricas de performance</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">Gráficos e visualizações</span>
                      </label>
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Gerar Relatório
                  </button>
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
