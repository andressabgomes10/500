
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye, Star, Calendar, Tag, Edit, Copy, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VisualizarArtigoModalProps {
  isOpen: boolean;
  onClose: () => void;
  artigo: {
    id: number;
    titulo: string;
    categoria: string;
    visualizacoes: number;
    avaliacao: number;
    dataAtualizacao: string;
    conteudo: string;
    tags: string[];
    autor?: string;
  };
  categoria: {
    nome: string;
    cor: string;
  } | undefined;
  onAvaliar: (id: number, nota: number) => void;
  onEditar: (artigo: any) => void;
}

const VisualizarArtigoModal = ({ isOpen, onClose, artigo, categoria, onAvaliar, onEditar }: VisualizarArtigoModalProps) => {
  const [avaliandoArtigo, setAvaliandoArtigo] = useState(false);
  const { toast } = useToast();

  const handleCopiarLink = () => {
    const link = `${window.location.origin}/kb/artigo/${artigo.id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link do artigo foi copiado para a área de transferência.",
    });
  };

  const handleCompartilhar = () => {
    if (navigator.share) {
      navigator.share({
        title: artigo.titulo,
        text: artigo.conteudo.substring(0, 100) + '...',
        url: `${window.location.origin}/kb/artigo/${artigo.id}`
      });
    } else {
      handleCopiarLink();
    }
  };

  const handleAvaliarArtigo = async (nota: number) => {
    setAvaliandoArtigo(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onAvaliar(artigo.id, nota);
      
      toast({
        title: "Avaliação enviada!",
        description: `Obrigado por avaliar este artigo com ${nota} estrela${nota > 1 ? 's' : ''}.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao avaliar",
        description: "Ocorreu um erro ao enviar sua avaliação. Tente novamente.",
        variant: "destructive"
      });
    }
    
    setAvaliandoArtigo(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-xl mb-3">{artigo.titulo}</DialogTitle>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                {categoria && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoria.cor}`}>
                    {categoria.nome}
                  </span>
                )}
                
                {artigo.autor && (
                  <span className="text-sm">por {artigo.autor}</span>
                )}
                
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{artigo.visualizacoes} visualizações</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{artigo.avaliacao} avaliação</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Atualizado em {new Date(artigo.dataAtualizacao).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm" onClick={handleCopiarLink}>
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleCompartilhar}>
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => onEditar(artigo)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {artigo.tags.map((tag, index) => (
              <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Conteúdo */}
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {artigo.conteudo}
              </div>
            </div>
          </div>

          {/* Avaliação */}
          <div className="border-t pt-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Este artigo foi útil?
              </h3>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Avalie este artigo:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                      key={estrela}
                      onClick={() => handleAvaliarArtigo(estrela)}
                      disabled={avaliandoArtigo}
                      className="p-1 transition-transform hover:scale-110 disabled:opacity-50"
                    >
                      <Star className="h-6 w-6 text-gray-300 hover:text-yellow-400 hover:fill-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mt-3">
                Sua avaliação nos ajuda a melhorar nosso conteúdo.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VisualizarArtigoModal;
