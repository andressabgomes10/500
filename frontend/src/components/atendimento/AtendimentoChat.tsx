
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Phone, Video, MoreVertical, User, Clock } from 'lucide-react';

const AtendimentoChat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const chatsAtivos = [
    {
      id: 1,
      cliente: 'João Silva',
      ultimaMensagem: 'Preciso de ajuda com meu pedido',
      tempo: '2 min',
      status: 'ativo',
      avatar: 'JS',
      canal: 'WhatsApp'
    },
    {
      id: 2,
      cliente: 'Maria Santos',
      ultimaMensagem: 'Quando meu produto será entregue?',
      tempo: '5 min',
      status: 'aguardando',
      avatar: 'MS',
      canal: 'Chat'
    },
    {
      id: 3,
      cliente: 'Pedro Costa',
      ultimaMensagem: 'Obrigado pela ajuda!',
      tempo: '15 min',
      status: 'resolvido',
      avatar: 'PC',
      canal: 'Email'
    }
  ];

  const mensagens = [
    {
      id: 1,
      tipo: 'cliente',
      conteudo: 'Olá, preciso de ajuda com meu pedido #1234',
      hora: '14:30',
      status: 'entregue'
    },
    {
      id: 2,
      tipo: 'agente',
      conteudo: 'Olá João! Claro, vou verificar seu pedido. Pode me informar qual é o problema específico?',
      hora: '14:31',
      status: 'entregue'
    },
    {
      id: 3,
      tipo: 'cliente',
      conteudo: 'O pedido ainda não chegou e já se passaram 5 dias do prazo de entrega',
      hora: '14:32',
      status: 'entregue'
    },
    {
      id: 4,
      tipo: 'agente',
      conteudo: 'Entendo sua preocupação. Deixe-me verificar o status de entrega do seu pedido...',
      hora: '14:33',
      status: 'digitando'
    }
  ];

  const chatSelecionado = chatsAtivos.find(chat => chat.id === selectedChat);

  return (
    <div className="h-full flex">
      {/* Lista de Chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chats Ativos</h2>
          <p className="text-sm text-gray-600">{chatsAtivos.length} conversas abertas</p>
        </div>
        
        <div className="flex-1 overflow-auto">
          {chatsAtivos.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.id ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">{chat.avatar}</span>
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    chat.status === 'ativo' ? 'bg-green-500' :
                    chat.status === 'aguardando' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`}></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{chat.cliente}</h3>
                    <span className="text-xs text-gray-500">{chat.tempo}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{chat.ultimaMensagem}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {chat.canal}
                    </span>
                    {chat.status === 'ativo' && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 flex flex-col">
        {chatSelecionado ? (
          <>
            {/* Header do Chat */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-700">{chatSelecionado.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{chatSelecionado.cliente}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className={`w-2 h-2 rounded-full ${
                        chatSelecionado.status === 'ativo' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <span>{chatSelecionado.status === 'ativo' ? 'Online' : 'Offline'}</span>
                      <span>•</span>
                      <span>{chatSelecionado.canal}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
              {mensagens.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.tipo === 'agente' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.tipo === 'agente' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}>
                    <p className="text-sm">{msg.conteudo}</p>
                    <div className={`flex items-center justify-between mt-1 text-xs ${
                      msg.tipo === 'agente' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      <span>{msg.hora}</span>
                      {msg.tipo === 'agente' && (
                        <span className="ml-2">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Mensagem */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setMessage('');
                    }
                  }}
                />
                <Button className="px-6">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Selecione um chat para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AtendimentoChat;
