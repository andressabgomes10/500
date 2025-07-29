import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus, MessageSquare } from 'lucide-react';

const TicketsAtivos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');

  const tickets = []; // Sistema limpo - sem dados mockados

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Header e Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tickets de Atendimento</h2>
          <p className="text-sm text-gray-600">0 tickets encontrados</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Novo Ticket</span>
        </Button>
      </div>

      {/* Filtros e Busca */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tickets..."
              className="pl-10"
            />
          </div>
          <select 
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="todos">Todos os status</option>
            <option value="novo">Novo</option>
            <option value="em-andamento">Em andamento</option>
            <option value="aguardando">Aguardando cliente</option>
            <option value="resolvido">Resolvido</option>
          </select>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Mais filtros</span>
          </Button>
        </div>
      </Card>

      {/* Lista de Tickets - Vazia */}
      <div className="text-center py-12">
        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum ticket encontrado</h3>
        <p className="text-gray-600 mb-4">
          Tickets de atendimento aparecerão aqui quando criados
        </p>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Criar Primeiro Ticket
        </Button>
      </div>
    </div>
  );
};

export default TicketsAtivos;