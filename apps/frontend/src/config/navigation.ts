import { lazy } from 'react';
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Monitor, 
  FileText, 
  Settings,
  BarChart3,
  Shield,
  Smartphone
} from 'lucide-react';
import { NavigationItem } from '@/types/navigation';

// Dynamic imports for better code splitting
const Dashboard = lazy(() => import('@/components/Dashboard'));
const EquipeSection = lazy(() => import('@/components/EquipeSection'));
const EscalasSection = lazy(() => import('@/components/EscalasSection'));
const AtendimentoSection = lazy(() => import('@/components/AtendimentoSection'));
const MonitoramentoSection = lazy(() => import('@/components/MonitoramentoSection'));
const RelatoriosSection = lazy(() => import('@/components/RelatoriosSection'));
const AdministracaoSection = lazy(() => import('@/components/AdministracaoSection'));
const WhatsAppSection = lazy(() => import('@/components/WhatsAppSection'));

export const navigationItems: NavigationItem[] = [
  { 
    id: 'dashboard', 
    label: 'Dashboard', 
    icon: BarChart3, 
    description: 'Visão geral',
    component: Dashboard
  },
  { 
    id: 'equipe', 
    label: 'Equipe', 
    icon: Users, 
    description: 'Gerenciar equipe',
    component: EquipeSection
  },
  { 
    id: 'escalas', 
    label: 'Escalas e Presenças', 
    icon: Calendar, 
    description: 'Horários e presenças',
    component: EscalasSection
  },
  { 
    id: 'atendimento', 
    label: 'Atendimento ao Cliente', 
    icon: MessageSquare, 
    description: 'Central de atendimento',
    component: AtendimentoSection
  },
  { 
    id: 'monitoramento', 
    label: 'Monitoramento ao Vivo', 
    icon: Monitor, 
    description: 'Monitorar em tempo real',
    component: MonitoramentoSection
  },
  { 
    id: 'relatorios', 
    label: 'Relatórios e Exportações', 
    icon: FileText, 
    description: 'Dados e relatórios',
    component: RelatoriosSection
  },
  { 
    id: 'whatsapp', 
    label: 'WhatsApp Business', 
    icon: Smartphone, 
    description: 'Atendimento via WhatsApp',
    component: WhatsAppSection
  },
  { 
    id: 'administracao', 
    label: 'Administração', 
    icon: Shield, 
    description: 'Configurações gerais',
    component: AdministracaoSection
  }
];

export const getNavigationItem = (id: string) => 
  navigationItems.find(item => item.id === id);

export const getDefaultSection = () => navigationItems[0].id;