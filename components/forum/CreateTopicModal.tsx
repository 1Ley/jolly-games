'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { forumService } from '@/lib/forum';
import { toast } from 'react-hot-toast';

interface CreateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  onTopicCreated: () => void;
}

export default function CreateTopicModal({ isOpen, onClose, categories, onTopicCreated }: CreateTopicModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categoryId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Formulario enviado:', formData);
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Enviando datos al servidor:', {
        categoryId: formData.categoryId,
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      
      const result = await forumService.createTopic({
        categoryId: formData.categoryId,
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      
      console.log('Respuesta del servidor:', result);
      
      toast.success('Tema creado exitosamente');
      setFormData({ title: '', content: '', categoryId: '' });
      onTopicCreated();
      onClose();
    } catch (error: any) {
      console.error('Error al crear tema:', error);
      toast.error(error.message || 'Error al crear el tema');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ title: '', content: '', categoryId: '' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-xl font-bold text-white">Crear Nuevo Tema</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Título */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Título del tema *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Escribe un título descriptivo..."
                    disabled={isSubmitting}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    maxLength={200}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {formData.title.length}/200
                  </div>
                </div>

                {/* Categoría */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Categoría *
                  </label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-white hover:bg-gray-700"
                        >
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-gray-400">{category.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Contenido */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Contenido *
                  </label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Escribe el contenido de tu tema..."
                    disabled={isSubmitting}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px] resize-none"
                    maxLength={5000}
                  />
                  <div className="text-xs text-gray-500 text-right">
                    {formData.content.length}/5000
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.title.trim() || !formData.content.trim() || !formData.categoryId}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Crear Tema
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}