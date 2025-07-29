import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus, MessageSquare, User, Clock, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import AtendimentoTicketModal from './AtendimentoTicketModal';
import TicketNotificationBadge from './TicketNotificationBadge';
import { useTickets, type Ticket } from '@/hooks/useTickets';

const TicketsAtivos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { 
    tickets, 
    loading, 
    error, 
    filterTickets, 
    getStats 
  } = useTickets();

  // Filtrar tickets
  const filteredTickets = filterTickets(searchTerm, filtroStatus);
  const stats = getStats();



  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo': return 'bg-blue-100 text-blue-800';
      case 'em-andamento': return 'bg-yellow-100 text-yellow-800';
      case 'aguardando': return 'bg-orange-100 text-orange-800';
      case 'resolvido': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'baixa': return 'bg-gray-100 text-gray-800';
      case 'media': return 'bg-blue-100 text-blue-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'urgente': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'novo': return <AlertCircle className="h-4 w-4" />;
      case 'em-andamento': return <Clock className="h-4 w-4" />;
      case 'aguardando': return <MessageSquare className="h-4 w-4" />;
      case 'resolvido': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 h-full overflow-auto">
      {/* Header e Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Tickets de Atendimento</h2>
          <p className="text-sm text-gray-600">
            {filteredTickets.length} tickets encontrados
            {stats.novos > 0 && (
              <span className="ml-2 text-blue-600 font-medium">
                • {stats.novos} novo{stats.novos > 1 ? 's' : ''}
              </span>
            )}
          </p>
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
            aria-label="Filtrar por status"
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

      {/* Estados de Loading e Erro */}
      {loading && (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Carregando tickets...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erro ao carregar tickets</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Tentar Novamente
          </Button>
        </div>
      )}

      {/* Lista de Tickets */}
      {!loading && !error && filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Card 
              key={ticket.id} 
              className="cursor-pointer hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-blue-300"
              onClick={() => handleTicketClick(ticket)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-gray-900">#{ticket.id}</h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">
                          {ticket.status === 'novo' && 'Novo'}
                          {ticket.status === 'em-andamento' && 'Em Andamento'}
                          {ticket.status === 'aguardando' && 'Aguardando'}
                          {ticket.status === 'resolvido' && 'Resolvido'}
                        </span>
                      </Badge>
                      <Badge className={getPrioridadeColor(ticket.prioridade)}>
                        {ticket.prioridade === 'baixa' && 'Baixa'}
                        {ticket.prioridade === 'media' && 'Média'}
                        {ticket.prioridade === 'alta' && 'Alta'}
                        {ticket.prioridade === 'urgente' && 'Urgente'}
                      </Badge>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 mb-1">{ticket.assunto}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{ticket.descricao}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{ticket.cliente}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{ticket.dataCriacao}</span>
                        </div>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {ticket.categoria}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="ml-4">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !loading && !error ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum ticket encontrado</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filtroStatus !== 'todos' 
              ? 'Tente ajustar os filtros de busca'
              : 'Tickets de atendimento aparecerão aqui quando criados'
            }
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Ticket
          </Button>
        </div>
      ) : null}

      {/* Modal de Atendimento */}
      <AtendimentoTicketModal
        ticket={selectedTicket}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTicket(null);
        }}
      />
    </div>
  );
};

export default TicketsAtivos;