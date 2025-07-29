import { useState, useEffect } from 'react';

export interface Ticket {
  id: string;
  cliente: string;
  email: string;
  telefone: string;
  assunto: string;
  descricao: string;
  status: 'novo' | 'em-andamento' | 'aguardando' | 'resolvido';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  categoria: string;
  dataCriacao: string;
  ultimaAtualizacao: string;
}

export interface Mensagem {
  id: string;
  remetente: 'cliente' | 'atendente';
  mensagem: string;
  timestamp: string;
  tipo: 'texto' | 'arquivo' | 'sistema';
}

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dados de exemplo para demonstração
  const mockTickets: Ticket[] = [
    {
      id: '001',
      cliente: 'João Silva',
      email: 'joao.silva@email.com',
      telefone: '(11) 99999-9999',
      assunto: 'Problema com impressão de etiquetas',
      descricao: 'Estou tendo dificuldades para imprimir etiquetas no tamanho correto. As etiquetas estão saindo cortadas.',
      status: 'novo',
      prioridade: 'alta',
      categoria: 'Impressão',
      dataCriacao: '15/12/2024 09:30',
      ultimaAtualizacao: '15/12/2024 09:30'
    },
    {
      id: '002',
      cliente: 'Maria Santos',
      email: 'maria.santos@empresa.com',
      telefone: '(11) 88888-8888',
      assunto: 'Solicitação de orçamento',
      descricao: 'Preciso de um orçamento para 1000 etiquetas personalizadas para meu produto.',
      status: 'em-andamento',
      prioridade: 'media',
      categoria: 'Orçamento',
      dataCriacao: '14/12/2024 14:15',
      ultimaAtualizacao: '15/12/2024 10:45'
    },
    {
      id: '003',
      cliente: 'Carlos Oliveira',
      email: 'carlos.oliveira@loja.com',
      telefone: '(11) 77777-7777',
      assunto: 'Defeito no produto recebido',
      descricao: 'Recebi as etiquetas mas algumas estão com defeito na impressão. Preciso de reposição.',
      status: 'aguardando',
      prioridade: 'urgente',
      categoria: 'Defeito',
      dataCriacao: '13/12/2024 16:20',
      ultimaAtualizacao: '14/12/2024 11:30'
    }
  ];

  // Carregar tickets
  const loadTickets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simular chamada para API
      await new Promise(resolve => setTimeout(resolve, 500));
      setTickets(mockTickets);
    } catch (err) {
      setError('Erro ao carregar tickets');
      console.error('Erro ao carregar tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  // Atualizar status do ticket
  const updateTicketStatus = async (ticketId: string, newStatus: Ticket['status']) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              status: newStatus, 
              ultimaAtualizacao: new Date().toLocaleString('pt-BR') 
            }
          : ticket
      )
    );
  };

  // Atualizar prioridade do ticket
  const updateTicketPriority = async (ticketId: string, newPriority: Ticket['prioridade']) => {
    setTickets(prev => 
      prev.map(ticket => 
        ticket.id === ticketId 
          ? { 
              ...ticket, 
              prioridade: newPriority, 
              ultimaAtualizacao: new Date().toLocaleString('pt-BR') 
            }
          : ticket
      )
    );
  };

  // Adicionar mensagem ao ticket
  const addMessageToTicket = async (ticketId: string, message: Omit<Mensagem, 'id' | 'timestamp'>) => {
    const newMessage: Mensagem = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('pt-BR')
    };

    // Aqui você pode implementar a lógica para salvar a mensagem no backend
    console.log('Nova mensagem para ticket', ticketId, ':', newMessage);
    
    return newMessage;
  };

  // Filtrar tickets
  const filterTickets = (searchTerm: string, statusFilter: string) => {
    return tickets.filter(ticket => {
      const matchesSearch = ticket.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.assunto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.id.includes(searchTerm);
      const matchesStatus = statusFilter === 'todos' || ticket.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  // Estatísticas
  const getStats = () => {
    const total = tickets.length;
    const novos = tickets.filter(t => t.status === 'novo').length;
    const emAndamento = tickets.filter(t => t.status === 'em-andamento').length;
    const aguardando = tickets.filter(t => t.status === 'aguardando').length;
    const resolvidos = tickets.filter(t => t.status === 'resolvido').length;
    const urgentes = tickets.filter(t => t.prioridade === 'urgente').length;

    return {
      total,
      novos,
      emAndamento,
      aguardando,
      resolvidos,
      urgentes
    };
  };

  useEffect(() => {
    loadTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    loadTickets,
    updateTicketStatus,
    updateTicketPriority,
    addMessageToTicket,
    filterTickets,
    getStats
  };
}; 