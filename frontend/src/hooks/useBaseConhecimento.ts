import { useState, useMemo } from 'react';

export interface Artigo {
  id: number;
  titulo: string;
  categoria: string;
  visualizacoes: number;
  avaliacao: number;
  dataAtualizacao: string;
  conteudo: string;
  tags: string[];
  autor?: string;
  status: 'rascunho' | 'publicado' | 'arquivado';
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
  artigos: number;
  icone?: string;
  descricao?: string;
}

const categoriasIniciais: Categoria[] = [
  { id: 'produtos', nome: 'Produtos', cor: 'bg-blue-100 text-blue-700', artigos: 0, descricao: 'Informações sobre produtos e serviços' },
  { id: 'pagamento', nome: 'Pagamento', cor: 'bg-green-100 text-green-700', artigos: 0, descricao: 'Métodos de pagamento e faturamento' },
  { id: 'entrega', nome: 'Entrega', cor: 'bg-orange-100 text-orange-700', artigos: 0, descricao: 'Envio e logística' },
  { id: 'tecnico', nome: 'Suporte Técnico', cor: 'bg-purple-100 text-purple-700', artigos: 0, descricao: 'Problemas técnicos e soluções' },
  { id: 'conta', nome: 'Conta do Cliente', cor: 'bg-pink-100 text-pink-700', artigos: 0, descricao: 'Gerenciamento de conta' },
];

const artigosIniciais: Artigo[] = []; // Sistema limpo - sem dados mockados

export const useBaseConhecimento = () => {
  const [artigos, setArtigos] = useState<Artigo[]>(artigosIniciais);
  const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [ordenacao, setOrdenacao] = useState<'titulo' | 'data' | 'visualizacoes' | 'avaliacao'>('data');

  const artigosFiltrados = useMemo(() => {
    let resultados = artigos.filter(artigo => {
      const matchBusca = artigo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                        artigo.conteudo.toLowerCase().includes(busca.toLowerCase()) ||
                        artigo.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
      const matchCategoria = categoriaAtiva === 'todos' || artigo.categoria === categoriaAtiva;
      const matchStatus = artigo.status === 'publicado';
      return matchBusca && matchCategoria && matchStatus;
    });

    // Ordenação
    switch (ordenacao) {
      case 'titulo':
        resultados.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'visualizacoes':
        resultados.sort((a, b) => b.visualizacoes - a.visualizacoes);
        break;
      case 'avaliacao':
        resultados.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'data':
      default:
        resultados.sort((a, b) => new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime());
        break;
    }

    return resultados;
  }, [artigos, busca, categoriaAtiva, ordenacao]);

  const criarArtigo = (novoArtigo: Omit<Artigo, 'id' | 'visualizacoes' | 'avaliacao' | 'dataAtualizacao'>) => {
    const artigo: Artigo = {
      ...novoArtigo,
      id: Date.now(),
      visualizacoes: 0,
      avaliacao: 0,
      dataAtualizacao: new Date().toISOString().split('T')[0]
    };
    setArtigos(prev => [artigo, ...prev]);
    return artigo;
  };

  const atualizarArtigo = (id: number, dadosAtualizados: Partial<Artigo>) => {
    setArtigos(prev => prev.map(artigo => 
      artigo.id === id 
        ? { ...artigo, ...dadosAtualizados, dataAtualizacao: new Date().toISOString().split('T')[0] }
        : artigo
    ));
  };

  const excluirArtigo = (id: number) => {
    setArtigos(prev => prev.filter(artigo => artigo.id !== id));
  };

  const incrementarVisualizacoes = (id: number) => {
    setArtigos(prev => prev.map(artigo => 
      artigo.id === id 
        ? { ...artigo, visualizacoes: artigo.visualizacoes + 1 }
        : artigo
    ));
  };

  const avaliarArtigo = (id: number, novaAvaliacao: number) => {
    setArtigos(prev => prev.map(artigo => {
      if (artigo.id === id) {
        // Simula uma média simples (em produção seria mais complexo)
        const novaMedia = ((artigo.avaliacao * 10) + novaAvaliacao) / 11;
        return { ...artigo, avaliacao: Math.round(novaMedia * 10) / 10 };
      }
      return artigo;
    }));
  };

  const obterEstatisticas = () => {
    const totalArtigos = artigos.length;
    const artigosPublicados = artigos.filter(a => a.status === 'publicado').length;
    const totalVisualizacoes = artigos.reduce((acc, artigo) => acc + artigo.visualizacoes, 0);
    const avaliacaoMedia = artigos.reduce((acc, artigo) => acc + artigo.avaliacao, 0) / totalArtigos;

    return {
      totalArtigos,
      artigosPublicados,
      totalVisualizacoes,
      avaliacaoMedia: Math.round(avaliacaoMedia * 10) / 10
    };
  };

  return {
    artigos,
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
  };
};