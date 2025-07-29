import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Phone, Video, MoreVertical } from 'lucide-react';

const AtendimentoChat = () => {
  const [message, setMessage] = useState('');

  const chatsAtivos = []; // Sistema limpo - sem dados mockados

  return (
    <div className="h-full flex">
      {/* Lista de Chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Chats Ativos</h2>
          <p className="text-sm text-gray-600">0 conversas abertas</p>
        </div>
        
        <div className="flex-1 overflow-auto">
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>Nenhum chat ativo</p>
            <p className="text-sm">Conversas aparecerão aqui</p>
          </div>
        </div>
      </div>

      {/* Área do Chat */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Selecione um chat para começar</p>
            <p className="text-sm text-gray-500 mt-2">Ou aguarde uma nova conversa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AtendimentoChat;