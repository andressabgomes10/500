import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, MessageSquare, AlertTriangle } from 'lucide-react';

const FilaAtendimento = () => {
  const estatisticasFila = [
    {
      titulo: 'Na Fila',
      valor: '0',
      icone: Users,
      cor: 'blue'
    },
    {
      titulo: 'Tempo Médio de Espera',
      valor: '0min',
      icone: Clock,
      cor: 'green'
    },
    {
      titulo: 'Atendimentos Simultâneos',
      valor: '0',
      icone: MessageSquare,
      cor: 'purple'
    },
    {
      titulo: 'Prioridade Alta',
      valor: '0',
      icone: AlertTriangle,
      cor: 'red'
    }
  ];

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
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <Icon className={`h-6 w-6 text-gray-400`} />
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
            
            <div className="text-center py-8 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum cliente na fila</p>
              <p className="text-sm">Clientes aparecerão aqui quando solicitarem atendimento</p>
            </div>
          </Card>
        </div>

        {/* Agentes Disponíveis */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Agentes Disponíveis</h3>
            
            <div className="text-center py-8 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Nenhum agente disponível</p>
              <p className="text-sm">Agentes aparecerão quando fizerem login</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Ações Rápidas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="flex items-center space-x-2" disabled>
            <AlertTriangle className="h-4 w-4" />
            <span>Priorizar Urgentes</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" disabled>
            <Users className="h-4 w-4" />
            <span>Redistribuir Fila</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2" disabled>
            <MessageSquare className="h-4 w-4" />
            <span>Mensagem Automática</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default FilaAtendimento;