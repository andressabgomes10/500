# Guia de Atendimento de Tickets - StarPrint CRM

## Visão Geral

O sistema de atendimento de tickets permite que você gerencie e responda aos chamados dos clientes de forma eficiente através de uma interface integrada de chat.

## Funcionalidades Principais

### 1. Lista de Tickets
- **Visualização**: Lista todos os tickets com informações essenciais
- **Filtros**: Busca por texto, filtro por status
- **Status**: Novo, Em Andamento, Aguardando, Resolvido
- **Prioridades**: Baixa, Média, Alta, Urgente
- **Indicadores**: Badges coloridos para status e prioridade

### 2. Modal de Atendimento
- **Interface Dividida**: Informações do ticket + Chat integrado
- **Informações do Cliente**: Nome, email, telefone
- **Detalhes do Ticket**: Status, prioridade, categoria, datas
- **Chat em Tempo Real**: Comunicação direta com o cliente
- **Ações Rápidas**: Ligar, enviar email, marcar como resolvido

### 3. Sistema de Chat
- **Mensagens Bidirecionais**: Cliente ↔ Atendente
- **Indicador de Digitação**: Mostra quando o cliente está digitando
- **Histórico Completo**: Todas as mensagens do ticket
- **Envio por Enter**: Pressione Enter para enviar (Shift+Enter para nova linha)

## Como Usar

### Acessando Tickets
1. Navegue para **Atendimento ao Cliente**
2. Clique em **Tickets Ativos**
3. Visualize a lista de tickets disponíveis

### Atendendo um Ticket
1. **Clique no ticket** desejado na lista
2. O modal de atendimento abrirá automaticamente
3. **Leia as informações** do cliente e do ticket
4. **Inicie a conversa** digitando sua mensagem
5. **Atualize o status** conforme necessário

### Gerenciando Status
- **Novo**: Ticket recém-criado
- **Em Andamento**: Trabalhando na solução
- **Aguardando**: Aguardando resposta do cliente
- **Resolvido**: Problema solucionado

### Ações Disponíveis
- **Ligar para Cliente**: Iniciar chamada telefônica
- **Enviar Email**: Comunicação via email
- **Marcar como Resolvido**: Finalizar o atendimento
- **Atualizar Prioridade**: Alterar urgência do ticket

## Estrutura de Dados

### Ticket
```typescript
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
```

### Mensagem
```typescript
interface Mensagem {
  id: string;
  remetente: 'cliente' | 'atendente';
  mensagem: string;
  timestamp: string;
  tipo: 'texto' | 'arquivo' | 'sistema';
}
```

## Hook Personalizado

O sistema utiliza o hook `useTickets` para gerenciar o estado dos tickets:

```typescript
const {
  tickets,           // Lista de tickets
  loading,           // Estado de carregamento
  error,             // Erro se houver
  loadTickets,       // Função para carregar tickets
  updateTicketStatus, // Atualizar status
  updateTicketPriority, // Atualizar prioridade
  addMessageToTicket, // Adicionar mensagem
  filterTickets,     // Filtrar tickets
  getStats           // Obter estatísticas
} = useTickets();
```

## Componentes Criados

### 1. AtendimentoTicketModal
- Modal principal para atendimento
- Interface de chat integrada
- Painel lateral com informações
- Ações rápidas

### 2. TicketNotificationBadge
- Badge de notificação para tickets novos
- Contador dinâmico
- Estilização responsiva

### 3. useTickets Hook
- Gerenciamento de estado
- Operações CRUD
- Filtros e estatísticas
- Simulação de API

## Integração com Backend

Para integrar com um backend real, modifique as funções no hook `useTickets`:

```typescript
// Exemplo de integração com API
const loadTickets = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/tickets');
    const data = await response.json();
    setTickets(data);
  } catch (err) {
    setError('Erro ao carregar tickets');
  } finally {
    setLoading(false);
  }
};
```

## Próximos Passos

1. **Integração com Backend**: Conectar com API real
2. **Notificações Push**: Alertas em tempo real
3. **Upload de Arquivos**: Envio de imagens/documentos
4. **Templates de Resposta**: Respostas pré-definidas
5. **Relatórios**: Métricas de atendimento
6. **Automação**: Respostas automáticas

## Troubleshooting

### Problemas Comuns

1. **Modal não abre**: Verifique se o ticket foi selecionado corretamente
2. **Mensagens não aparecem**: Confirme se a função `enviarMensagem` está sendo chamada
3. **Filtros não funcionam**: Verifique se os valores de status estão corretos
4. **Erro de compilação**: Execute `npm run build` para verificar erros

### Logs de Debug

O sistema inclui logs para debug:
- Console.log para novas mensagens
- Estados de loading e erro
- Validações de formulário

## Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Consulte os logs do console
3. Teste com dados de exemplo
4. Entre em contato com o suporte técnico 