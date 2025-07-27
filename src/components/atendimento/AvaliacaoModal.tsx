
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  clienteNome: string;
  agenteNome: string;
}

const AvaliacaoModal = ({ isOpen, onClose, ticketId, clienteNome, agenteNome }: AvaliacaoModalProps) => {
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [hoverNota, setHoverNota] = useState(0);
  const [enviando, setEnviando] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (nota === 0) {
      toast({
        title: "Avaliação obrigatória",
        description: "Por favor, selecione uma nota de 1 a 5 estrelas",
        variant: "destructive"
      });
      return;
    }

    setEnviando(true);
    
    // Simular envio da avaliação
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Aqui seria enviado para o backend
    
    toast({
      title: "Avaliação enviada!",
      description: "Obrigado pelo seu feedback. Sua opinião é muito importante para nós.",
    });

    setEnviando(false);
    onClose();
    
    // Reset form
    setNota(0);
    setComentario('');
  };

  const getNotaTexto = (nota: number) => {
    switch (nota) {
      case 1: return 'Muito insatisfeito';
      case 2: return 'Insatisfeito';
      case 3: return 'Neutro';
      case 4: return 'Satisfeito';
      case 5: return 'Muito satisfeito';
      default: return 'Selecione uma nota';
    }
  };

  const getNotaCor = (nota: number) => {
    switch (nota) {
      case 1: return 'text-red-600';
      case 2: return 'text-orange-600';
      case 3: return 'text-yellow-600';
      case 4: return 'text-blue-600';
      case 5: return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Avalie seu atendimento</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Informações do atendimento */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <MessageSquare className="h-4 w-4" />
              <span>Ticket {ticketId}</span>
            </div>
            <p className="text-sm text-gray-600">
              Atendido por <span className="font-medium">{agenteNome}</span>
            </p>
          </div>

          {/* Sistema de estrelas */}
          <div className="space-y-3">
            <p className="text-center text-gray-700">Como você avalia nosso atendimento?</p>
            
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((estrela) => (
                <button
                  key={estrela}
                  onClick={() => setNota(estrela)}
                  onMouseEnter={() => setHoverNota(estrela)}
                  onMouseLeave={() => setHoverNota(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      estrela <= (hoverNota || nota)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            <p className={`text-center text-sm font-medium ${getNotaCor(hoverNota || nota)}`}>
              {getNotaTexto(hoverNota || nota)}
            </p>
          </div>

          {/* Comentário */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Comentários (opcional)
            </label>
            <Textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Conte-nos mais sobre sua experiência..."
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {comentario.length}/500 caracteres
            </p>
          </div>

          {/* Botões */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={enviando}
            >
              Pular
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Avaliação
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AvaliacaoModal;
