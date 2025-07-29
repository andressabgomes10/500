import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { QRCodeSVG } from 'qrcode.react';
import { 
  MessageSquare, 
  Smartphone, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Ticket,
  RefreshCw
} from 'lucide-react';

const WhatsAppSection = () => {
  const [whatsappStatus, setWhatsappStatus] = useState({
    connected: false,
    status: 'disconnected',
    user: null
  });
  
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [manualMessage, setManualMessage] = useState({ phone: '', message: '' });

  const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL || "http://localhost:8001";

  // Verificar status e QR code
  useEffect(() => {
    checkWhatsAppStatus();
    fetchQRCode();
    fetchTickets();
    fetchCustomers();
    
    // Polling a cada 5 segundos
    const interval = setInterval(() => {
      checkWhatsAppStatus();
      if (!whatsappStatus.connected) {
        fetchQRCode();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/status`);
      const data = await response.json();
      setWhatsappStatus(data);
      
      if (data.connected) {
        setQrCode(null);
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setWhatsappStatus({ connected: false, status: 'error', user: null });
    }
  };

  const fetchQRCode = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/qr`);
      const data = await response.json();
      setQrCode(data.qr);
    } catch (error) {
      console.error('Erro ao buscar QR code:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/tickets`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      console.error('Erro ao buscar tickets:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/customers`);
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  const sendManualMessage = async () => {
    if (!manualMessage.phone || !manualMessage.message) {
      alert('Preencha telefone e mensagem');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${backendUrl}/api/whatsapp/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: manualMessage.phone,
          message: manualMessage.message
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Mensagem enviada com sucesso!');
        setManualMessage({ phone: '', message: '' });
      } else {
        alert('Erro ao enviar mensagem: ' + result.error);
      }
    } catch (error) {
      alert('Erro ao enviar mensagem: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      connected: { color: 'bg-green-500', text: 'Conectado', icon: CheckCircle },
      connecting: { color: 'bg-yellow-500', text: 'Conectando', icon: Clock },
      qr_generated: { color: 'bg-blue-500', text: 'QR Gerado', icon: Smartphone },
      disconnected: { color: 'bg-red-500', text: 'Desconectado', icon: AlertCircle },
      error: { color: 'bg-red-500', text: 'Erro', icon: AlertCircle }
    };

    const config = statusConfig[status] || statusConfig.disconnected;
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const getTicketStatusColor = (status) => {
    const colors = {
      'aberto': 'bg-blue-100 text-blue-800',
      'em_andamento': 'bg-yellow-100 text-yellow-800',
      'resolvido': 'bg-green-100 text-green-800',
      'fechado': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || colors.aberto;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">WhatsApp Business</h2>
          <p className="text-muted-foreground">
            Gerencie atendimento via WhatsApp
          </p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Status da Conexão
            </div>
            {getStatusBadge(whatsappStatus.status)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {whatsappStatus.connected ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>WhatsApp conectado com sucesso!</strong>
                <br />
                Usuário: {whatsappStatus.user?.name || whatsappStatus.user?.id || 'Usuário conectado'}
                <br />
                <small className="text-muted-foreground">
                  Os clientes podem agora enviar mensagens e criar tickets de suporte.
                </small>
              </AlertDescription>
            </Alert>
          ) : whatsappStatus.status === 'error' ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Erro de conexão!</strong>
                <br />
                Verifique se o serviço WhatsApp está rodando e tente novamente.
              </AlertDescription>
            </Alert>
          ) : qrCode ? (
            <div className="text-center space-y-4">
              <Alert>
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  <strong>Escaneie o QR Code com seu WhatsApp</strong>
                  <br />
                  Abra o WhatsApp → Configurações → Aparelhos conectados → Conectar aparelho
                </AlertDescription>
              </Alert>
              
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg border">
                  <QRCodeSVG value={qrCode} size={200} />
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                O QR Code expira em 60 segundos e será renovado automaticamente.
              </p>
            </div>
          ) : (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Aguardando geração do QR Code...
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Tabs para diferentes seções */}
      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Tickets de Suporte</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
          <TabsTrigger value="send">Enviar Mensagem</TabsTrigger>
        </TabsList>

        {/* Tickets */}
        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                Tickets Recentes ({tickets.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum ticket encontrado
                </p>
              ) : (
                <div className="space-y-3">
                  {tickets.slice(0, 10).map((ticket) => (
                    <div key={ticket.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">#{ticket.id.substring(0, 8)}</Badge>
                          <Badge className={getTicketStatusColor(ticket.status)}>
                            {ticket.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      
                      <h4 className="font-medium mb-1">{ticket.subject}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Cliente: {ticket.customer_phone}
                        {ticket.assigned_agent && ` • Agente: ${ticket.assigned_agent}`}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Clientes */}
        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Clientes WhatsApp ({customers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {customers.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum cliente encontrado
                </p>
              ) : (
                <div className="space-y-3">
                  {customers.slice(0, 10).map((customer) => (
                    <div key={customer.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {customer.name || customer.phone_number}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {customer.phone_number}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">
                            {customer.total_tickets} tickets
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Último contato: {new Date(customer.last_contact).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enviar Mensagem */}
        <TabsContent value="send" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="w-5 h-5 mr-2" />
                Enviar Mensagem Manual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Telefone (com código do país)</label>
                <Input
                  placeholder="5511999999999"
                  value={manualMessage.phone}
                  onChange={(e) => setManualMessage(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!whatsappStatus.connected}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Ex: 5511999999999 (55 = Brasil, 11 = SP, 999999999 = número)
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium">Mensagem</label>
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={manualMessage.message}
                  onChange={(e) => setManualMessage(prev => ({ ...prev, message: e.target.value }))}
                  disabled={!whatsappStatus.connected}
                  rows={4}
                />
              </div>
              
              <Button 
                onClick={sendManualMessage}
                disabled={!whatsappStatus.connected || loading || !manualMessage.phone || !manualMessage.message}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {loading ? 'Enviando...' : 'Enviar Mensagem'}
              </Button>
              
              {!whatsappStatus.connected && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    WhatsApp deve estar conectado para enviar mensagens.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Comandos Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Comandos Disponíveis para Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Criar Ticket:</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                suporte: descrição do problema
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Ver Status:</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                status 12345678
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Listar Tickets:</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                meus tickets
              </code>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Ajuda:</h4>
              <code className="text-sm bg-muted p-2 rounded block">
                ajuda
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppSection;