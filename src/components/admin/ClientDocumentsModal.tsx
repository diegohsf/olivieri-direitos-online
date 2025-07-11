
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, X, FileText } from "lucide-react";
import DocumentsList from "@/components/client/DocumentsList";

interface ClientDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  clientName: string;
}

const ClientDocumentsModal = ({ isOpen, onClose, clientId, clientName }: ClientDocumentsModalProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const triggerWebhook = async (documentRecord: any) => {
    try {
      console.log('Triggering webhook for record:', documentRecord);
      const { error } = await supabase.functions.invoke('document-upload-webhook', {
        body: { record: documentRecord }
      });
      
      if (error) {
        console.error('Webhook error:', error);
        toast.error('Arquivo enviado, mas houve erro no webhook de notificação');
      } else {
        console.log('Webhook triggered successfully');
        toast.success('Arquivo enviado e notificação enviada com sucesso!');
      }
    } catch (error) {
      console.error('Error triggering webhook:', error);
      toast.error('Arquivo enviado, mas houve erro no webhook de notificação');
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error('Selecione pelo menos um arquivo');
      return;
    }

    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${clientId}/${Date.now()}-admin-${file.name}`;

        console.log('Uploading file:', file.name);

        // Upload do arquivo para o storage
        const { error: uploadError } = await supabase.storage
          .from('client-documents')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        console.log('File uploaded successfully, registering in database...');

        // Registrar o documento na tabela
        const { data: documentRecord, error: dbError } = await supabase
          .from('client_documents')
          .insert({
            client_id: clientId,
            file_name: file.name,
            file_path: fileName,
            file_size: file.size,
            file_type: file.type || 'application/octet-stream',
            description: description || null,
            uploaded_by_admin: true
          })
          .select()
          .single();

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }

        console.log('Document registered in database:', documentRecord);

        // Disparar webhook
        await triggerWebhook(documentRecord);
      }

      setFiles(null);
      setDescription('');
      setRefreshTrigger(prev => prev + 1);
      
      // Limpar o input
      const fileInput = document.getElementById('admin-file-input') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Erro no upload:', error);
      toast.error('Erro ao enviar arquivo(s)');
    } finally {
      setUploading(false);
    }
  };

  const clearFiles = () => {
    setFiles(null);
    const fileInput = document.getElementById('admin-file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6" />
            Documentos de {clientName}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="view" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="view">Visualizar Documentos</TabsTrigger>
            <TabsTrigger value="upload">Enviar Documentos</TabsTrigger>
          </TabsList>

          <TabsContent value="view" className="mt-6">
            <DocumentsList 
              clientId={clientId} 
              isAdmin={true} 
              refreshTrigger={refreshTrigger} 
            />
          </TabsContent>

          <TabsContent value="upload" className="mt-6">
            <div className="space-y-4 p-6 bg-gray-50 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Selecionar Arquivos
                </label>
                <Input
                  id="admin-file-input"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="cursor-pointer"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formatos aceitos: PDF, DOC, DOCX, JPG, PNG, TXT
                </p>
              </div>

              {files && files.length > 0 && (
                <div className="bg-white p-3 rounded-lg border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {files.length} arquivo(s) selecionado(s):
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFiles}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {Array.from(files).map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span className="truncate">{file.name}</span>
                      <span className="text-xs whitespace-nowrap">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Descrição (opcional)
                </label>
                <Textarea
                  placeholder="Descreva o conteúdo dos documentos..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleUpload}
                  disabled={!files || files.length === 0 || uploading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? 'Enviando...' : 'Enviar Documentos'}
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Fechar
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ClientDocumentsModal;
