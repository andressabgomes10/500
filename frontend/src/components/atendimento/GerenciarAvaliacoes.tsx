import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, Search, Filter, TrendingUp, MessageSquare } from 'lucide-react';

const GerenciarAvaliacoes = () => {
  const [filtroNota, setFiltroNota] = useState('todas');
  const [busca, setBusca] = useState('');

  const avaliacoes = []; // Sistema limpo - sem dados mockados

  const estatisticas = {
    mediaGeral: 0,
    totalAvaliacoes: 0,
    satisfacao: 0,
    crescimento: 0
  };

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

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Média Geral</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-2xl font-bold text-gray-600">{estatisticas.mediaGeral}</span>
                {renderEstrelas(Math.round(estatisticas.mediaGeral))}
              </div>
            </div>
            <Star className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Avaliações</p>
              <p className="text-2xl font-bold text-gray-600 mt-2">{estatisticas.totalAvaliacoes}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Taxa de Satisfação</p>
              <p className="text-2xl font-bold text-gray-600 mt-2">{estatisticas.satisfacao}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-gray-400" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Crescimento</p>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-gray-600">{estatisticas.crescimento}%</span>
              </div>
            </div>
            <div className="h-8 w-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-gray-400" />
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

            {/* Lista Vazia */}
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação ainda</h3>
              <p className="text-gray-600">
                Avaliações dos clientes aparecerão aqui após os atendimentos
              </p>
            </div>
          </Card>
        </div>

        {/* Distribuição de Notas */}
        <div>
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Notas</h3>
            <div className="text-center py-8 text-gray-500">
              <Star className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Sem avaliações ainda</p>
              <p className="text-sm">Distribuição aparecerá com as avaliações</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GerenciarAvaliacoes;