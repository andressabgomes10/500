import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Eye, Star, TrendingUp } from 'lucide-react';

interface EstatisticasCardProps {
  totalArtigos: number;
  artigosPublicados: number;
  totalVisualizacoes: number;
  avaliacaoMedia: number;
}

const EstatisticasCard = ({ 
  totalArtigos, 
  artigosPublicados, 
  totalVisualizacoes, 
  avaliacaoMedia 
}: EstatisticasCardProps) => {
  const estatisticas = [
    {
      titulo: 'Total de Artigos',
      valor: totalArtigos,
      icone: BookOpen,
      cor: 'text-blue-600',
      fundo: 'bg-blue-50'
    },
    {
      titulo: 'Artigos Publicados',
      valor: artigosPublicados,
      icone: TrendingUp,
      cor: 'text-green-600',
      fundo: 'bg-green-50'
    },
    {
      titulo: 'Total de Visualizações',
      valor: totalVisualizacoes.toLocaleString(),
      icone: Eye,
      cor: 'text-orange-600',
      fundo: 'bg-orange-50'
    },
    {
      titulo: 'Avaliação Média',
      valor: avaliacaoMedia.toFixed(1),
      icone: Star,
      cor: 'text-yellow-600',
      fundo: 'bg-yellow-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {estatisticas.map((stat, index) => {
        const IconComponent = stat.icone;
        return (
          <Card key={index} className="border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.titulo}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.fundo}`}>
                <IconComponent className={`h-4 w-4 ${stat.cor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.valor}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default EstatisticasCard;