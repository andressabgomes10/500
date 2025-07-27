
import React from 'react';
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  FileText, 
  CheckCircle,
  Clock,
  ArrowRight,
  Target,
  Activity,
  Phone,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { StatCard } from '@/components/shared/StatCard';
import { SectionHeader } from '@/components/shared/SectionHeader';

const Dashboard = () => {
  // Dados de exemplo para os gráficos
  const atendimentosData = [
    { hora: '08:00', atendimentos: 12, satisfacao: 4.2 },
    { hora: '10:00', atendimentos: 25, satisfacao: 4.5 },
    { hora: '12:00', atendimentos: 35, satisfacao: 4.3 },
    { hora: '14:00', atendimentos: 42, satisfacao: 4.7 },
    { hora: '16:00', atendimentos: 38, satisfacao: 4.4 },
    { hora: '18:00', atendimentos: 28, satisfacao: 4.6 }
  ];

  const canaisData = [
    { nome: 'WhatsApp', valor: 45, cor: '#25D366' },
    { nome: 'Telefone', valor: 25, cor: '#FF6B35' },
    { nome: 'Email', valor: 20, cor: '#4285F4' },
    { nome: 'Chat', valor: 10, cor: '#8B5CF6' }
  ];

  const metasData = [
    { equipe: 'Suporte', meta: 90, atual: 87, cor: '#3B82F6' },
    { equipe: 'Vendas', meta: 85, atual: 92, cor: '#10B981' },
    { equipe: 'Retenção', meta: 80, atual: 75, cor: '#F59E0B' }
  ];

  const chartConfig = {
    atendimentos: {
      label: "Atendimentos",
      color: "#3B82F6",
    },
    satisfacao: {
      label: "Satisfação",
      color: "#10B981",
    }
  };

  // ... keep existing code (data definitions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50">
      <div className="space-y-6 md:space-y-8">
        <SectionHeader
          title="Dashboard StarPrint CRM"
          subtitle={`Visão geral do sistema de atendimento • ${new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 px-3 py-1.5">
              <CheckCircle className="h-3 w-3 mr-1.5" />
              <span className="hidden sm:inline">Sistema Online</span>
              <span className="sm:hidden">Online</span>
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 bg-primary/5 border-primary/20">
              <Activity className="h-3 w-3 mr-1.5" />
              <span className="hidden sm:inline">Atualizado há 2min</span>
              <span className="sm:hidden">2min</span>
            </Badge>
          </div>
        </SectionHeader>

        {/* KPIs com Layout Aprimorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Atendimentos Ativos"
            value="23"
            subtitle="12 na fila de espera"
            trend="up"
            trendValue="+15%"
            icon={MessageSquare}
            description="Atendimentos em tempo real"
          />
          <StatCard
            title="Taxa de Resolução"
            value="89%"
            subtitle="Meta: 85%"
            trend="up"
            trendValue="+4%"
            icon={CheckCircle}
            description="Tickets resolvidos no primeiro contato"
          />
          <StatCard
            title="Tempo Médio"
            value="3.2min"
            subtitle="Último período: 3.8min"
            trend="up"
            trendValue="-16%"
            icon={Clock}
            description="Tempo médio de atendimento"
          />
          <StatCard
            title="Satisfação"
            value="4.6"
            subtitle="Base: 156 avaliações"
            trend="up"
            trendValue="+0.3"
            icon={Target}
            description="Nota média de satisfação"
            alert="2 avaliações baixas"
          />
        </div>

        {/* Layout Principal com Colunas Otimizadas */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Coluna Principal - Gráfico de Atendimentos */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                      <BarChart3 className="h-6 w-6 mr-3 text-blue-600" />
                      Atendimentos por Hora
                    </CardTitle>
                    <CardDescription className="text-base text-gray-600 mt-2">
                      Volume de atendimentos e satisfação ao longo do dia
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    Hoje
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[320px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={atendimentosData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorAtendimentos" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="hora" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#6B7280' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="atendimentos" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        fill="url(#colorAtendimentos)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral - Canais e Equipe */}
          <div className="space-y-6">
            {/* Distribuição por Canais */}
            <Card className="border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-orange-600" />
                  Canais de Atendimento
                </CardTitle>
                <CardDescription className="text-gray-600">Distribuição atual por canal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {canaisData.map((canal, i) => (
                  <div key={i} className="group hover:bg-gray-50 p-3 rounded-lg transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full shadow-sm" 
                          style={{ backgroundColor: canal.cor }}
                        ></div>
                        <span className="text-sm font-semibold text-gray-900">{canal.nome}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">{canal.valor}</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="h-2.5 rounded-full transition-all duration-500 shadow-sm" 
                            style={{ 
                              width: `${canal.valor}%`,
                              backgroundColor: canal.cor
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Equipe Online */}
            <Card className="border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-600" />
                  Equipe Online
                </CardTitle>
                <CardDescription className="text-gray-600">Status atual da equipe de atendimento</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { nome: 'Ana Costa', status: 'Atendendo', canal: 'WhatsApp', tempo: '5:23', avatar: 'AC', statusColor: 'green' },
                    { nome: 'Carlos Lima', status: 'Disponível', canal: '-', tempo: '-', avatar: 'CL', statusColor: 'blue' },
                    { nome: 'Maria Santos', status: 'Atendendo', canal: 'Email', tempo: '12:45', avatar: 'MS', statusColor: 'green' },
                    { nome: 'Pedro Silva', status: 'Pausa', canal: '-', tempo: '3:15', avatar: 'PS', statusColor: 'yellow' }
                  ].map((pessoa, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-50/50 hover:from-gray-100 hover:to-gray-100/50 transition-all duration-200 border border-gray-100/50">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                            {pessoa.avatar}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            pessoa.statusColor === 'green' ? 'bg-emerald-500' :
                            pessoa.statusColor === 'blue' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}></div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{pessoa.nome}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            {pessoa.status} {pessoa.canal !== '-' && `• ${pessoa.canal}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right text-xs font-medium text-gray-600">
                        {pessoa.tempo}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seção de Metas */}
        <Card className="border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
              <Target className="h-6 w-6 mr-3 text-purple-600" />
              Metas por Equipe
            </CardTitle>
            <CardDescription className="text-base text-gray-600">Performance atual vs metas estabelecidas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {metasData.map((item, i) => (
                <div key={i} className="space-y-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100/50">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">{item.equipe}</span>
                    <span className="text-sm font-semibold text-gray-600">{item.atual}% / {item.meta}%</span>
                  </div>
                  <Progress value={(item.atual / item.meta) * 100} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className={item.atual >= item.meta ? 'text-emerald-600 font-semibold' : 'text-orange-600 font-medium'}>
                      {item.atual >= item.meta ? 'Meta atingida!' : `Faltam ${item.meta - item.atual}%`}
                    </span>
                    <span className={`text-lg ${item.atual >= item.meta ? 'text-emerald-600' : 'text-orange-600'}`}>
                      {item.atual >= item.meta ? '✓' : '!'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas Redesenhadas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Iniciar Atendimento',
              description: 'Acesse a fila de atendimentos pendentes',
              icon: MessageSquare,
              color: 'blue',
              action: 'Acessar Fila',
              gradient: 'from-blue-500 to-blue-600'
            },
            {
              title: 'Relatório do Dia',
              description: 'Visualize métricas detalhadas de hoje',
              icon: FileText,
              color: 'emerald',
              action: 'Ver Relatório',
              gradient: 'from-emerald-500 to-emerald-600'
            },
            {
              title: 'Configurações',
              description: 'Ajuste metas e parâmetros do sistema',
              icon: Settings,
              color: 'purple',
              action: 'Configurar',
              gradient: 'from-purple-500 to-purple-600'
            }
          ].map((item, i) => (
            <Card key={i} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100/50 hover:border-gray-200 bg-gradient-to-br from-white to-gray-50/30">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <button className="flex items-center justify-between w-full text-base font-semibold text-blue-600 hover:text-blue-700 group-hover:translate-x-2 transition-all duration-300 p-3 rounded-lg hover:bg-blue-50">
                    <span>{item.action}</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center py-8 mt-12 border-t border-border bg-gradient-to-r from-card to-muted/50 rounded-2xl">
          <p className="text-lg font-bold text-foreground">StarPrint Etiquetas e Rótulos</p>
          <p className="text-sm text-muted-foreground mt-2">
            Sistema CRM • Dashboard v2.0 • Última atualização: {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
