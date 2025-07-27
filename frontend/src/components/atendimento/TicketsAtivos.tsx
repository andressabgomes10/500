import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus, Clock, User, MessageSquare, AlertCircle, Star } from 'lucide-react';
import AvaliacaoModal from './AvaliacaoModal';

const TicketsAtivos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [avaliacaoModal, setAvaliacaoModal] = useState<{
    isOpen: boolean;
    ticketId: string;
    clienteNome: string;
    agenteNome: string;
  }>({
    isOpen: false,
    ticketId: '',
    clienteNome: '',
    agenteNome: ''
  });

  const tickets = [
    {
      id: '#T001',
      titulo: 'Problema com qualidade das etiquetas',
      cliente: 'João Silva',
      status: 'Em andamento',
      prioridade: 'Alta',
      agente: 'Ana Costa',
      categoria: 'Qualidade',
      criado: '2 horas atrás',
      ultimaAtualizacao: '30 min atrás',
      respostas: 5
    },
    {
      id: '#T002',
      titulo: 'Solicitação de orçamento personalizado',
      cliente: 'Maria Santos',
      status: 'Novo',
      prioridade: 'Média',
      agente: 'Não atribuído',
      categoria: 'Vendas',
      criado: '1 hora atrás',
      ultimaAtualizacao: '1 hora atrás',
      respostas: 1
    },
    {
      id: '#T003',
      titulo: 'Atraso na entrega do pedido #1234',
      cliente: 'Pedro Costa',
      status: 'Aguardando cliente',
      prioridade: 'Alta',
      agente: 'Carlos Lima',
      categoria: 'Logística',
      criado: '4 horas atrás',
      ultimaAtualizacao: '2 horas atrás',
      respostas: 8
    },
    {
      id: '#T004',
      titulo: 'Dúvida sobre especificações técnicas',
      cliente: 'Ana Lima',
      status: 'Resolvido',
      prioridade: 'Baixa',
      agente: 'Maria Santos',
      categoria: 'Suporte',
      criado: '1 dia atrás',
      ultimaAtualizacao: '3 horas atrás',
      respostas: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo': return 'bg-blue-100 text-blue-800';
      case 'Em andamento': return 'bg-yellow-100 text-yellow-800';
      case 'Aguardando cliente': return 'bg-orange-100 text-orange-800';
      case 'Resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'Alta': return 'bg-red-100 text-red-800';
      case 'Média': return 'bg-yellow-100 text-yellow-800';
      case 'Baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeIcon = (prioridade: string) => {
    if (prioridade === 'Alta') return <AlertCircle className="h-4 w-4" />;
    return null;
  };

  const handleFinalizarComAvaliacao = (ticket: any) => {
    setAvaliacaoModal({
      isOpen: true,
      ticketId: ticket.id,
      clienteNome: ticket.cliente,
      agenteNome: ticket.agente
    });
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Header e Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tickets de Atendimento</h2>
          <p className="text-sm text-gray-600">{tickets.length} tickets encontrados</p>
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

      {/* Lista de Tickets */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-mono text-sm text-blue-600 font-medium">{ticket.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPrioridadeColor(ticket.prioridade)}`}>
                    {getPrioridadeIcon(ticket.prioridade)}
                    <span>{ticket.prioridade}</span>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {ticket.categoria}
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-2">{ticket.titulo}</h3>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{ticket.cliente}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Criado {ticket.criado}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{ticket.respostas} respostas</span>
                  </div>
                </div>
                
                <div className="mt-3 text-sm text-gray-600">
                  <span>Agente: </span>
                  <span className={ticket.agente === 'Não atribuído' ? 'text-orange-600' : 'text-gray-900'}>
                    {ticket.agente}
                  </span>
                  <span className="mx-2">•</span>
                  <span>Última atualização: {ticket.ultimaAtualizacao}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="outline" size="sm">
                  Ver detalhes
                </Button>
                {ticket.status !== 'Resolvido' && (
                  <>
                    <Button size="sm">
                      Responder
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleFinalizarComAvaliacao(ticket)}
                      className="flex items-center space-x-1"
                    >
                      <Star className="h-4 w-4" />
                      <span>Finalizar</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-600">
          Mostrando 1-4 de 4 tickets
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próximo
          </Button>
        </div>
      </div>

      {/* Modal de Avaliação */}
      <AvaliacaoModal
        isOpen={avaliacaoModal.isOpen}
        onClose={() => setAvaliacaoModal(prev => ({ ...prev, isOpen: false }))}
        ticketId={avaliacaoModal.ticketId}
        clienteNome={avaliacaoModal.clienteNome}
        agenteNome={avaliacaoModal.agenteNome}
      />
    </div>
  );
};

export default TicketsAtivos;
