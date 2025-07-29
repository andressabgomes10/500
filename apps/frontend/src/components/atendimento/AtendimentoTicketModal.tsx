import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MessageSquare, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  User, 
  Clock, 
  AlertCircle,
  CheckCircle,
  X,
  FileText,
  Tag,
  Calendar,
  Mail
} from 'lucide-react';

interface Ticket {
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

interface Mensagem {
  id: string;
  remetente: 'cliente' | 'atendente';
  mensagem: string;
  timestamp: string;
  tipo: 'texto' | 'arquivo' | 'sistema';
}

interface AtendimentoTicketModalProps {
  ticket: Ticket | null;
  isOpen: boolean;
  onClose: () => void;
}

const AtendimentoTicketModal = ({ ticket, isOpen, onClose }: AtendimentoTicketModalProps) => {
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState<string>('');
  const [prioridade, setPrioridade] = useState<string>('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
      setPrioridade(ticket.prioridade);
      // Simular mensagens iniciais
      setMensagens([
        {
          id: '1',
          remetente: 'cliente',
          mensagem: ticket.descricao,
          timestamp: ticket.dataCriacao,
          tipo: 'texto'
        }
      ]);
    }
  }, [ticket]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensagens]);

  const enviarMensagem = () => {
    if (!mensagem.trim() || !ticket) return;

    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      remetente: 'atendente',
      mensagem: mensagem,
      timestamp: new Date().toLocaleString('pt-BR'),
      tipo: 'texto'
    };

    setMensagens(prev => [...prev, novaMensagem]);
    setMensagem('');
    setIsTyping(true);

    // Simular resposta do cliente
    setTimeout(() => {
      const respostaCliente: Mensagem = {
        id: (Date.now() + 1).toString(),
        remetente: 'cliente',
        mensagem: 'Obrigado pelo atendimento! Vou aguardar a solução.',
        timestamp: new Date().toLocaleString('pt-BR'),
        tipo: 'texto'
      };
      setMensagens(prev => [...prev, respostaCliente]);
      setIsTyping(false);
    }, 2000);
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

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Ticket #{ticket.id}
                </DialogTitle>
                <p className="text-sm text-gray-600">{ticket.assunto}</p>
              </div>
              <Badge className={getStatusColor(status)}>
                {status === 'novo' && 'Novo'}
                {status === 'em-andamento' && 'Em Andamento'}
                {status === 'aguardando' && 'Aguardando'}
                {status === 'resolvido' && 'Resolvido'}
              </Badge>
              <Badge className={getPrioridadeColor(prioridade)}>
                {prioridade === 'baixa' && 'Baixa'}
                {prioridade === 'media' && 'Média'}
                {prioridade === 'alta' && 'Alta'}
                {prioridade === 'urgente' && 'Urgente'}
              </Badge>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Informações do Ticket */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-auto">
            <div className="space-y-4">
              {/* Informações do Cliente */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Informações do Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ticket.cliente}</p>
                    <p className="text-xs text-gray-600">{ticket.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{ticket.telefone}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Detalhes do Ticket */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Detalhes do Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-700">Status</label>
                    <Select value={status} onValueChange={setStatus}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="novo">Novo</SelectItem>
                        <SelectItem value="em-andamento">Em Andamento</SelectItem>
                        <SelectItem value="aguardando">Aguardando Cliente</SelectItem>
                        <SelectItem value="resolvido">Resolvido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Prioridade</label>
                    <Select value={prioridade} onValueChange={setPrioridade}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Categoria</label>
                    <p className="text-xs text-gray-600">{ticket.categoria}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-700">Criado em</label>
                    <p className="text-xs text-gray-600">{ticket.dataCriacao}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Ações Rápidas */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Phone className="h-3 w-3 mr-2" />
                    Ligar para Cliente
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Mail className="h-3 w-3 mr-2" />
                    Enviar Email
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <CheckCircle className="h-3 w-3 mr-2" />
                    Marcar como Resolvido
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Área do Chat */}
          <div className="flex-1 flex flex-col">
            {/* Header do Chat */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{ticket.cliente}</p>
                    <p className="text-xs text-gray-500">Cliente</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div 
              ref={chatRef}
              className="flex-1 p-4 overflow-auto bg-gray-50 space-y-4"
            >
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.remetente === 'atendente' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.remetente === 'atendente'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.mensagem}</p>
                    <p className={`text-xs mt-1 ${
                      msg.remetente === 'atendente' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-900 border border-gray-200 px-4 py-2 rounded-lg">
                    <p className="text-sm text-gray-500">Cliente está digitando...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex space-x-2">
                <Textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 resize-none"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      enviarMensagem();
                    }
                  }}
                />
                <Button onClick={enviarMensagem} disabled={!mensagem.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AtendimentoTicketModal; 