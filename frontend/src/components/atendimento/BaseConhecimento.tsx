
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, FileText, BookOpen, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBaseConhecimento, Artigo } from '@/hooks/useBaseConhecimento';
import CriarArtigoModal from './CriarArtigoModal';
import VisualizarArtigoModal from './VisualizarArtigoModal';
import ArtigoCard from './components/ArtigoCard';
import EstatisticasCard from './components/EstatisticasCard';
import FiltrosAvancados from './components/FiltrosAvancados';

const BaseConhecimento = () => {
  const {
    categorias,
    artigosFiltrados,
    busca,
    setBusca,
    categoriaAtiva,
    setCategoriaAtiva,
    ordenacao,
    setOrdenacao,
    criarArtigo,
    atualizarArtigo,
    excluirArtigo,
    incrementarVisualizacoes,
    avaliarArtigo,
    obterEstatisticas
  } = useBaseConhecimento();

  const [modalCriar, setModalCriar] = useState(false);
  const [modalVisualizar, setModalVisualizar] = useState(false);
  const [artigoSelecionado, setArtigoSelecionado] = useState<Artigo | null>(null);
  const [artigoEditando, setArtigoEditando] = useState<Artigo | null>(null);
  const { toast } = useToast();

  const estatisticas = obterEstatisticas();

  const handleVisualizarArtigo = (artigo: Artigo) => {
    setArtigoSelecionado(artigo);
    setModalVisualizar(true);
    incrementarVisualizacoes(artigo.id);
  };

  const handleEditarArtigo = (artigo: Artigo) => {
    setArtigoEditando(artigo);
    setModalCriar(true);
  };

  const handleExcluirArtigo = (id: number) => {
    excluirArtigo(id);
    toast({
      title: "Artigo excluído",
      description: "O artigo foi removido com sucesso.",
    });
  };

  const handleNovoArtigo = () => {
    setArtigoEditando(null);
    setModalCriar(true);
  };

  const handleFecharModal = () => {
    setModalCriar(false);
    setArtigoEditando(null);
  };

  const handleSalvarArtigo = (dadosOuId: any, dados?: any) => {
    if (dados) {
      // É uma edição (id, dados)
      atualizarArtigo(dadosOuId, dados);
    } else {
      // É criação (dados)
      criarArtigo(dadosOuId);
    }
  };

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Base de Conhecimento</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Centralize e gerencie todo o conhecimento da equipe
            </p>
          </div>
          <Button onClick={handleNovoArtigo} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Artigo</span>
          </Button>
        </div>
      </div>

      {/* Filtros Avançados */}
      <FiltrosAvancados
        busca={busca}
        setBusca={setBusca}
        categoriaAtiva={categoriaAtiva}
        setCategoriaAtiva={setCategoriaAtiva}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
        categorias={categorias}
        totalResultados={artigosFiltrados.length}
      />

      {/* Conteúdo */}
      <div className="flex-1 overflow-auto">
        <Tabs value="artigos" className="h-full">
          <div className="bg-card border-b px-6">
            <TabsList className="h-12 bg-transparent p-0 space-x-8">
              <TabsTrigger 
                value="artigos" 
                className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                <FileText className="h-4 w-4" />
                <span>Artigos ({artigosFiltrados.length})</span>
              </TabsTrigger>
              <TabsTrigger 
                value="categorias" 
                className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                <BookOpen className="h-4 w-4" />
                <span>Categorias</span>
              </TabsTrigger>
              <TabsTrigger 
                value="estatisticas" 
                className="flex items-center space-x-2 h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Estatísticas</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="artigos" className="m-0 p-6">
            {artigosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum artigo encontrado</h3>
                <p className="text-muted-foreground mb-4">
                  Tente ajustar os filtros ou criar um novo artigo.
                </p>
                <Button onClick={handleNovoArtigo}>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Artigo
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artigosFiltrados.map((artigo) => {
                  const categoria = categorias.find(c => c.id === artigo.categoria);
                  return (
                    <ArtigoCard
                      key={artigo.id}
                      artigo={artigo}
                      categoria={categoria}
                      onVisualizar={handleVisualizarArtigo}
                      onEditar={handleEditarArtigo}
                      onExcluir={handleExcluirArtigo}
                    />
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="categorias" className="m-0 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categorias.map((categoria) => (
                <Card key={categoria.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{categoria.nome}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoria.cor}`}>
                        {categoria.artigos} artigos
                      </span>
                    </CardTitle>
                    {categoria.descricao && (
                      <p className="text-sm text-muted-foreground">{categoria.descricao}</p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setCategoriaAtiva(categoria.id)}
                    >
                      Ver Artigos
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="estatisticas" className="m-0 p-6">
            <EstatisticasCard {...estatisticas} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modais */}
      <CriarArtigoModal 
        isOpen={modalCriar} 
        onClose={handleFecharModal}
        categorias={categorias}
        artigo={artigoEditando}
        onSalvar={handleSalvarArtigo}
      />
      
      {artigoSelecionado && (
        <VisualizarArtigoModal 
          isOpen={modalVisualizar} 
          onClose={() => {
            setModalVisualizar(false);
            setArtigoSelecionado(null);
          }}
          artigo={artigoSelecionado}
          categoria={categorias.find(c => c.id === artigoSelecionado.categoria)}
          onAvaliar={avaliarArtigo}
          onEditar={handleEditarArtigo}
        />
      )}
    </div>
  );
};

export default BaseConhecimento;
