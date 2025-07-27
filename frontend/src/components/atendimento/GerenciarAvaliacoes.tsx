
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, Search, Filter, TrendingUp, TrendingDown, MessageSquare, User, Calendar } from 'lucide-react';

const GerenciarAvaliacoes = () => {
  const [filtroNota, setFiltroNota] = useState('todas');
  const [busca, setBusca] = useState('');

  const avaliacoes = [
    {
      id: 1,
      ticketId: '#T001',
      cliente: 'João Silva',
      agente: 'Ana Costa',
      nota: 5,
      comentario: 'Excelente atendimento! A Ana foi muito atenciosa e resolveu meu problema rapidamente.',
      data: '2024-01-15 14:30',
      categoria: 'Suporte Técnico',
      tempoResposta: '2min'
    },
    {
      id: 2,
      ticketId: '#T005',
      cliente: 'Maria Santos',
      agente: 'Carlos Lima',
      nota: 4,
      comentario: 'Bom atendimento, mas demorou um pouco para resolver.',
      data: '2024-01-15 13:45',
      categoria: 'Vendas',
      tempoResposta: '5min'
    },
    {
      id: 3,
      ticketId: '#T012',
      cliente: 'Pedro Costa',
      agente: 'Ana Costa',
      nota: 2,
      comentario: 'Atendimento demorado e não resolveu completamente meu problema.',
      data: '2024-01-15 12:20',
      categoria: 'Reclamação',
      tempoResposta: '15min'
    },
    {
      id: 4,
      ticketId: '#T008',
      cliente: 'Ana Lima',
      agente: 'Maria Santos',
      nota: 5,
      comentario: 'Perfeito! Muito profissional e eficiente.',
      data: '2024-01-15 11:10',
      categoria: 'Suporte Técnico',
      tempoResposta: '3min'
    }
  ];

  const estatisticas = {
    mediaGeral: 4.0,
    totalAvaliacoes: 156,
    satisfacao: 78,
    crescimento: 12
  };

  const distribuicaoNotas = [
    { nota: 5, quantidade: 68, percentual: 44 },
    { nota: 4, quantidade: 52, percentual: 33 },
    { nota: 3, quantidade: 23, percentual: 15 },
    { nota: 2, quantidade: 9, percentual: 6 },
    { nota: 1, quantidade: 4, percentual: 2 }
  ];

  const renderEstrelas = (nota: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((estrela) => (
          <Star
            key={estrela}
            className={`h-4 w-4 ${
              estrela <= nota
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getNotaCor = (nota: number) => {
    if (nota >= 4) return 'text-green-600 bg-green-50';
    if (nota === 3) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média Geral</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl font-bold text-gray-900">{estatisticas.mediaGeral}</span>
                {renderEstrelas(Math.round(estatisticas.mediaGeral))}
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Avaliações</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{estatisticas.totalAvaliacoes}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Satisfação</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{estatisticas.satisfacao}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crescimento</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-green-600">+{estatisticas.crescimento}%</span>
                <TrendingUp className="h-4 w-4 text-green-600 ml-1" />
              </div>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Avaliações */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por cliente, agente ou ticket..."
                  className="pl-10"
                />
              </div>
              <select 
                value={filtroNota}
                onChange={(e) => setFiltroNota(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas as notas</option>
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Lista */}
            <div className="space-y-4">
              {avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getNotaCor(avaliacao.nota)}`}>
                        {avaliacao.nota}.0
                      </div>
                      {renderEstrelas(avaliacao.nota)}
                      <span className="text-sm text-gray-500">{avaliacao.data}</span>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {avaliacao.ticketId}
                    </span>
                  </div>

                  <p className="text-gray-900 mb-3">{avaliacao.comentario}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{avaliacao.cliente}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>Agente: {avaliacao.agente}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {avaliacao.categoria}
                      </span>
                      <span className="text-xs">Resp: {avaliacao.tempoResposta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Distribuição de Notas */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Notas</h3>
            <div className="space-y-3">
              {distribuicaoNotas.map((item) => (
                <div key={item.nota} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{item.nota}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.percentual}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{item.quantidade}</div>
                    <div className="text-xs text-gray-500">{item.percentual}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GerenciarAvaliacoes;
