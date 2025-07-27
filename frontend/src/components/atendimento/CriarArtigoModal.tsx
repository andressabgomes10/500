
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save, X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CriarArtigoModalProps {
  isOpen: boolean;
  onClose: () => void;
  categorias: Array<{
    id: string;
    nome: string;
    cor: string;
  }>;
  artigo?: any;
  onSalvar: (dadosOuId: any, dados?: any) => void;
}

const CriarArtigoModal = ({ isOpen, onClose, categorias, artigo, onSalvar }: CriarArtigoModalProps) => {
  const [titulo, setTitulo] = useState(artigo?.titulo || '');
  const [categoria, setCategoria] = useState(artigo?.categoria || '');
  const [conteudo, setConteudo] = useState(artigo?.conteudo || '');
  const [tags, setTags] = useState(artigo?.tags?.join(', ') || '');
  const [salvando, setSalvando] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo.trim() || !categoria || !conteudo.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha título, categoria e conteúdo",
        variant: "destructive"
      });
      return;
    }

    setSalvando(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dadosArtigo = {
        titulo: titulo.trim(),
        categoria,
        conteudo: conteudo.trim(),
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        autor: 'Usuário Atual',
        status: 'publicado' as const
      };

      if (artigo) {
        onSalvar(artigo.id, dadosArtigo);
      } else {
        onSalvar(dadosArtigo);
      }

      toast({
        title: artigo ? "Artigo atualizado!" : "Artigo criado!",
        description: `O artigo "${titulo}" foi ${artigo ? 'atualizado' : 'criado'} com sucesso.`,
      });

      setSalvando(false);
      onClose();
    
      // Reset form
      setTitulo('');
      setCategoria('');
      setConteudo('');
      setTags('');
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o artigo. Tente novamente.",
        variant: "destructive"
      });
      setSalvando(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setTitulo('');
    setCategoria('');
    setConteudo('');
    setTags('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {artigo ? 'Editar Artigo' : 'Criar Novo Artigo'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titulo">Título *</Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do artigo"
              maxLength={100}
            />
            <p className="text-xs text-gray-500">
              {titulo.length}/100 caracteres
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria">Categoria *</Label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Digite as tags separadas por vírgula"
            />
            <p className="text-xs text-gray-500">
              Exemplo: pagamento, cartão, pix
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="conteudo">Conteúdo *</Label>
            <Textarea
              id="conteudo"
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Digite o conteúdo do artigo..."
              rows={12}
              maxLength={5000}
            />
            <p className="text-xs text-gray-500">
              {conteudo.length}/5000 caracteres
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={salvando}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={salvando}
            >
              {salvando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {artigo ? 'Atualizar' : 'Criar'} Artigo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CriarArtigoModal;
