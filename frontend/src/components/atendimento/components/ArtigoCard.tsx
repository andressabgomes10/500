import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Star, Calendar, Tag, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Artigo, Categoria } from '@/hooks/useBaseConhecimento';

interface ArtigoCardProps {
  artigo: Artigo;
  categoria: Categoria | undefined;
  onVisualizar: (artigo: Artigo) => void;
  onEditar: (artigo: Artigo) => void;
  onExcluir: (id: number) => void;
}

const ArtigoCard = ({ artigo, categoria, onVisualizar, onEditar, onExcluir }: ArtigoCardProps) => {
  const handleVisualizarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVisualizar(artigo);
  };

  const handleEditarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditar(artigo);
  };

  const handleExcluirClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Tem certeza que deseja excluir o artigo "${artigo.titulo}"?`)) {
      onExcluir(artigo.id);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {artigo.titulo}
            </CardTitle>
            <div className="flex items-center space-x-2">
              {categoria && (
                <Badge variant="secondary" className={`${categoria.cor} border-none`}>
                  {categoria.nome}
                </Badge>
              )}
              {artigo.autor && (
                <span className="text-xs text-muted-foreground">
                  por {artigo.autor}
                </span>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEditarClick}>
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleExcluirClick} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Preview do conteúdo */}
          <p className="text-sm text-muted-foreground line-clamp-2">
            {artigo.conteudo.length > 100 
              ? `${artigo.conteudo.substring(0, 100)}...` 
              : artigo.conteudo}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {artigo.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {artigo.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{artigo.tags.length - 3}
              </Badge>
            )}
          </div>
          
          {/* Estatísticas */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{artigo.visualizacoes.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>{artigo.avaliacao}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(artigo.dataAtualizacao).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleVisualizarClick}
          >
            Ver Artigo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtigoCard;