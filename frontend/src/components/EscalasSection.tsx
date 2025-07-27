
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Filter,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';

const EscalasSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Mock data - dados simulados
  const escalas = [
    { id: 1, operador: 'João Silva', turno: 'Manhã', horario: '08:00-17:00', status: 'presente', setor: 'Vendas' },
    { id: 2, operador: 'Maria Santos', turno: 'Tarde', horario: '13:00-22:00', status: 'atrasado', setor: 'Atendimento' },
    { id: 3, operador: 'Pedro Oliveira', turno: 'Manhã', horario: '08:00-17:00', status: 'falta', setor: 'Técnico' },
    { id: 4, operador: 'Ana Costa', turno: 'Integral', horario: '08:00-18:00', status: 'presente', setor: 'Supervisão' },
    { id: 5, operador: 'Carlos Lima', turno: 'Noite', horario: '22:00-06:00', status: 'presente', setor: 'Segurança' },
  ];

  const estatisticas = {
    totalOperadores: 25,
    presentes: 20,
    atrasos: 3,
    faltas: 2,
    percentualPresenca: 80
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      presente: { variant: 'default' as const, icon: CheckCircle, color: 'text-green-600' },
      atrasado: { variant: 'secondary' as const, icon: AlertTriangle, color: 'text-yellow-600' },
      falta: { variant: 'destructive' as const, icon: XCircle, color: 'text-red-600' }
    };
    
    const config = variants[status as keyof typeof variants] || variants.presente;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredEscalas = escalas.filter(escala => {
    const matchesSearch = escala.operador.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         escala.setor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || escala.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📆 Escalas e Presenças</h1>
          <p className="text-gray-600">Controle completo de horários e acompanhamento da equipe</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Nova Escala
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Escala</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="operador">Operador</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um operador" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="joao">João Silva</SelectItem>
                      <SelectItem value="maria">Maria Santos</SelectItem>
                      <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="turno">Turno</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o turno" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manha">Manhã (08:00-17:00)</SelectItem>
                      <SelectItem value="tarde">Tarde (13:00-22:00)</SelectItem>
                      <SelectItem value="noite">Noite (22:00-06:00)</SelectItem>
                      <SelectItem value="integral">Integral (08:00-18:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input type="date" id="data" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setIsAddModalOpen(false)} variant="outline" className="flex-1">
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsAddModalOpen(false)} className="flex-1">
                    Salvar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{estatisticas.totalOperadores}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{estatisticas.presentes}</p>
                <p className="text-sm text-gray-600">Presentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{estatisticas.atrasos}</p>
                <p className="text-sm text-gray-600">Atrasos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{estatisticas.faltas}</p>
                <p className="text-sm text-gray-600">Faltas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">%</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{estatisticas.percentualPresenca}%</p>
                <p className="text-sm text-gray-600">Presença</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="escalas" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="escalas" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Visualização de Escalas
          </TabsTrigger>
          <TabsTrigger value="presencas" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Controle de Presenças
          </TabsTrigger>
          <TabsTrigger value="atrasos" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Acompanhamento de Atrasos
          </TabsTrigger>
          <TabsTrigger value="justificativas" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Justificativas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="escalas" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Calendário</CardTitle>
                <CardDescription>Selecione uma data para visualizar</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className={cn("w-full pointer-events-auto")}
                />
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Escala do Dia - {selectedDate?.toLocaleDateString('pt-BR')}</CardTitle>
                <CardDescription>Visualização completa da escala diária</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Operador</TableHead>
                        <TableHead>Setor</TableHead>
                        <TableHead>Turno</TableHead>
                        <TableHead>Horário</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {escalas.map((escala) => (
                        <TableRow key={escala.id}>
                          <TableCell className="font-medium">{escala.operador}</TableCell>
                          <TableCell>{escala.setor}</TableCell>
                          <TableCell>{escala.turno}</TableCell>
                          <TableCell>{escala.horario}</TableCell>
                          <TableCell>{getStatusBadge(escala.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="presencas" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Controle de Presenças</CardTitle>
                  <CardDescription>Monitore a presença da equipe em tempo real</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar operador..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="presente">Presentes</SelectItem>
                      <SelectItem value="atrasado">Atrasados</SelectItem>
                      <SelectItem value="falta">Faltas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operador</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Horário Previsto</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEscalas.map((escala) => (
                    <TableRow key={escala.id}>
                      <TableCell className="font-medium">{escala.operador}</TableCell>
                      <TableCell>{escala.setor}</TableCell>
                      <TableCell>{escala.horario.split('-')[0]}</TableCell>
                      <TableCell>
                        {escala.status === 'presente' ? '08:00' : escala.status === 'atrasado' ? '08:15' : '-'}
                      </TableCell>
                      <TableCell>{getStatusBadge(escala.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Marcar Entrada
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="atrasos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento de Atrasos</CardTitle>
              <CardDescription>Histórico detalhado de atrasos da equipe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { nome: 'João Silva', atraso: '15 min', data: '20/06/2025', motivo: 'Trânsito intenso', setor: 'Vendas' },
                  { nome: 'Maria Santos', atraso: '8 min', data: '19/06/2025', motivo: 'Problema no transporte', setor: 'Atendimento' },
                  { nome: 'Pedro Oliveira', atraso: '22 min', data: '18/06/2025', motivo: 'Consulta médica', setor: 'Técnico' },
                  { nome: 'Ana Costa', atraso: '5 min', data: '17/06/2025', motivo: 'Imprevisto familiar', setor: 'Supervisão' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{item.nome}</div>
                          <div className="text-sm text-gray-500">{item.setor} • {item.data}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{item.motivo}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="text-yellow-800 bg-yellow-100">
                        {item.atraso}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="justificativas" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Justificativas e Observações</CardTitle>
                  <CardDescription>Gerenciamento de justificativas de faltas e atrasos</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Justificativa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Justificativa</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div>
                        <Label htmlFor="operador-justificativa">Operador</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o operador" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="joao">João Silva</SelectItem>
                            <SelectItem value="maria">Maria Santos</SelectItem>
                            <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="tipo-justificativa">Tipo</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Tipo de ocorrência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="atraso">Atraso</SelectItem>
                            <SelectItem value="falta">Falta</SelectItem>
                            <SelectItem value="saida-antecipada">Saída Antecipada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="data-justificativa">Data</Label>
                        <Input type="date" id="data-justificativa" />
                      </div>
                      <div>
                        <Label htmlFor="justificativa-texto">Justificativa</Label>
                        <Textarea 
                          id="justificativa-texto"
                          placeholder="Descreva o motivo da ocorrência..."
                          rows={4}
                        />
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" className="flex-1">Cancelar</Button>
                        <Button className="flex-1">Salvar</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { operador: 'Ana Costa', tipo: 'Atraso', justificativa: 'Problema no transporte público', data: '20/06/2025', status: 'aprovada' },
                  { operador: 'Carlos Lima', tipo: 'Falta', justificativa: 'Consulta médica agendada', data: '19/06/2025', status: 'pendente' },
                  { operador: 'João Silva', tipo: 'Saída Antecipada', justificativa: 'Emergência familiar', data: '18/06/2025', status: 'aprovada' }
                ].map((item, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{item.operador}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{item.tipo}</Badge>
                          <span className="text-sm text-gray-500">{item.data}</span>
                          <Badge variant={item.status === 'aprovada' ? 'default' : 'secondary'}>
                            {item.status === 'aprovada' ? 'Aprovada' : 'Pendente'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        {item.status === 'pendente' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{item.justificativa}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EscalasSection;
