
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Activity } from 'lucide-react';

const MonitoramentoSection = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📡 Monitoramento ao Vivo</h1>
        <p className="text-gray-600">Acompanhamento em tempo real dos atendimentos</p>
      </div>

      <Tabs defaultValue="canais" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="canais" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Painel por Canal
          </TabsTrigger>
          <TabsTrigger value="ocupacao" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Ocupação e Tempo Médio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="canais" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { canal: 'WhatsApp', ativo: 45, fila: 12, cor: 'green' },
              { canal: 'Email', ativo: 23, fila: 8, cor: 'blue' },
              { canal: 'Telefone', ativo: 15, fila: 5, cor: 'purple' },
              { canal: 'Chat Site', ativo: 8, fila: 3, cor: 'orange' }
            ].map((item, i) => (
              <div key={i} className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">{item.canal}</h3>
                  <div className={`w-3 h-3 rounded-full bg-${item.cor}-500`}></div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ativos:</span>
                    <span className="font-medium">{item.ativo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Na fila:</span>
                    <span className="font-medium">{item.fila}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Status por Canal em Tempo Real</h2>
            <div className="space-y-4">
              {[
                { canal: 'WhatsApp', operadores: 8, ocupacao: 85, tempoMedio: '2.1min' },
                { canal: 'Email', operadores: 5, ocupacao: 70, tempoMedio: '8.5min' },
                { canal: 'Telefone', operadores: 4, ocupacao: 90, tempoMedio: '3.8min' },
                { canal: 'Chat Site', operadores: 2, ocupacao: 60, tempoMedio: '1.9min' }
              ].map((item, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">{item.canal}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{item.operadores} operadores</span>
                      <span>Tempo médio: {item.tempoMedio}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 w-16">Ocupação:</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          item.ocupacao >= 90 ? 'bg-red-500' :
                          item.ocupacao >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${item.ocupacao}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium w-12">{item.ocupacao}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ocupacao" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Ocupação Geral da Equipe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">78%</div>
                <div className="text-sm text-blue-600">Ocupação Média</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-700">3.2min</div>
                <div className="text-sm text-green-600">Tempo Médio de Atendimento</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-700">1.8min</div>
                <div className="text-sm text-purple-600">Tempo Médio de Espera</div>
              </div>
            </div>

            <h3 className="font-medium text-gray-900 mb-4">Operadores Ativos</h3>
            <div className="space-y-3">
              {[
                { nome: 'Ana Costa', status: 'Em atendimento', canal: 'WhatsApp', tempo: '5:23', ocupacao: 95 },
                { nome: 'Carlos Lima', status: 'Disponível', canal: '-', tempo: '-', ocupacao: 45 },
                { nome: 'Maria Santos', status: 'Em atendimento', canal: 'Email', tempo: '12:45', ocupacao: 85 },
                { nome: 'Pedro Oliveira', status: 'Pausa', canal: '-', tempo: '3:15', ocupacao: 0 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'Em atendimento' ? 'bg-green-500' :
                      item.status === 'Disponível' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <div className="font-medium">{item.nome}</div>
                      <div className="text-sm text-gray-500">{item.status} {item.canal && `- ${item.canal}`}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.ocupacao}% ocupação</div>
                    <div className="text-sm text-gray-500">{item.tempo}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MonitoramentoSection;
