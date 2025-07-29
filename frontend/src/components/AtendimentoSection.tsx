
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Clock, UserCheck, BarChart3, Users, Phone, Star, BookOpen } from 'lucide-react';
import AtendimentoChat from './atendimento/AtendimentoChat';
import FilaAtendimento from './atendimento/FilaAtendimento';
import TicketsAtivos from './atendimento/TicketsAtivos';
import DashboardAtendimento from './atendimento/DashboardAtendimento';
import GerenciarAvaliacoes from './atendimento/GerenciarAvaliacoes';
import BaseConhecimento from './atendimento/BaseConhecimento';

const AtendimentoSection = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Central de Atendimento</h1>
            <p className="text-sm text-gray-600 mt-1">Gestão completa dos atendimentos ao cliente</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-700 font-medium">0 agentes online</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
              <MessageSquare className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">0 atendimentos ativos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-12 bg-transparent p-0 space-x-8">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat ao Vivo</span>
            </TabsTrigger>
            <TabsTrigger 
              value="tickets" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <UserCheck className="h-4 w-4" />
              <span>Tickets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="fila" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <Clock className="h-4 w-4" />
              <span>Fila de Espera</span>
            </TabsTrigger>
            <TabsTrigger 
              value="avaliacoes" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <Star className="h-4 w-4" />
              <span>Avaliações</span>
            </TabsTrigger>
            <TabsTrigger 
              value="conhecimento" 
              className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none"
            >
              <BookOpen className="h-4 w-4" />
              <span>Base de Conhecimento</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs value={activeTab} className="h-full">
          <TabsContent value="dashboard" className="h-full m-0 p-0">
            <DashboardAtendimento />
          </TabsContent>
          
          <TabsContent value="chat" className="h-full m-0 p-0">
            <AtendimentoChat />
          </TabsContent>
          
          <TabsContent value="tickets" className="h-full m-0 p-0">
            <TicketsAtivos />
          </TabsContent>
          
          <TabsContent value="fila" className="h-full m-0 p-0">
            <FilaAtendimento />
          </TabsContent>

          <TabsContent value="avaliacoes" className="h-full m-0 p-0">
            <GerenciarAvaliacoes />
          </TabsContent>

          <TabsContent value="conhecimento" className="h-full m-0 p-0">
            <BaseConhecimento />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AtendimentoSection;
