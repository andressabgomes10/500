import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Clock, CheckCircle, Users, TrendingUp, TrendingDown, Star } from 'lucide-react';

const DashboardAtendimento = () => {
  const stats = [
    {
      title: 'Atendimentos Hoje',
      value: '0',
      change: '',
      trend: 'up',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Tempo Médio de Resposta',
      value: '0min',
      change: '',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Taxa de Resolução',
      value: '0%',
      change: '',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      title: 'Satisfação Média',
      value: '0/5',
      change: '',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    }
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Aguardando dados</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gray-100`}>
                  <Icon className={`h-6 w-6 text-gray-400`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Atividade Recente */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Nenhuma atividade ainda</p>
            <p className="text-sm">Atividades aparecerão aqui</p>
          </div>
        </Card>

        {/* Agentes Online */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agentes Online</h3>
          <div className="text-center py-8 text-gray-500">
            <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Nenhum agente online</p>
            <p className="text-sm">Aguardando login da equipe</p>
          </div>
        </Card>
      </div>

      {/* Resumo Geral */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfação dos Clientes - Últimas 24h</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Star className="h-6 w-6 text-gray-400" />
              <span className="text-3xl font-bold text-gray-600">0</span>
            </div>
            <p className="text-sm text-gray-600">Nota Média</p>
            <p className="text-xs text-gray-500 mt-1">Sem avaliações ainda</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-600 mb-2">0%</p>
            <p className="text-sm text-gray-600">Taxa de Satisfação</p>
            <p className="text-xs text-gray-500 mt-1">Sem dados ainda</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-600 mb-2">0</p>
            <p className="text-sm text-gray-600">Avaliações Recebidas</p>
            <p className="text-xs text-gray-500 mt-1">Nenhuma avaliação</p>
          </div>
        </div>
      </Card>

      {/* Gráfico de Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Últimos 7 Dias</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Sem dados de performance ainda</p>
            <p className="text-sm text-gray-400">Dados aparecerão após atendimentos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardAtendimento;