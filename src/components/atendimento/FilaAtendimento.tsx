
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, ArrowRight, AlertTriangle, MessageSquare } from 'lucide-react';

const FilaAtendimento = () => {
  const estatisticasFila = [
    {
      titulo: 'Na Fila',
      valor: '12',
      icone: Users,
      cor: 'blue'
    },
    {
      titulo: 'Tempo Médio de Espera',
      valor: '3.2min',
      icone: Clock,
      cor: 'green'
    },
    {
      titulo: 'Atendimentos Simultâneos',
      valor: '8',
      icone: MessageSquare,
      cor: 'purple'
    },
    {
      titulo: 'Prioridade Alta',
      valor: '3',
      icone: AlertTriangle,
      cor: 'red'
    }
  ];

  const filaEspera = [
    {
      id: 1,
      posicao: 1,
      cliente: 'João Silva',
      canal: 'WhatsApp',
      assunto: 'Problema com pedido #1234',
      tempoEspera: '2min 15s',
      prioridade: 'Alta',
      avatar: 'JS'
    },
    {
      id: 2,
      posicao: 2,
      cliente: 'Maria Santos',
      canal: 'Chat',
      assunto: 'Solicitação de orçamento',
      tempoEspera: '4min 32s',
      prioridade: 'Média',
      avatar: 'MS'
    },
    {
      id: 3,
      posicao: 3,
      cliente: 'Pedro Costa',
      canal: 'Email',
      assunto: 'Dúvida sobre produto',
      tempoEspera: '1min 45s',
      prioridade: 'Baixa',
      avatar: 'PC'
    },
    {
      id: 4,
      posicao: 4,
      cliente: 'Ana Lima',
      canal: 'Telefone',
      assunto: 'Reclamação de qualidade',
      tempoEspera: '6min 12s',
      prioridade: 'Alta',
      avatar: 'AL'
    }
  ];

  const agentesDisponiveis = [
    {
      nome: 'Ana Costa',
      status: 'Disponível',
      especializacao: 'Suporte Técnico',
      atendimentosHoje: 12,
      avatar: 'AC'
    },
    {
      nome: 'Carlos Lima',
      status: 'Disponível',
      especializacao: 'Vendas',
      atendimentosHoje: 8,
      avatar: 'CL'
    },
    {
      nome: 'Maria Santos',
      status: 'Pausa',
      especializacao: 'Qualidade',
      atendimentosHoje: 15,
      avatar: 'MS'
    }
  ];

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'Média': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCanalColor = (canal: string) => {
    switch (canal) {
      case 'WhatsApp': return 'bg-green-100 text-green-800';
      case 'Chat': return 'bg-blue-100 text-blue-800';
      case 'Email': return 'bg-purple-100 text-purple-800';
      case 'Telefone': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Estatísticas da Fila */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {estatisticasFila.map((stat, index) => {
          const Icon = stat.icone;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.titulo}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.valor}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.cor}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.cor}-600`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fila de Espera */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Fila de Espera</h3>
              <Button size="sm" variant="outline">
                Atualizar
              </Button>
            </div>
            
            <div className="space-y-4">
              {filaEspera.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                      {item.posicao}
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-700">{item.avatar}</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900">{item.cliente}</h4>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{item.assunto}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getCanalColor(item.canal)}`}>
                            {item.canal}
                          </span>
                          <span className={`px-2 py-1 rounded border text-xs font-medium ${getPrioridadeColor(item.prioridade)}`}>
                            {item.prioridade}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.tempoEspera}</p>
                        <p className="text-xs text-gray-500">aguardando</p>
                      </div>
                      <Button size="sm" className="flex items-center space-x-1">
                        <span>Atender</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Agentes Disponíveis */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Agentes Disponíveis</h3>
            
            <div className="space-y-4">
              {agentesDisponiveis.map((agente, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">{agente.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{agente.nome}</h4>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          agente.status === 'Disponível' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                        <span className="text-sm text-gray-600">{agente.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><span className="font-medium">Especialização:</span> {agente.especializacao}</p>
                    <p><span className="font-medium">Atendimentos hoje:</span> {agente.atendimentosHoje}</p>
                  </div>
                  
                  {agente.status === 'Disponível' && (
                    <Button size="sm" className="w-full mt-3">
                      Atribuir próximo
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Ações Rápidas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Priorizar Urgentes</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Redistribuir Fila</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Mensagem Automática</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FilaAtendimento;
