
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, UserCheck, Shield } from 'lucide-react';

const EquipeSection = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Users className="h-8 w-8" />
          Equipe
        </h1>
        <p className="text-muted-foreground">Gestão completa da equipe de atendimento</p>
      </div>

      <Tabs defaultValue="operadores" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operadores" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Listagem de Operadores
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Status Atual
          </TabsTrigger>
          <TabsTrigger value="cargos" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Cargos e Agrupamentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operadores" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Listagem de Operadores</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                         <Users className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                         <h3 className="font-medium text-foreground">Operador {i}</h3>
                         <p className="text-sm text-muted-foreground">operador{i}@starprint.com</p>
                       </div>
                     </div>
                     <div className="mt-3 flex items-center justify-between">
                       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                         Ativo
                       </span>
                       <span className="text-sm text-muted-foreground">Nível {i}</span>
                     </div>
                   </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="status" className="mt-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4 text-foreground">Status Atual da Equipe</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-emerald-700">12</div>
                <div className="text-sm text-emerald-600">Online</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-700">3</div>
                <div className="text-sm text-yellow-600">Pausa</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-700">2</div>
                <div className="text-sm text-red-600">Offline</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-700">17</div>
                <div className="text-sm text-blue-600">Total</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cargos" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Cargos e Agrupamentos</h2>
            <div className="space-y-4">
              {[
                { cargo: 'Supervisor', count: 2, cor: 'purple' },
                { cargo: 'Operador Sênior', count: 5, cor: 'blue' },
                { cargo: 'Operador Pleno', count: 7, cor: 'green' },
                { cargo: 'Operador Júnior', count: 3, cor: 'yellow' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded bg-${item.cor}-500`}></div>
                    <span className="font-medium">{item.cargo}</span>
                  </div>
                  <span className="text-sm text-gray-500">{item.count} pessoas</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipeSection;
