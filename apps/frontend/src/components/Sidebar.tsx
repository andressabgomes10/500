
import React from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Monitor, 
  FileText, 
  Settings,
  BarChart3,
  Shield,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, description: 'Visão geral' },
    { id: 'equipe', label: 'Equipe', icon: Users, description: 'Gerenciar equipe' },
    { id: 'escalas', label: 'Escalas e Presenças', icon: Calendar, description: 'Horários e presenças' },
    { id: 'atendimento', label: 'Atendimento ao Cliente', icon: MessageSquare, description: 'Central de atendimento' },
    { id: 'monitoramento', label: 'Monitoramento ao Vivo', icon: Monitor, description: 'Monitorar em tempo real' },
    { id: 'relatorios', label: 'Relatórios e Exportações', icon: FileText, description: 'Dados e relatórios' },
    { id: 'administracao', label: 'Administração', icon: Shield, description: 'Configurações gerais' },
  ];

  return (
    <div className="w-72 bg-white border-r border-gray-100/50 h-screen flex flex-col shadow-sm">
      {/* Header Aprimorado */}
      <div className="p-6 border-b border-gray-100/50 bg-gradient-to-r from-white to-gray-50/30">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/25">
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">StarPrint CRM</h1>
            <p className="text-xs text-gray-500 font-medium">Sistema de Atendimento</p>
          </div>
        </div>
      </div>

      {/* Navigation Aprimorada */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`group w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm border border-blue-200/50'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100/50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">{item.label}</div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-600">
                    {item.description}
                  </div>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 transition-all duration-200 ${
                isActive ? 'text-blue-600 transform rotate-90' : 'text-gray-400 group-hover:text-gray-600'
              }`} />
            </button>
          );
        })}
      </nav>

      {/* Support Section Redesenhada */}
      <div className="p-4 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl p-5 border border-blue-200/50">
          <h3 className="text-sm font-bold text-blue-900 mb-2">
            Central de Suporte
          </h3>
          <p className="text-xs text-blue-700 mb-4 leading-relaxed">
            Etiquetas e Rótulos de Qualidade Desde 1996
          </p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
            Obter Ajuda
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
