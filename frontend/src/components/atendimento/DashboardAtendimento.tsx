import React from 'react';
import { Card } from '@/components/ui/card';
import { MessageSquare, Clock, CheckCircle, Users, TrendingUp, TrendingDown, Star } from 'lucide-react';

const DashboardAtendimento = () => {
  const stats = [
    {
      title: 'Atendimentos Hoje',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: MessageSquare,
      color: 'blue'
    },
    {
      title: 'Tempo Médio de Resposta',
      value: '2.3min',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'green'
    },
    {
      title: 'Taxa de Resolução',
      value: '94.2%',
      change: '+3%',
      trend: 'up',
      icon: CheckCircle,
      color: 'purple'
    },
    {
      title: 'Satisfação Média',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'yellow'
    }
  ];

  const recentActivity = [
    { id: 1, cliente: 'João Silva', acao: 'Iniciou chat', tempo: '2 min atrás', status: 'ativo' },
    { id: 2, cliente: 'Maria Santos', acao: 'Ticket resolvido', tempo: '5 min atrás', status: 'resolvido' },
    { id: 3, cliente: 'Pedro Costa', acao: 'Email respondido', tempo: '8 min atrás', status: 'respondido' },
    { id: 4, cliente: 'Ana Lima', acao: 'Chamada finalizada', tempo: '12 min atrás', status: 'finalizado' }
  ];

  const agentesOnline = [
    { nome: 'Ana Costa', status: 'Disponível', atendimentos: 3, avatar: 'AC' },
    { nome: 'Carlos Lima', status: 'Ocupado', atendimentos: 5, avatar: 'CL' },
    { nome: 'Maria Santos', status: 'Disponível', atendimentos: 2, avatar: 'MS' },
    { nome: 'Pedro Silva', status: 'Pausa', atendimentos: 0, avatar: 'PS' }
  ];

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <div className={`flex items-center mt-2 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon className="h-4 w-4 mr-1" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
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
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'ativo' ? 'bg-green-500' :
                    item.status === 'resolvido' ? 'bg-blue-500' :
                    item.status === 'respondido' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{item.cliente}</p>
                    <p className="text-sm text-gray-600">{item.acao}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{item.tempo}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Agentes Online */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Agentes Online</h3>
          <div className="space-y-4">
            {agentesOnline.map((agente, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{agente.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{agente.nome}</p>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        agente.status === 'Disponível' ? 'bg-green-500' :
                        agente.status === 'Ocupado' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm text-gray-600">{agente.status}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{agente.atendimentos}</p>
                  <p className="text-xs text-gray-500">atendimentos</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Nova seção de Satisfação dos Clientes */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfação dos Clientes - Últimas 24h</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
              <span className="text-3xl font-bold text-gray-900">4.2</span>
            </div>
            <p className="text-sm text-gray-600">Nota Média</p>
            <p className="text-xs text-green-600 mt-1">+0.3 vs ontem</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">87%</p>
            <p className="text-sm text-gray-600">Taxa de Satisfação</p>
            <p className="text-xs text-green-600 mt-1">+5% vs ontem</p>
          </div>
          
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">23</p>
            <p className="text-sm text-gray-600">Avaliações Recebidas</p>
            <p className="text-xs text-blue-600 mt-1">+2 vs ontem</p>
          </div>
        </div>
      </Card>

      {/* Gráfico de Performance */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance dos Últimos 7 Dias</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Gráfico de performance - Em desenvolvimento</p>
        </div>
      </Card>
    </div>
  );
};

export default DashboardAtendimento;
