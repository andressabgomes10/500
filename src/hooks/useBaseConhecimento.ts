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
  { id: 'produtos', nome: 'Produtos', cor: 'bg-blue-100 text-blue-700', artigos: 8, descricao: 'Informações sobre produtos e serviços' },
  { id: 'pagamento', nome: 'Pagamento', cor: 'bg-green-100 text-green-700', artigos: 5, descricao: 'Métodos de pagamento e faturamento' },
  { id: 'entrega', nome: 'Entrega', cor: 'bg-orange-100 text-orange-700', artigos: 6, descricao: 'Envio e logística' },
  { id: 'tecnico', nome: 'Suporte Técnico', cor: 'bg-purple-100 text-purple-700', artigos: 4, descricao: 'Problemas técnicos e soluções' },
  { id: 'conta', nome: 'Conta do Cliente', cor: 'bg-pink-100 text-pink-700', artigos: 3, descricao: 'Gerenciamento de conta' },
];

const artigosIniciais: Artigo[] = [
  {
    id: 1,
    titulo: 'Como rastrear meu pedido',
    categoria: 'entrega',
    visualizacoes: 1250,
    avaliacao: 4.8,
    dataAtualizacao: '2024-01-15',
    conteudo: 'Para rastrear seu pedido, acesse sua conta e clique em "Meus Pedidos". Você encontrará todas as informações de entrega e o código de rastreamento dos Correios.',
    tags: ['rastreamento', 'pedido', 'entrega'],
    autor: 'Equipe de Suporte',
    status: 'publicado'
  },
  {
    id: 2,
    titulo: 'Política de devolução',
    categoria: 'produtos',
    visualizacoes: 890,
    avaliacao: 4.6,
    dataAtualizacao: '2024-01-10',
    conteudo: 'Nossa política de devolução permite retornos em até 30 dias após a compra. O produto deve estar em perfeitas condições, com embalagem original.',
    tags: ['devolução', 'política', 'garantia'],
    autor: 'Equipe Jurídica',
    status: 'publicado'
  },
  {
    id: 3,
    titulo: 'Métodos de pagamento aceitos',
    categoria: 'pagamento',
    visualizacoes: 2100,
    avaliacao: 4.9,
    dataAtualizacao: '2024-01-20',
    conteudo: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo), cartão de débito, PIX (instantâneo) e boleto bancário (vencimento em 3 dias úteis).',
    tags: ['pagamento', 'cartão', 'pix', 'boleto'],
    autor: 'Equipe Financeira',
    status: 'publicado'
  },
  {
    id: 4,
    titulo: 'Como alterar dados da conta',
    categoria: 'conta',
    visualizacoes: 650,
    avaliacao: 4.5,
    dataAtualizacao: '2024-01-12',
    conteudo: 'Para alterar seus dados, acesse Minha Conta > Dados Pessoais. Você pode atualizar nome, email, telefone e endereço. Algumas alterações podem requerer verificação.',
    tags: ['conta', 'dados', 'perfil'],
    autor: 'Equipe de Suporte',
    status: 'publicado'
  },
  {
    id: 5,
    titulo: 'Problemas com login',
    categoria: 'tecnico',
    visualizacoes: 780,
    avaliacao: 4.3,
    dataAtualizacao: '2024-01-18',
    conteudo: 'Se você está tendo problemas para fazer login, tente: 1) Verificar email e senha, 2) Limpar cache do navegador, 3) Redefinir sua senha pelo "Esqueci minha senha".',
    tags: ['login', 'senha', 'acesso'],
    autor: 'Equipe Técnica',
    status: 'publicado'
  },
];

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