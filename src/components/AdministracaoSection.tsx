
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Settings } from 'lucide-react';

const AdministracaoSection = () => {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🔐 Administração</h1>
        <p className="text-gray-600">Configurações de sistema e controle de acesso</p>
      </div>

      <Tabs defaultValue="perfis" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="perfis" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Perfis de Acesso
          </TabsTrigger>
          <TabsTrigger value="usuarios" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configurações de Usuário
          </TabsTrigger>
        </TabsList>

        <TabsContent value="perfis" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Perfis de Acesso</h2>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Novo Perfil
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  nome: 'Administrador', 
                  usuarios: 2, 
                  permissoes: ['Acesso total', 'Gerenciar usuários', 'Relatórios avançados', 'Configurações do sistema'],
                  cor: 'red'
                },
                { 
                  nome: 'Supervisor', 
                  usuarios: 3, 
                  permissoes: ['Gerenciar equipe', 'Visualizar relatórios', 'Atribuir chamados', 'Monitoramento'],
                  cor: 'blue'
                },
                { 
                  nome: 'Operador', 
                  usuarios: 12, 
                  permissoes: ['Atender chamados', 'Visualizar fila', 'Atualizar status', 'Chat básico'],
                  cor: 'green'
                }
              ].map((perfil, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${perfil.cor}-500`}></div>
                      <h3 className="font-medium">{perfil.nome}</h3>
                    </div>
                    <span className="text-sm text-gray-500">{perfil.usuarios} usuários</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Permissões:</p>
                    <div className="space-y-1">
                      {perfil.permissoes.map((perm, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-700">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-50">
                      Editar
                    </button>
                    <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                      Gerenciar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usuarios" className="mt-6">
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Configurações de Usuário</h2>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Adicionar Usuário
              </button>
            </div>

            <div className="space-y-4">
              {[
                { nome: 'Ana Costa', email: 'ana.costa@starprint.com', perfil: 'Supervisor', status: 'Ativo', ultimo: '20/06/2025 14:30' },
                { nome: 'Carlos Lima', email: 'carlos.lima@starprint.com', perfil: 'Operador', status: 'Ativo', ultimo: '20/06/2025 14:25' },
                { nome: 'Maria Santos', email: 'maria.santos@starprint.com', perfil: 'Operador', status: 'Ativo', ultimo: '20/06/2025 14:20' },
                { nome: 'Pedro Oliveira', email: 'pedro.oliveira@starprint.com', perfil: 'Operador', status: 'Inativo', ultimo: '19/06/2025 18:00' },
                { nome: 'Julia Ferreira', email: 'julia.ferreira@starprint.com', perfil: 'Administrador', status: 'Ativo', ultimo: '20/06/2025 14:35' }
              ].map((usuario, i) => (
                <div key={i} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">
                          {usuario.nome.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium">{usuario.nome}</h3>
                        <p className="text-sm text-gray-600">{usuario.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            usuario.status === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {usuario.status}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {usuario.perfil}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Último acesso: {usuario.ultimo}</p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          Editar
                        </button>
                        <button className={`px-3 py-1 rounded text-sm ${
                          usuario.status === 'Ativo' 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}>
                          {usuario.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdministracaoSection;
