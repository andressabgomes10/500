import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';
import { Categoria } from '@/hooks/useBaseConhecimento';

interface FiltrosAvancadosProps {
  busca: string;
  setBusca: (busca: string) => void;
  categoriaAtiva: string;
  setCategoriaAtiva: (categoria: string) => void;
  ordenacao: 'titulo' | 'data' | 'visualizacoes' | 'avaliacao';
  setOrdenacao: (ordenacao: 'titulo' | 'data' | 'visualizacoes' | 'avaliacao') => void;
  categorias: Categoria[];
  totalResultados: number;
}

const FiltrosAvancados = ({
  busca,
  setBusca,
  categoriaAtiva,
  setCategoriaAtiva,
  ordenacao,
  setOrdenacao,
  categorias,
  totalResultados
}: FiltrosAvancadosProps) => {
  const limparFiltros = () => {
    setBusca('');
    setCategoriaAtiva('todos');
    setOrdenacao('data');
  };

  const temFiltrosAtivos = busca || categoriaAtiva !== 'todos' || ordenacao !== 'data';

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Busca */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar artigos, conteúdo ou tags..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Categoria:</span>
            <Select value={categoriaAtiva} onValueChange={setCategoriaAtiva}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as categorias</SelectItem>
                {categorias.map(categoria => (
                  <SelectItem key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ordenar:</span>
            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data">Mais recentes</SelectItem>
                <SelectItem value="titulo">Título A-Z</SelectItem>
                <SelectItem value="visualizacoes">Mais visualizados</SelectItem>
                <SelectItem value="avaliacao">Melhor avaliados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {temFiltrosAtivos && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={limparFiltros}
              className="flex items-center space-x-1"
            >
              <X className="h-4 w-4" />
              <span>Limpar</span>
            </Button>
          )}
        </div>
      </div>

      {/* Resultados */}
      <div className="mt-3 text-sm text-muted-foreground">
        {totalResultados} {totalResultados === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        {busca && (
          <span> para "{busca}"</span>
        )}
      </div>
    </div>
  );
};

export default FiltrosAvancados;